const express = require("express");
const db = require("../database/db");
const requireAdmin = require("../middleware/auth");
const upload = require("../middleware/upload");

const uploadToCloudinary = require(
  "../utils/uploadToCloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

const router = express.Router();


// ========================================
// PUBLIC - GET ALL AVAILABLE PROPERTIES
// GET /api/properties
// ========================================

router.get("/", (req, res) => {
  try {
    const {
      listing_type,
      location,
      property_type,
      min_price,
      max_price,
      bedrooms,
      featured,
      sort,
    } = req.query;

    let sql = `
      SELECT *
      FROM properties
      WHERE status = 'available'
    `;

    const params = [];


    // LISTING TYPE
    if (listing_type) {
      sql += ` AND listing_type = ?`;
      params.push(listing_type);
    }


    // LOCATION
    if (location) {
      sql += `
        AND (
          address LIKE ?
          OR postcode LIKE ?
          OR title LIKE ?
        )
      `;

      const locationSearch =
        `%${location}%`;

      params.push(
        locationSearch,
        locationSearch,
        locationSearch
      );
    }


    // PROPERTY TYPE
    if (property_type) {
      sql += ` AND property_type = ?`;
      params.push(property_type);
    }


    // MIN PRICE
    if (min_price) {
      sql += ` AND price >= ?`;
      params.push(
        Number(min_price)
      );
    }


    // MAX PRICE
    if (max_price) {
      sql += ` AND price <= ?`;
      params.push(
        Number(max_price)
      );
    }


    // BEDROOMS
    if (bedrooms) {
      sql += ` AND bedrooms >= ?`;
      params.push(
        Number(bedrooms)
      );
    }


    // FEATURED
    if (featured !== undefined) {
      sql += ` AND featured = ?`;

      params.push(
        featured === "true"
          ? 1
          : 0
      );
    }


    // SORT
    switch (sort) {
      case "price_asc":
        sql += `
          ORDER BY price ASC
        `;
        break;

      case "price_desc":
        sql += `
          ORDER BY price DESC
        `;
        break;

      case "oldest":
        sql += `
          ORDER BY created_at ASC
        `;
        break;

      default:
        sql += `
          ORDER BY created_at DESC
        `;
    }


    const properties = db
      .prepare(sql)
      .all(...params);


    return res.json({
      success: true,
      count: properties.length,
      properties,
    });

  } catch (error) {
    console.error(
      "GET properties error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to load properties",
    });
  }
});


// ========================================
// ADMIN - GET ALL PROPERTIES
// GET /api/properties/admin/all
// ADMIN ONLY
// ========================================
//
// IMPORTANT:
// Keep this ABOVE /admin/:id
//
// ========================================

router.get(
  "/admin/all",
  requireAdmin,
  (req, res) => {
    try {
      const properties = db
        .prepare(`
          SELECT *
          FROM properties
          ORDER BY created_at DESC
        `)
        .all();


      return res.json({
        success: true,
        count: properties.length,
        properties,
      });

    } catch (error) {
      console.error(
        "Admin get properties error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load properties",
      });
    }
  }
);


// ========================================
// ADMIN - GET PROPERTY BY ID
// GET /api/properties/admin/:id
// ADMIN ONLY
// ========================================

