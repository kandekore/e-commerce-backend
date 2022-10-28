// import models
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
// Categories have many Products
Category.hasMany(Products, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
// Products belongToMany Tags (through ProductTag)
Products.belongsToMany(Tags, { through: ProductTag });
// Tags belongToMany Products (through ProductTag)
Tags.belongsToMany(Product, { through: ProductTag });

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
