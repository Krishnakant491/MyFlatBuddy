import userModel from "../models/user.model.js";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import { config } from "../utils/nodemailer.js";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";



const hashPassword = async (password) => {
  const saltRounds = 10; // Number of salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const register = async (req, res) => {
  try {
    const { firstName, lastName, dob, role, email,phoneNumber, password } = req.body;

    // Hash the password before storing
    const hashedPassword = await hashPassword(password);
    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        message: `${email} already exist`,
        success: false,
      });
    }
    const checkPhone= await userModel.findOne({phoneNumber});
    if(checkPhone){
      return res.status(400).json({
        message: `${phoneNumber} already registered`,
        success: false,
      });
    }
    // Create a new user with hashed password
    const user = await userModel.create({
      firstName,
      lastName,
      dob,
      role,
      email,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
    });

    res
      .status(200)
      .json({ message: "Account created successfully", success: true, user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", success: false, error });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    
    // Compare the plain-text password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jsonwebtoken.sign(tokenData, 'qwerty123', {expiresIn: "1d"});
  //   user = {
  //     _id: user._id,
  //     firstName:user.firstName,
  //     lastName:user.lastName,
  //     dob:user.dob,
  //     email:user.email,
  //     phoneNumber: user.phoneNumber,
  //     role: user.role,
  //     profile: user.profile,
  // }

    return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message: `Welcome back ${user.firstName}`,
            user,
            token,
            success: true,
            });
  } catch (error) {
    // Catch any server errors
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};

export const logout = async (req, res)=>{
  try {
    return res.status(200).cookie("token", "", {maxAge:0}).json({
      message:'Logged out successfully',
      success:true
    })
  } catch (error) {
    return res.status(500).json({
      message:'Some Error occured',
      success: false
    })
  }
}


export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.id; // Assuming the user is authenticated and their ID is available

  try {
    // Fetch the user from the database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the entered current password with the stored password hash
    const match = await bcrypt.compare(currentPassword, user.password);  // Compare directly with plain text password
    if (!match) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully', success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong', success: false });
  }
};


export const updateProfile= async (req, res)=>{
  try {
    const {firstName, lastName, dob, role }= req.body;
    // console.log(req.body)
    
    if(!firstName, !lastName, !dob, !role ){
      return res.status(400).json({
        message:'Something is missing',
        success: false
      })
    }
    const userId= req.id;
    console.log(userId)
    let user= await userModel.findById(userId)
    if(!user){
      return res.status(400).json({
        message:'User not found',
        success:false
      })
    }
    user.firstName= firstName,
    user.lastName= lastName,
    user.dob= dob,
    user.role= role

    await user.save()
    user= {
      _id: user.id,
      firstname: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dob: user.dob,
      role: user.role,
      phoneNumber: user.phoneNumber,
    }

    return res.status(200).json({
      message:'Profile Updated successfully',
      user,
      success:true
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message:error,
      success:false
    })
  }
}

// linking nodemailer
const sendResetPasswordMail = async (firstName, email, resettoken) => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // or 465 for secure
      secure: false, // true for 465, false for 587
      auth: {
        user: process.env.smtpEmail, // Your email
        pass: process.env.smtpPass, // Your Gmail App password (use the correct one)
      },
    });

    // Mail options
    const mailOptions = {
      from: "vhatti14@gmail.com", // Your email (same as auth user)
      to: email, // Recipient's email
      subject: "Reset Your Password", // Email subject
      html: `<p>Hi ${firstName},</p> 
             <p>Please click <a href="http://127.0.0.1:5173/reset-password?resettoken=${resettoken}">here</a> to reset your password.</p> 
             <p>If you did not request a password reset, please ignore this email.</p>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

// function for forgot pass
export const forgotPassword = async (req, res) => {
  const email = req.body.email; // Fix here to ensure it's just the email string
  try {
    const userData = await userModel.findOne({ email }); // Correct query
    console.log(email);

    if (!userData) {
      return res.status(400).json({
        message: "Email not found or invalid email",
        success: false,
      });
    }

    const randomString = randomstring.generate();
    await userModel.updateOne(
      { email },
      { $set: { resettoken: randomString } }
    );
    sendResetPasswordMail(userData.firstName, userData.email, randomString);

    res.status(200).json({
      message: "Mail sent! Please check your inbox to reset your password",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const resetToken = req.query.resettoken; // Get the resettoken from the query parameters
    const { password } = req.body; // Destructure password from the request body
    // console.log(resetToken)
    // Find user by resettoken
    const userData = await userModel.findOne({ resettoken: resetToken });
    // console.log(userData)
    if (!userData) {
      return res.status(400).json({
        message: "This link has expired",
        success: false,
      });
    }

    // Hash the new password before updating
    const hashedPassword = await hashPassword(password);

    // Update password and clear the token
    await userModel.updateOne(
      { _id: userData._id },
      { $set: { password: hashedPassword, resettoken: "" } } // Store the hashed password
    );

    res.status(200).json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error); // Log the error for debugging
    res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
};


