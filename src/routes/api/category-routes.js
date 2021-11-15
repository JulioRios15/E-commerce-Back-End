const router = require('express').Router();
const { Category, Product } = require('../../models');
const {sendSuccessResponse, sendErrorResponse} = require('../../utils/sendResponse');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // Destroy data from request body
  const {category_name} = req.body;

  // Create new categoty
  Category.create({category_name})
  .then((category) => {
    return sendSuccessResponse(res, 201, `New category added ${category_name}`, category);
  })
  .catch((error) => {
    return sendErrorResponse(res, 500, `Unable to add category`, error);
  });

});

router.put('/:id', async (req, res) => {
   
  const {id} = req.params;
  const {category_name} = req.body;

  // update a category by its `id`
  Category.update({category_name},{
    where: {
      id
    }
  })
  .then(category => {
    // if not updates where made, return 404 error
    if(category == 0){
      return sendErrorResponse(res, 404, "Unable to update category");
    }
    return sendSuccessResponse(res, 201, "Category updated", category);
  })
  .catch((error) => {
    return sendErrorResponse(res, 500, "Unable to update category", error);
  })

});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  // delete a category by its `id` value
  Category.destroy({
    where: {
      id
    }
  })
  .then(category => {
    if(category == 0){
      return sendErrorResponse(res, 404, "Unabel to delete category");
    }
    return sendSuccessResponse(res, 201, "Categeory deleted", category);
  })
  .catch(error => {
    return sendErrorResponse(res, 500, "Unabel to delete category", error);
  })
});

module.exports = router;
