import { Schema, Types, model } from 'mongoose'

const registrationSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
        },
        eventId: {
            type: Types.ObjectId,
            ref: 'Event',
            required: true,
        }
    },
    {collection: "registrations", timestamps: true
    }
)

export default model("Registration", registrationSchema)