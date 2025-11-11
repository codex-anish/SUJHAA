import mongoose from "mongoose";

const beneficiarySchema = new mongoose.Schema({
    digitalId: { type: String, unique: true },
    name: String,
    casteCategory: String,
    address: String,
    district: String,
    state: String,
    documents: [
        {
            label: String,
            filePath: String,
            uploadedByRole: String,
            uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            uploadedAt: Date
        }
    ]
});

export const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
