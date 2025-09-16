import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register User
export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;

        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists', success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        res.status(201).json({ message: 'User registered successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// Login User
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required', success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: '1d' }
        );

        res
            .status(200)
            .cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.fullName}`,
                user: {
                    _id: user._id,
                    fullName: user.fullName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    profile: user.profile
                },
                success: true
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// Logout User
export const logout = async (req, res) => {
    try {
        res
            .status(200)
            .cookie('token', '', { maxAge: 0 })
            .json({ message: 'Logged out successfully', success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { fullName, email, phoneNumber, password, profile } = req.body;

        const updateData = {};
        if (fullName) updateData.fullName = fullName;
        if (email) updateData.email = email;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (profile) updateData.profile = profile;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                _id: updatedUser._id,
                fullName: updatedUser.fullName,
                email: updatedUser.email,
                phoneNumber: updatedUser.phoneNumber,
                role: updatedUser.role,
                profile: updatedUser.profile
            },
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', success: false });
    }
};
