import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    citizen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Citizen',
        required: true
    },
    image: {
        type: String, // Public ID or original filename
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    wasteType: {
        type: String,
        enum: ['plastic', 'organic', 'construction', 'electronic', 'mixed', 'hazardous', 'other'],
        default: 'other'
    },
    severity: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'low'
    },
    status: {
        type: String,
        enum: ['SUBMITTED', 'VERIFIED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'],
        default: 'SUBMITTED'
    },
    assignedAuthority: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Authority'
    },
    resolutionImage: {
        type: String
    },
    resolutionImageUrl: {
        type: String
    },
    resolutionDescription: {
        type: String
    },
    citizenConfirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
