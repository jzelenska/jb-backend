import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }
}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);
