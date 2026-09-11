import mongoose from 'mongoose'

const citizenSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    phone: {
        type: String,
        required: false
    }
}, { timestamps: true })

const Citizen = mongoose.model("Citizen", citizenSchema)
export default Citizen;