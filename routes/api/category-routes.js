const router = require("express").Router();
const { Category, Product } = require("../../models");
const { beforeDestroy } = require("../../models/Product");

// The `/api/categories` endpoint
// router.use("/api/categories", apiRoutes);

router.get("/", async (req, res) => {
  // find all categories
  try {
    const allCategories = await Category.findAll({ include: Product });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(400).json(err);
  }
  // be sure to include its associated Products
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  try {
    const byId = await Category.findOne({
      where: {
        id: req.params.id,
      },

      include: [Product],
    });
    res.status(200).json(byId);
  } catch (err) {
    res.status(400).json(err);
  }
  // be sure to include its associated Products
});

router.post("/", async (req, res) => {
  try {
    const newCat = await Category.create(req.body);
    // console.log({ category_name: newCat });
    // console.log(req.body);
    res.status(200).json(newCat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const catUpdate = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No Category with this id" });
      return;
    }
    res.status(200).json(catUpdate);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deleteCat) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(deleteCat);
    console.log("category", req.params.id, "has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
