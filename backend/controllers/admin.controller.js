import bcrypt from 'bcrypt';
import adminModel from '../models/adminModel'; // Adjust the path as needed
import jwt from 'jsonwebtoken';


export const createAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email already exists
        const alreadyRegistered = await adminModel.findOne({ email: email });
        if (alreadyRegistered) {
            return res.status(400).json({
                message: "Email already exists",
                success: false,
            });
        }

        // Hash the password
        const saltRounds = 10; // Adjust salt rounds as needed
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create the admin record
        await adminModel.create({
            email: email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "Admin created successfully",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error: Something went wrong",
            success: false,
        });
    }
};



export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found",
                success: false,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false,
            });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, 'qwerty123', {
            expiresIn: '1d', 
        });

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message: "Login successful",
            success: true,
            token, 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error: Something went wrong during login",
            success: false,
        });
    }
};

export const logoutAdmin = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            secure: false, 
            sameSite: 'strict',
            expires: new Date(0), 
        });

        return res.status(200).json({
            message: "Logout successful",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error: Something went wrong during logout",
            success: false,
        });
    }
};

