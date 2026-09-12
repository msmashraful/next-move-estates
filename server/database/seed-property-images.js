const db = require("./db");

const galleryData = [
  {
    slug: "modern-family-home",

    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    slug: "spacious-three-bedroom-house",

    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    slug: "modern-two-bedroom-apartment",

    images: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    slug: "contemporary-two-bedroom-flat",

    images: [
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1600566753051-f0b89df2dd90?auto=format&fit=crop&w=1600&q=85",
    ],
  },

  {
    slug: "bright-furnished-double-room",

    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85",

      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85",
    ],
  },
];

const findProperty = db.prepare(`
  SELECT id
  FROM properties
  WHERE slug = ?
`);

const checkImage = db.prepare(`
  SELECT id
  FROM property_images
  WHERE property_id = ?
  AND image_url = ?
`);

const insertImage = db.prepare(`
  INSERT INTO property_images (
    property_id,
    image_url,
    is_primary,
    sort_order
  )
  VALUES (?, ?, ?, ?)
`);

const insertGallery = db.transaction(() => {
  for (const item of galleryData) {
    const property = findProperty.get(item.slug);

    if (!property) {
      console.log(`Property not found: ${item.slug}`);
      continue;
    }

    item.images.forEach((imageUrl, index) => {
      const existing = checkImage.get(
        property.id,
        imageUrl
      );

      if (existing) {
        return;
      }

      insertImage.run(
        property.id,
        imageUrl,
        index === 0 ? 1 : 0,
        index
      );
    });
  }
});

insertGallery();

console.log(
  "Property gallery images inserted successfully"
);