router.get(
  "/admin/:id",
  requireAdmin,
  (req, res) => {
    try {
      const { id } = req.params;


      const property = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE id = ?
        `)
        .get(id);


      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found",
        });
      }


      // LOAD PROPERTY IMAGES
      // Cover photo will come first

      const images = db
        .prepare(`
          SELECT
            id,
            image_url,
            public_id,
            is_primary,
            sort_order
          FROM property_images
          WHERE property_id = ?
          ORDER BY
            is_primary DESC,
            sort_order ASC,
            id ASC
        `)
        .all(property.id);


      return res.json({
        success: true,

        property: {
          ...property,
          images,
        },
      });

    } catch (error) {
      console.error(
        "Admin get property error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to load property",
      });
    }
  }
);


// ========================================
// ADMIN - UPLOAD PROPERTY IMAGES
// POST /api/properties/admin/:id/images
// ADMIN ONLY
// ========================================

router.post(
  "/admin/:id/images",
  requireAdmin,
  upload.array("images", 10),

  async (req, res) => {
    try {
      const { id } = req.params;


      // CHECK PROPERTY
      const property = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE id = ?
        `)
        .get(id);


      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found",
        });
      }


      // CHECK FILES
      if (
        !req.files ||
        req.files.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please select at least one image",
        });
      }


      // GET EXISTING IMAGES
      const existingImages = db
        .prepare(`
          SELECT *
          FROM property_images
          WHERE property_id = ?
          ORDER BY sort_order ASC
        `)
        .all(id);


      // MAXIMUM 10 IMAGES TOTAL
      if (
        existingImages.length +
          req.files.length >
        10
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Maximum 10 images are allowed per property",
        });
      }


      let sortOrder =
        existingImages.length;

      const uploadedImages = [];


      // ========================================
      // UPLOAD EACH IMAGE TO CLOUDINARY
      // ========================================

      for (const file of req.files) {

        const result =
          await uploadToCloudinary(
            file.buffer
          );


        // First image becomes cover
        // only when property has no images.

        const isPrimary =
          existingImages.length === 0 &&
          uploadedImages.length === 0
            ? 1
            : 0;


        const insertResult = db
          .prepare(`
            INSERT INTO property_images (
              property_id,
              image_url,
              public_id,
              is_primary,
              sort_order
            )
            VALUES (?, ?, ?, ?, ?)
          `)
          .run(
            id,
            result.secure_url,
            result.public_id,
            isPrimary,
            sortOrder
          );


        const image = db
          .prepare(`
            SELECT *
            FROM property_images
            WHERE id = ?
          `)
          .get(
            insertResult.lastInsertRowid
          );


        uploadedImages.push(
          image
        );

        sortOrder++;
      }


      // ========================================
      // FIRST IMAGE = COVER PHOTO
      // ========================================

      if (
        existingImages.length === 0 &&
        uploadedImages.length > 0
      ) {
        db.prepare(`
          UPDATE properties
          SET image = ?
          WHERE id = ?
        `).run(
          uploadedImages[0].image_url,
          id
        );
      }


      // GET ALL IMAGES AFTER UPLOAD

      const allImages = db
        .prepare(`
          SELECT
            id,
            image_url,
            public_id,
            is_primary,
            sort_order
          FROM property_images
          WHERE property_id = ?
          ORDER BY
            is_primary DESC,
            sort_order ASC,
            id ASC
        `)
        .all(id);


      return res.json({
        success: true,

        message:
          "Images uploaded successfully",

        uploadedImages,

        images: allImages,
      });

    } catch (error) {
      console.error(
        "Upload property images error:",
        error
      );


      return res.status(500).json({
        success: false,

        message:
          error.message ||
          "Failed to upload images",
      });
    }
  }
);


// ========================================
// ADMIN - SET COVER PHOTO
// PATCH
// /api/properties/admin/:id/images/:imageId/primary
// ADMIN ONLY
// ========================================

