import { Schema, model } from 'mongoose'

const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date:{
            type: Date,
            required: true
        },
        place:{
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        cover: {
            type: String,
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    },
    {collection: "events", timestamps: true}
)

export default model("Event", eventSchema)