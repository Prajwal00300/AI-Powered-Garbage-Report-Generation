import Report from '../models/report.js';

export const createReport = async (req, res) => {
    try {
        const { description, latitude, longitude, address } = req.body;

        if (!description || !latitude || !longitude) {
            return res.status(400).json({ success: false, message: "Please provide description, latitude, and longitude." });
        }

        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please provide an image of the waste." });
        }

        // The image is already uploaded to Cloudinary by our middleware
        const imageUrl = req.file.path;
        const imageId = req.file.filename;

        // Note: AI Classification (Phase 4) will be implemented here later.
        // For now, we use default wasteType and severity.

        const newReport = await Report.create({
            citizen: req.user._id,
            image: imageId,
            imageUrl: imageUrl,
            description,
            latitude,
            longitude,
            address,
            status: 'SUBMITTED'
        });

        return res.status(201).json({
            success: true,
            message: "Report created successfully",
            data: newReport
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        });
    }
};

export const getMyReports = async (req, res) => {
    try {
        const reports = await Report.find({ citizen: req.user._id }).sort({ createdAt: -1 });
        
        return res.status(200).json({
            success: true,
            message: "Reports fetched successfully",
            data: reports
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        });
    }
};

export const getReportById = async (req, res) => {
    try {
        const report = await Report.findOne({ _id: req.params.id, citizen: req.user._id });
        
        if (!report) {
            return res.status(404).json({ success: false, message: "Report not found" });
        }

        return res.status(200).json({
            success: true,
            message: "Report fetched successfully",
            data: report
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error: " + error.message
        });
    }
};