router.patch(
  "/admin/:id/images/:imageId/primary",
  requireAdmin,
  (req, res) => {
    try {
      const {
        id,
        imageId,
      } = req.params;


      // ========================================
      // CHECK PROPERTY
      // ========================================

      const property = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE id = ?
        `)
        .get(id);


      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found",
        });
      }


      // ========================================
      // CHECK IMAGE
      // ========================================

      const image = db
        .prepare(`
          SELECT *
          FROM property_images
          WHERE id = ?
            AND property_id = ?
        `)
        .get(
          imageId,
          id
        );


      if (!image) {
        return res.status(404).json({
          success: false,
          message:
            "Property image not found",
        });
      }


      // ========================================
      // ALREADY COVER
      // ========================================

      if (
        Number(
          image.is_primary
        ) === 1
      ) {
        const images = db
          .prepare(`
            SELECT
              id,
              image_url,
              public_id,
              is_primary,
              sort_order
            FROM property_images
            WHERE property_id = ?
            ORDER BY
              is_primary DESC,
              sort_order ASC,
              id ASC
          `)
          .all(id);


        return res.json({
          success: true,

          message:
            "This image is already the cover photo",

          cover_image:
            image.image_url,

          images,
        });
      }


      // ========================================
      // DATABASE TRANSACTION
      // ========================================

      const setCoverPhoto =
        db.transaction(() => {

          // Remove old primary image
          db.prepare(`
            UPDATE property_images
            SET is_primary = 0
            WHERE property_id = ?
          `).run(id);


          // Selected image becomes primary
          db.prepare(`
            UPDATE property_images
            SET is_primary = 1
            WHERE id = ?
              AND property_id = ?
          `).run(
            imageId,
            id
          );


          // Synchronise main property cover
          db.prepare(`
            UPDATE properties
            SET image = ?
            WHERE id = ?
          `).run(
            image.image_url,
            id
          );
        });


      setCoverPhoto();


      // ========================================
      // GET UPDATED IMAGE LIST
      // ========================================

      const images = db
        .prepare(`
          SELECT
            id,
            image_url,
            public_id,
            is_primary,
            sort_order
          FROM property_images
          WHERE property_id = ?
          ORDER BY
            is_primary DESC,
            sort_order ASC,
            id ASC
        `)
        .all(id);


      return res.json({
        success: true,

        message:
          "Cover photo updated successfully",

        cover_image:
          image.image_url,

        images,
      });

    } catch (error) {
      console.error(
        "Set cover photo error:",
        error
      );


      return res.status(500).json({
        success: false,

        message:
          "Failed to update cover photo",
      });
    }
  }
);


// ========================================
// PUBLIC - GET SINGLE PROPERTY BY SLUG
// GET /api/properties/:slug
// ========================================

router.get(
  "/:slug",
  (req, res) => {
    try {
      const { slug } =
        req.params;


      const property = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE slug = ?
          LIMIT 1
        `)
        .get(slug);


      if (!property) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found",
        });
      }


      // ========================================
      // LOAD PROPERTY IMAGES
      // Cover photo first
      // ========================================

      const images = db
        .prepare(`
          SELECT
            id,
            image_url,
            is_primary,
            sort_order
          FROM property_images
          WHERE property_id = ?
          ORDER BY
            is_primary DESC,
            sort_order ASC,
            id ASC
        `)
        .all(property.id);


      return res.json({
        success: true,

        property: {
          ...property,
          images,
        },
      });

    } catch (error) {
      console.error(
        "GET single property error:",
        error
      );


      return res.status(500).json({
        success: false,

        message:
          "Failed to load property",
      });
    }
  }
);


// ========================================
// ADMIN - CREATE NEW PROPERTY
// POST /api/properties
// ADMIN ONLY
// ========================================

