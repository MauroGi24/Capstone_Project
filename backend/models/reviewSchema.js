import { Schema, Types, model } from 'mongoose'

const reviewSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true
        },
        event:{
            type: Types.ObjectId,
            ref: 'Event'
        },
        user:{
            type: Types.ObjectId,
            ref: 'User',
        }
    },
    {collection: "reviews", timestamps: true}
)

export default model("Review", reviewSchema)