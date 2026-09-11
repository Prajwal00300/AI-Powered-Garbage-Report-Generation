import Citizen from "../models/citizen.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerCitizen = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide name, email and password" });
        }

        const existing = await Citizen.findOne({ email })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Citizen already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const citizen = await Citizen.create({
            name,
            email,
            password: hashedPassword,
            phone
        })

        const safeCitizen = {
            _id: citizen._id,
            name: citizen.name,
            email: citizen.email,
            phone: citizen.phone,
            createdAt: citizen.createdAt,
            updatedAt: citizen.updatedAt
        }

        return res.status(201).json({
            success: true,
            message: "Citizen registered successfully",
            data: safeCitizen
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        })
    }
}

export const loginCitizen = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide email and password" });
        }

        const citizen = await Citizen.findOne({ email });
        if (!citizen) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, citizen.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: citizen._id, role: 'citizen' }, process.env.JWT_SECRET, { expiresIn: '7d' });

        const safeCitizen = {
            _id: citizen._id,
            name: citizen.name,
            email: citizen.email,
            phone: citizen.phone,
            createdAt: citizen.createdAt,
            updatedAt: citizen.updatedAt
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                token,
                citizen: safeCitizen
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        });
    }
}



