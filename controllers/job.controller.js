import mongoose from "mongoose";

import { Job } from "../models/job.model.js";

// Create Job
export const createJob = async (req, res) => {
    try {
        const { title, description, location, salary, company } = req.body;

        if (!title || !description || !location || !company) {
            return res.status(400).json({ message: "All required fields must be filled", success: false });
        }

        const newJob = await Job.create({
            title,
            description,
            location,
            salary,
            company,
            createdBy: req.user.userId // Assuming req.user.userId is set by authentication middleware

        });

        res.status(201).json({ message: "Job created successfully", job: newJob, success: true });
    } catch (error) {
        console.error("Create Job Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get All Jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate("company").populate("createdBy", "fullName email");
        res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.error("Get Jobs Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Get Single Job
export const getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate("company")
            .populate("createdBy", "fullName email");

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Get Job Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Update Job
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ message: "Invalid Job ID", success: false });
        }

        const updateData = { ...req.body };

        // Ensure the user is the creator of the job
        if (updateData.company) {
            if (!mongoose.Types.ObjectId.isValid(updateData.company)) {
                return res.status(400).json({ message: "Invalid Company ID", success: false });
            }
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob,
            success: true
        });

    } catch (error) {
        console.error("Update Job Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Delete Job
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Job ID", success: false });
        }

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        res.status(200).json({ message: "Job deleted successfully", success: true });
    } catch (error) {
        console.error("Delete Job Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
