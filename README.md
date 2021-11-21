# E-commerce Back End Starter Code
  ## Table of Content
  * [Description](#description)
  * [Installation](#instructions)
  * [Routes](#routes)
    * [Products](#get-all-products)
        * [Get All Products](#get-all-products)
        * [Get Product By Id](#get-product-by-id)
        * [Create New Product](#create-new-product)
    * [Category](#category-routes)
    * [Tag](#tag-routes)
  * [Demonstration](#demonstration)
  * [Contributions](#contributions)

## Description
This app is the backend for an E-Commerce application. Build with node js and express for the server side, along with MySQL and Sequlize for the database.


### Packages Used

* [mysql2](https://www.npmjs.com/package/mysql2)
* [dotenv](https://www.npmjs.com/package/dotenv)

## Installation

* Both Node js and MySQL server must be installed in your computer
* Clone the project repository, run  
    ```
    git clone https://github.com/JulioRios15/E-commerce-Back-End.git
    ```
*  Navigate to "E-commerce-Back-End" directory `cd E-commerce-Back-End` and run `npm install` in your terminal
* create .env file run `mkdir .env` in your terminal and define environmental varaibles
    ```
    DB_NAME=ecommerce_db
    DB_USER=
    DB_PW=
    ```


## Routes

### Get All Products
The following example demonstrates how to get all products information

### Example Request
```
GET http://localhost:3001/api/products
```
### Example Response
```json
    {
        "status": "success",
        "message": "1 products found",
        "data": {
            "id": 2,
            "product_name": "Running Sneakers",
            "price": 90,
            "stock": 25,
            "category_id": 5,
            "categoryId": 5,
            "category": {
                "id": 5,
                "category_name": "Shoes"
            },
            "tags": [
                {
                    "id": 6,
                    "tag_name": "white",
                    "product_tag": {
                        "id": 4,
                        "product_id": 2,
                        "tag_id": 6,
                        "productId": 2,
                        "tagId": 6
                    }
                }
            ]
        }
    }
```

### Get Product By Id
The following example demonstrates how to get a products by id information

### Example Request
```
GET http://localhost:3001/api/products/:id
```
### Example Response

```json
{
    "status": "success",
    "message": "Product found",
    "data": {
        "id": 4,
        "product_name": "Top 40 Music Compilation Vinyl Record",
        "price": 13,
        "stock": 50,
        "category_id": 3,
        "categoryId": 3,
        "category": {
            "id": 3,
            "category_name": "Music"
        },
        "tags": [
            {
                "id": 1,
                "tag_name": "rock music",
                "product_tag": {
                    "id": 9,
                    "product_id": 4,
                    "tag_id": 1,
                    "productId": 4,
                    "tagId": 1
                }
            },
        ]
    }
}
```

### Create New Product
The following example demonstrates how to create a new product

### Example POST Request
```
http://localhost:3001/api/products
```
### Example Request Body
```json
{
    "product_name": "Basketball",
    "price": 200.00,
    "stock": 3,
    "tagIds": [1, 2, 3, 4]
}
```

## Demonstration
[Watch demo video in youtube](https://youtu.be/RwZBZgHCLc8)

## Contributions
contributions are always welcome!