router.post(
  "/",
  requireAdmin,
  (req, res) => {
    try {
      const {
        title,
        slug,
        listing_type,
        property_type,
        price,
        price_period,
        address,
        postcode,
        bedrooms,
        bathrooms,
        furnished_status,
        available_date,
        deposit,
        description,
        epc_rating,
        council_tax_band,
        status,
        featured,
        image,
      } = req.body;


      // ========================================
      // TITLE VALIDATION
      // ========================================

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Property title is required",
        });
      }


      // ========================================
      // LISTING TYPE VALIDATION
      // ========================================

      if (
        !listing_type ||
        ![
          "sale",
          "letting",
          "room",
        ].includes(
          listing_type
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Valid listing type is required",
        });
      }


      // ========================================
      // PRICE VALIDATION
      // ========================================

      if (
        !price ||
        Number(price) <= 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Valid price is required",
        });
      }


      // ========================================
      // CREATE SLUG
      // ========================================

      let finalSlug =
        slug &&
        slug.trim()
          ? slug.trim()

          : title
              .trim()
              .toLowerCase()
              .replace(
                /[^a-z0-9]+/g,
                "-"
              )
              .replace(
                /^-+|-+$/g,
                ""
              );


      // ========================================
      // DUPLICATE SLUG
      // ========================================

      const existingProperty = db
        .prepare(`
          SELECT id
          FROM properties
          WHERE slug = ?
        `)
        .get(
          finalSlug
        );


      if (existingProperty) {
        finalSlug =
          `${finalSlug}-${Date.now()}`;
      }


      // ========================================
      // INSERT PROPERTY
      // ========================================

      const result = db
        .prepare(`
          INSERT INTO properties (
            title,
            slug,
            listing_type,
            property_type,
            price,
            price_period,
            address,
            postcode,
            bedrooms,
            bathrooms,
            furnished_status,
            available_date,
            deposit,
            description,
            epc_rating,
            council_tax_band,
            status,
            featured,
            image
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, ?, ?, ?, ?
          )
        `)
        .run(
          title.trim(),

          finalSlug,

          listing_type,

          property_type?.trim() ||
            null,

          Number(price),

          price_period?.trim() ||
            null,

          address?.trim() ||
            null,

          postcode?.trim() ||
            null,

          bedrooms
            ? Number(bedrooms)
            : 0,

          bathrooms
            ? Number(bathrooms)
            : 0,

          furnished_status?.trim() ||
            null,

          available_date ||
            null,

          deposit
            ? Number(deposit)
            : null,

          description?.trim() ||
            null,

          epc_rating?.trim() ||
            null,

          council_tax_band?.trim() ||
            null,

          status ||
            "available",

          featured
            ? 1
            : 0,

          image?.trim() ||
            null
        );


      // ========================================
      // GET CREATED PROPERTY
      // ========================================

      const property = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE id = ?
        `)
        .get(
          result.lastInsertRowid
        );


      return res
        .status(201)
        .json({
          success: true,

          message:
            "Property created successfully",

          property,
        });

    } catch (error) {
      console.error(
        "Create property error:",
        error
      );


      return res.status(500).json({
        success: false,

        message:
          "Failed to create property",
      });
    }
  }
);


// ========================================
// ADMIN - UPDATE PROPERTY
// PUT /api/properties/:id
// ADMIN ONLY
// ========================================

router.put(
  "/:id",
  requireAdmin,
  (req, res) => {
    try {
      const { id } =
        req.params;


      // ========================================
      // CHECK PROPERTY
      // ========================================

      const existingProperty = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE id = ?
        `)
        .get(id);


      if (!existingProperty) {
        return res.status(404).json({
          success: false,
          message:
            "Property not found",
        });
      }


      const {
        title,
        listing_type,
        property_type,
        price,
        price_period,
        address,
        postcode,
        bedrooms,
        bathrooms,
        furnished_status,
        available_date,
        deposit,
        description,
        epc_rating,
        council_tax_band,
        status,
        featured,
        image,
      } = req.body;


      // ========================================
      // TITLE VALIDATION
      // ========================================

      if (
        !title ||
        !title.trim()
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Property title is required",
        });
      }


      // ========================================
      // LISTING TYPE VALIDATION
      // ========================================

      if (
        !listing_type ||
        ![
          "sale",
          "letting",
          "room",
        ].includes(
          listing_type
        )
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Valid listing type is required",
        });
      }


      // ========================================
      // PRICE VALIDATION
      // ========================================

      if (
        !price ||
        Number(price) <= 0
      ) {
        return res.status(400).json({
          success: false,

          message:
            "Valid price is required",
        });
      }


      // ========================================
      // UPDATE PROPERTY
      // ========================================

      db.prepare(`
        UPDATE properties
        SET
          title = ?,
          listing_type = ?,
          property_type = ?,
          price = ?,
          price_period = ?,
          address = ?,
          postcode = ?,
          bedrooms = ?,
          bathrooms = ?,
          furnished_status = ?,
          available_date = ?,
          deposit = ?,
          description = ?,
          epc_rating = ?,
          council_tax_band = ?,
          status = ?,
          featured = ?,
          image = ?
        WHERE id = ?
      `).run(
        title.trim(),

        listing_type,

        property_type?.trim() ||
          null,

        Number(price),

        price_period?.trim() ||
          null,

        address?.trim() ||
          null,

        postcode?.trim() ||
          null,

        bedrooms
          ? Number(bedrooms)
          : 0,

        bathrooms
          ? Number(bathrooms)
          : 0,

        furnished_status?.trim() ||
          null,

        available_date ||
          null,

        deposit
          ? Number(deposit)
          : null,

        description?.trim() ||
          null,

        epc_rating?.trim() ||
          null,

        council_tax_band?.trim() ||
          null,

        status ||
          "available",

        featured
          ? 1
          : 0,

        image?.trim() ||
          null,

        id
      );


      // ========================================
      // GET UPDATED PROPERTY
      // ========================================

      const updatedProperty = db
        .prepare(`
          SELECT *
          FROM properties
          WHERE id = ?
        `)
        .get(id);


      return res.json({
        success: true,

        message:
          "Property updated successfully",

        property:
          updatedProperty,
      });

    } catch (error) {
      console.error(
        "Update property error:",
        error
      );


      return res.status(500).json({
        success: false,

        message:
          "Failed to update property",
      });
    }
  }
);


