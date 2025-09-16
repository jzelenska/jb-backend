import { Application } from "../models/application.model.js";
import mongoose from "mongoose";

//  Create Application
export const createApplication = async (req, res) => {
    try {
        const { job, coverLetter, resume } = req.body;

        if (!job || !coverLetter) {
            return res.status(400).json({ message: "Job ID and cover letter are required", success: false });
        }

        if (!mongoose.Types.ObjectId.isValid(job)) {
            return res.status(400).json({ message: "Invalid Job ID", success: false });
        }

        const newApplication = await Application.create({
            job,
            applicant: req.user.userId,
            coverLetter,
            resume
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application: newApplication,
            success: true
        });
    } catch (error) {
        console.error("Create Application Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

//  Get All Applications for Logged-in User
export const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicant: req.user.userId })
            .populate("job", "title location company")
            .sort({ createdAt: -1 });

        res.status(200).json({ applications, success: true });
    } catch (error) {
        console.error("Get Applications Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

//  Update Application Status (Recruiter/Admin only)
export const updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["pending", "reviewed", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value", success: false });
        }

        const updatedApp = await Application.findByIdAndUpdate(id, { status }, { new: true });

        if (!updatedApp) {
            return res.status(404).json({ message: "Application not found", success: false });
        }

        res.status(200).json({
            message: "Application status updated successfully",
            application: updatedApp,
            success: true
        });
    } catch (error) {
        console.error("Update Application Status Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

// Delete Application
export const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Application ID", success: false });
        }

        const deletedApp = await Application.findOneAndDelete({
            _id: id,
            applicant: req.user.userId
        });

        if (!deletedApp) {
            return res.status(404).json({ message: "Application not found or not yours", success: false });
        }

        res.status(200).json({ message: "Application deleted successfully", success: true });
    } catch (error) {
        console.error("Delete Application Error:", error);
        res.status(500).json({ message: "Server error", success: false });
    }
};
