import { uploadToCloudinary } from "../Config/cloudinary.js";
import { ProductService } from "../Services/productService.js";

const productService = new ProductService()

export class ProductController {
    async addProduct(req, res, next) {
        try {
            console.log(req.file)
            const image = req.file;
            let productImageUrl
            if (image) {
                const result = await uploadToCloudinary(
                    image.buffer,
                    'productImage'
                )
                productImageUrl = result.secure_url;
            }

            const { name, description, price, category } = req.body

            const product = await productService.addProduct({
                name,
                description,
                price,
                category,
                productImageUrl
            })
            res.status(201).json({ message: "Product created successfully", data: product });

        } catch (error) {
            next(error)
        }
    }
    
    async getAllProducts(req,res,next){
        try {
            const { search, category, sort, page, limit} = req.query
            const {products,total} = await productService.getAllProducts({
                search,
                category,
                sort,
                page,
                limit
            })

            res.status(200).json({success: true, products, total})
        } catch (error) {
            next(error)
        }
    }

    async getProduct(req,res,next){
        try {
            const id = req.params.id
            const product = await productService.getProduct(id)
            res.status(200).json({success:true, product})
        } catch (error) {
            next(error)
        }
    }

    async updateProduct(req,res,next){
        try {
            const {id} = req.params
            const image = req.file;

            const {name, description, price, category} = req.body

            let productImageUrl
            if (image) {
                const result = await uploadToCloudinary(
                    image.buffer,
                    'productImage'
                )
                productImageUrl = result.secure_url;
            }
            const updatedProduct = await productService.updateProduct({
                id,
                name,
                description,
                price,
                category,
                productImageUrl
            })

            res.status(200).json({message:'Product updated succesfuly',products:updatedProduct})
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req,res,next){
        try {
            const {id} = req.params
            const result = await productService.deleteProduct(id)
            res.status(200).json({success: true,message: 'Product deleted successfully',result})
        } catch (error) {
            next(error)
        }
    }

}