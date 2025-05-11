import express from 'express';

import { ProductController } from '../Controller/productController.js';
import { upload } from '../utils/uploads.js';

const productController = new ProductController()

const router = express.Router();

router.post('/',upload.single('imageUrl'),productController.addProduct)
router.get('/',productController.getAllProducts)
router.get('/:id',productController.getProduct)
router.put('/:id',upload.single('imageUrl'),productController.updateProduct)
router.delete('/:id',productController.deleteProduct)

export default router