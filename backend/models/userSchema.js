import { Schema, model } from 'mongoose'

const userSchema = new Schema(
    {
        googleId: String,
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,       

        },
        birthDate: {
            type: Date,
            required: true,        
        },

        avatar: {
            type: String,
        },
        reviews: {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
        role: {
            type: String,
            enum: ['visitor', 'admin'],
            default: 'visitor',
          },
        verifiedAt: Date,
        verificationCode: String,

    },
    {collection: "users", timestamps: true
    }
)

export default model("User", userSchema)