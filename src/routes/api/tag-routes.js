const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const {sendSuccessResponse, sendErrorResponse} = require('../../utils/sendResponse');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
    // Destroy data from request body
    const {tag_name} = req.body;

    // Create new tag
    Tag.create({tag_name})
    .then((category) => {
      return sendSuccessResponse(res, 201, `New tag added ${tag_name}`, category);
    })
    .catch((error) => {
      return sendErrorResponse(res, 500, `Unable to add tag`, error);
    });
});

router.put('/:id', (req, res) => {
  // Destroy data from the request
  const {id} = req.params;
  const {tag_name} = req.body;

  // update a tag by its `id`
  Tag.update({tag_name},{
    where: {
      id
    }
  })
  .then(tag => {
    // if not updates where made, return 404 error
    if(tag == 0){
      return sendErrorResponse(res, 404, "Unable to update tag");
    }
    return sendSuccessResponse(res, 201, "Tag updated", tag);
  })
  .catch((error) => {
    return sendErrorResponse(res, 500, "Unable to update tag", error);
  })
});

router.delete('/:id', (req, res) => {
  // Destroy tag data from the request
  const {id} = req.params;

  // delete a tag by its `id` value
  Tag.destroy({
    where: {
      id
    }
  })
  .then(tag => {
    if(tag == 0){
      return sendErrorResponse(res, 404, "Unable to delete tag");
    }
    return sendSuccessResponse(res, 201, "Tag deleted", tag);
  })
  .catch(error => {
    return sendErrorResponse(res, 500, "Unable to delete category", error);
  })
});

module.exports = router;
