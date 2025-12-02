import { db } from "../db.js";
import { productSchema } from "../validations/productSchema.js";

// --------------------------
// GET ALL
// --------------------------
export const getAll = async ({ limit, sort }) => {
  let query = "SELECT * FROM products";

  if (sort && ["name", "price", "id"].includes(sort)) {
    query += ` ORDER BY ${sort}`;
  }

  if (limit) {
    query += ` LIMIT ${Number(limit)}`;
  }

  // synchronous, but we await for uniformity
  const rows = await db.prepare(query).all();
  return rows;
};

// --------------------------
// GET ONE
// --------------------------
export const getOne = async (id) => {
  const row = await db.prepare("SELECT * FROM products WHERE id = ?").get(id);

  if (!row) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  return row;
};

// --------------------------
// CREATE
// --------------------------
export const create = async (data) => {
  const validated = productSchema.validateSync(data);
  const { name, price, description } = validated;

  const stmt = db.prepare(
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)"
  );

  const result = await stmt.run(name, price, description || null);

  return {
    id: result.lastInsertRowid,
    name,
    price,
    description: description || null,
  };
};

// --------------------------
// UPDATE
// --------------------------
export const update = async (id, data) => {
  const validated = productSchema.validateSync(data);
  const { name, price, description } = validated;

  const stmt = db.prepare(
    "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?"
  );

  const result = await stmt.run(name, price, description || null, id);

  if (result.changes === 0) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  return { id, name, price, description };
};

// --------------------------
// DELETE
// --------------------------
export const remove = async (id) => {
  const stmt = db.prepare("DELETE FROM products WHERE id = ?");
  const result = await stmt.run(id);

  if (result.changes === 0) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }

  return { message: "Deleted successfully" };
};
