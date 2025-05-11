import { deleteFromCloudinary } from "../Config/cloudinary.js"
import { ProductRepository } from "../Repository/productRepository.js"

const productRepository = new ProductRepository()

export class ProductService{
    async addProduct(productData){
        try {
            return await productRepository.createProduct(productData)
        } catch (error) {
            throw error
        }
    }

    async getAllProducts(filters){
        try {
            const result = await productRepository.getFilteredProducts(filters)
            return result
        } catch (error) {
            throw error
        }
    }

    async getProduct(id){
        try {
            const result = await productRepository.getSingleProduct(id)
            return result
        } catch (error) {
            throw error
        }
    }

    async updateProduct(updatedData) {
        try {
          const { id ,productImageUrl} = updatedData;
      
          const existingProduct = await productRepository.getSingleProduct(id);
          if (!existingProduct) {
            throw new AppError(HTTP_statusCode.NOT_FOUND, 'Product not found');
          }
      
          if (existingProduct.image_url && productImageUrl) {
            await deleteFromCloudinary(existingProduct.image_url);
          }
      
          return await productRepository.updateProductById(updatedData);
        } catch (error) {
          throw error;
        }
      }

      async deleteProduct(id){
        try {
            const result = await productRepository.findProductAndDelete(id)
            return result
        } catch (error) {
            throw error
        }
      }
}