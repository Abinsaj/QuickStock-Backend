import ProductSchema from "../Models/productSchema.js";

export class ProductRepository {
    async createProduct(product) {
        try {
            const newProduct = new ProductSchema({
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category,
                image_url: product.productImageUrl
            })

            return await newProduct.save()
        } catch (error) {
            throw error
        }
    }

    async getFilteredProducts(filters) {
        try {
            const {
                search = '',
                category = '',
                sort = 'newest',
                page = 1,
                limit = 10
            } = filters

            const query = {}

            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            }

            if (category) {
                query.category = category
            }

            const sortOptions = {
                'price-low': { price: 1 },
                'price-high': { price: -1 },
                'name-asc': { name: 1 },
                'newest': { createdAt: -1 }
            }

            const sortBy = sortOptions[sort] || sortOptions['newest']
            const skip = (Number(page) - 1) * Number(limit)

            const [products, total] = await Promise.all([
                ProductSchema.find(query).sort(sortBy).skip(skip).limit(Number(limit)),
                ProductSchema.countDocuments(query)
            ])

            return { products, total }
        } catch (error) {
            console.error("Error in getFilteredProducts:", error)
            throw error
        }
    }

    async getSingleProduct(id){
        try {
            const product = await ProductSchema.findById({_id:id})
            return product;
        } catch (error) {
            throw error;
        }
    }

    async updateProductById(data){
        try {
            const { id, name, description, price, productImageUrl } = data;
      
            const updateFields = {};
            if (name) updateFields.name = name;
            if (description) updateFields.description = description;
            if (price) updateFields.price = Number(price);
            if (productImageUrl) updateFields.image_url = productImageUrl;
      
            const updatedProduct = await ProductSchema.findByIdAndUpdate(
              id,
              { $set: updateFields },
              { new: true }
            );
            

            if (!updatedProduct) {
              throw new AppError(HTTP_statusCode.NOT_FOUND, "Product not found");
            }
      
            return updatedProduct;
          } catch (error) {
            throw error;
          }
    }

    async findProductAndDelete(id){
        try {
            const deleteProduct = await ProductSchema.findByIdAndDelete(id)
            return deleteProduct
        } catch (error) {
            throw error
        }
    }
}