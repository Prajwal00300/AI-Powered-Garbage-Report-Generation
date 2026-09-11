import jwt from 'jsonwebtoken';
import Citizen from '../models/citizen.js';

export const protectCitizen = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== 'citizen') {
                return res.status(403).json({ success: false, message: "Not authorized as citizen" });
            }

            req.user = await Citizen.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Not authorized, user not found" });
            }

            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ success: false, message: "Not authorized, no token" });
    }
};