// ========================================
// ADMIN - DELETE PROPERTY
// DELETE /api/properties/:id
// ADMIN ONLY
// ========================================

router.delete(
  "/:id",
  requireAdmin,

  async (req, res) => {
    try {
      const { id } =
        req.params;


      // ========================================
      // CHECK PROPERTY
      // ========================================

      const property = db
        .prepare(`
          SELECT
            id,
            title
          FROM properties
          WHERE id = ?
        `)
        .get(id);


      if (!property) {
        return res.status(404).json({
          success: false,

          message:
            "Property not found",
        });
      }


      // ========================================
      // GET CLOUDINARY IMAGES
      // ========================================

      const images = db
        .prepare(`
          SELECT
            id,
            image_url,
            public_id
          FROM property_images
          WHERE property_id = ?
        `)
        .all(id);


      // ========================================
      // DELETE CLOUDINARY IMAGES
      // ========================================

      for (
        const image of images
      ) {

        if (
          image.public_id
        ) {
          try {

            const result =
              await cloudinary
                .uploader
                .destroy(
                  image.public_id
                );


            console.log(
              "Cloudinary deleted:",
              image.public_id,
              result.result
            );

          } catch (
            cloudinaryError
          ) {

            console.error(
              "Cloudinary delete error:",
              image.public_id,
              cloudinaryError
            );


            return res
              .status(500)
              .json({
                success: false,

                message:
                  "Failed to delete property image from Cloudinary",
              });
          }
        }
      }


      // ========================================
      // DELETE IMAGE DATABASE RECORDS
      // ========================================

      db.prepare(`
        DELETE FROM property_images
        WHERE property_id = ?
      `).run(id);


      // ========================================
      // DELETE PROPERTY
      // ========================================

      db.prepare(`
        DELETE FROM properties
        WHERE id = ?
      `).run(id);


      return res.json({
        success: true,

        message:
          "Property and Cloudinary images deleted successfully",
      });

    } catch (error) {
      console.error(
        "Delete property error:",
        error
      );


      return res.status(500).json({
        success: false,

        message:
          "Failed to delete property",
      });
    }
  }
);


module.exports = router;