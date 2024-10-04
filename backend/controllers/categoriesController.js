const asyncHandler = require("express-async-handler");
const { Category, validateCreateCategory } = require("../models/Category");

/**-------------------------------------------------
 * @desc  Create New Category
 * @route  /api/categories
 * @method  POST
 * @access private (only admin)
 * 
 ---------------------------------------------------*/
//!createCategoryCtrl
module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });
  res.status(201).json(category);
});

/**-------------------------------------------------
 * @desc  Get All Categories
 * @route  /api/categories
 * @method  GET
 * @access public
 * 
 ---------------------------------------------------*/
//!getAllCategoriesCtrl
module.exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
 
  const categories = await Category.find();
  res.status(200).json(categories);
});

/**-------------------------------------------------
 * @desc  Delete Category
 * @route  /api/categories/:id
 * @method  DELETE
 * @access private (only admin)
 * 
 ---------------------------------------------------*/
//!deleteCategoryCtrl
module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category Not Found" });
  }
  await Category.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({
      message: "Category Has Been Deleted Successfully",
      categoryId: category._id,
    });
});
