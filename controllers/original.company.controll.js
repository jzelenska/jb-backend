import { Company } from "../models/company.model.js";

// Create Company
export const createCompany = async (req, res) => {
  try {
    const { name, location, website, description } = req.body;

    if (!name || !location) {
      return res.status(400).json({ success: false, message: "Company name and location are required." });
    }

    // استخدم user ID من الـ middleware isAuthenticated إذا موجود
    const createdBy = req.user ? req.user._id : null;

    const company = new Company({
      name,
      location,
      website,
      description,
      createdBy,
    });

    await company.save();

    res.status(201).json({ success: true, message: "Company created successfully", company });
  } catch (error) {
    console.error("Create company error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Companies
export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate("createdBy", "fullName email");
    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.error("Get companies error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get One Company
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate("createdBy", "fullName email");
    if (!company) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, company });
  } catch (error) {
    console.error("Get company error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Update Company
export const updateCompany = async (req, res) => {
  try {
    const { name, location } = req.body;

    if (!name || !location) {
      return res.status(400).json({ success: false, message: "Company name and location are required." });
    }

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    res.status(200).json({ success: true, message: "Company updated successfully", company: updatedCompany });
  } catch (error) {
    console.error("Update company error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Company
export const deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }
    res.status(200).json({ success: true, message: "Company deleted successfully" });
  } catch (error) {
    console.error("Delete company error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
