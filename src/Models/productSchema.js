import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image_url:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const ProductSchema = mongoose.model('Product',productSchema)

export default ProductSchema