import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student',  'recruiter'],
        default: 'student'
    },
    profile: {
        type: String, // URL or base64
        default: ""
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
