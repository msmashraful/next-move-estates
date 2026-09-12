const db = require("./db");

const properties = [
  {
    title: "Modern Family Home",
    slug: "modern-family-home",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    listing_type: "sale",
    property_type: "House",
    price: 425000,
    price_period: null,
    address: "Romford, London",
    postcode: "RM1",
    bedrooms: 3,
    bathrooms: 2,
    furnished_status: "Unfurnished",
    available_date: null,
    deposit: null,
    description:
      "A modern family home offering spacious accommodation, a bright interior and excellent access to local amenities.",
    epc_rating: "B",
    council_tax_band: "D",
    status: "available",
    featured: 1,
  },

  {
    title: "Spacious Three Bedroom House",
    slug: "spacious-three-bedroom-house",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
    listing_type: "sale",
    property_type: "House",
    price: 575000,
    price_period: null,
    address: "Stratford, London",
    postcode: "E15",
    bedrooms: 3,
    bathrooms: 2,
    furnished_status: "Unfurnished",
    available_date: null,
    deposit: null,
    description:
      "A well-presented three bedroom house with generous living space, modern fittings and convenient transport connections.",
    epc_rating: "C",
    council_tax_band: "D",
    status: "available",
    featured: 1,
  },

  {
    title: "Modern Two Bedroom Apartment",
    slug: "modern-two-bedroom-apartment",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    listing_type: "sale",
    property_type: "Apartment",
    price: 350000,
    price_period: null,
    address: "Barking, London",
    postcode: "IG11",
    bedrooms: 2,
    bathrooms: 1,
    furnished_status: "Unfurnished",
    available_date: null,
    deposit: null,
    description:
      "A stylish two bedroom apartment with a modern open-plan layout and easy access to local shops and transport.",
    epc_rating: "B",
    council_tax_band: "C",
    status: "available",
    featured: 1,
  },

  {
    title: "Contemporary Two Bedroom Flat",
    slug: "contemporary-two-bedroom-flat",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    listing_type: "letting",
    property_type: "Flat",
    price: 1850,
    price_period: "pcm",
    address: "Canary Wharf, London",
    postcode: "E14",
    bedrooms: 2,
    bathrooms: 1,
    furnished_status: "Furnished",
    available_date: "2026-09-15",
    deposit: 2134,
    description:
      "A contemporary furnished two bedroom flat located close to Canary Wharf transport links and local amenities.",
    epc_rating: "B",
    council_tax_band: "D",
    status: "available",
    featured: 1,
  },

  {
    title: "Bright Furnished Double Room",
    slug: "bright-furnished-double-room",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
    listing_type: "room",
    property_type: "Room",
    price: 750,
    price_period: "pcm",
    address: "Stratford, London",
    postcode: "E15",
    bedrooms: 1,
    bathrooms: 1,
    furnished_status: "Furnished",
    available_date: "2026-09-10",
    deposit: 750,
    description:
      "A bright furnished double room in a well-maintained shared property with convenient access to transport and local amenities.",
    epc_rating: "C",
    council_tax_band: null,
    status: "available",
    featured: 1,
  },
];


// ========================================
// INSERT PROPERTY
// ========================================

const insert = db.prepare(`
  INSERT OR IGNORE INTO properties (
    title,
    slug,
    image,
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
    featured
  )
  VALUES (
    @title,
    @slug,
    @image,
    @listing_type,
    @property_type,
    @price,
    @price_period,
    @address,
    @postcode,
    @bedrooms,
    @bathrooms,
    @furnished_status,
    @available_date,
    @deposit,
    @description,
    @epc_rating,
    @council_tax_band,
    @status,
    @featured
  )
`);


// ========================================
// INSERT MULTIPLE PROPERTIES
// ========================================

const insertMany = db.transaction((items) => {
  for (const property of items) {
    insert.run(property);
  }
});

insertMany(properties);

console.log("Demo properties inserted successfully");