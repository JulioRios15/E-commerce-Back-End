const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');
const {sendSuccessResponse, sendErrorResponse} = require('../../utils/sendResponse');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  
  try {
    // find all products
    const products = await Product.findAll({
      include: [
        {model: Category},
        {model: Tag}
      ]
    });

    if(products.length == 0){
      return sendErrorResponse(res, 404, "No products found");
    }

    return sendSuccessResponse(res, 200, `${products.length} products found`, products);
    
  } catch (error) {
    sendErrorResponse(res, 500, "Unable to find products", error);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // Destroy id from request param
  const {id} = req.params;

  try {
    // find product by id
    const products = await Product.findAll({
      where: {
        id: id
      },
      include: [
        {model: Category},
        {model: Tag}
      ]
    });

    if(products.length == 0){
      return sendErrorResponse(res, 404, "No product found for param id");
    }

    return sendSuccessResponse(res, 200, `Product found`, products[0]);
    
  } catch (error) {
    sendErrorResponse(res, 500, "Unable to find product by id", error);
  }
});

// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // Destroy product id from the request
  const {id} = req.params;

  // delete a product by its `id` value
  Product.destroy({
    where: {
      id
    }
  })
  .then(product => {
    if(product == 0){
      return sendErrorResponse(res, 404, "Unable to delete tag");
    }
    return sendSuccessResponse(res, 201, "Tag deleted", product);
  })
  .catch(error => {
    return sendErrorResponse(res, 500, "Unable to delete category", error);
  })
});

module.exports = router;
