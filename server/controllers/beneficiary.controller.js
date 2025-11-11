import { Beneficiary } from "../models/beneficiary.model.js";
import { generateDigitalId } from "../utils/generateDigitalId.js";

// CREATE BENEFICIARY
export const createBeneficiary = async (req, res) => {
    try {
        const { name, casteCategory, address, district, state } = req.body;

        const digitalId = generateDigitalId();

        const beneficiary = await Beneficiary.create({
            digitalId,
            name,
            casteCategory,
            address,
            district,
            state,
            documents: []
        });

        res.json({ message: "Beneficiary created", beneficiary });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating beneficiary" });
    }
};

// UPLOAD DOCUMENT
export const uploadDocument = async (req, res) => {
    try {
        const beneficiary = await Beneficiary.findById(req.params.id);

        if (!beneficiary) {
            return res.status(404).json({ message: "Beneficiary not found" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const newDocs = req.files.map(file => ({
            label: req.body.label || file.originalname,
            filePath: file.path,
            uploadedByRole: req.user.role,
            uploadedBy: req.user.id,
            uploadedAt: new Date()
        }));

        beneficiary.documents.push(...newDocs);
        await beneficiary.save();

        res.json({
            message: "Documents uploaded successfully",
            documents: beneficiary.documents
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Document upload failed", error });
    }
};
