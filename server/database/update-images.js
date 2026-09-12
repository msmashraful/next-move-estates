const db = require("./db");

const updates = [
  {
    slug: "modern-family-home",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "spacious-three-bedroom-house",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "modern-two-bedroom-apartment",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "contemporary-two-bedroom-flat",
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "bright-furnished-double-room",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80",
  },
];

const update = db.prepare(`
  UPDATE properties
  SET image = ?
  WHERE slug = ?
`);

const updateMany = db.transaction((items) => {
  for (const item of items) {
    update.run(item.image, item.slug);
  }
});

updateMany(updates);

console.log("Property images updated successfully");