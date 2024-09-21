import { Schema, Types, model } from 'mongoose'

const registrationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        eventId: {
            type: String,
            required: true,
        }
    },
    {collection: "registrations", timestamps: true
    }
)

export default model("Registration", registrationSchema)