import express from "express";
import { createBeneficiary, uploadDocument } from "../controllers/beneficiary.controller.js";
import { auth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.post(
    "/",
    auth,
    allowRoles("Beneficiary", "FieldOfficer", "DistrictOfficer", "StateOfficer", "CentralAdmin"),
    createBeneficiary
);

router.post(
    "/:id/documents",
    auth,
    allowRoles("Beneficiary", "FieldOfficer", "DistrictOfficer", "StateOfficer", "CentralAdmin"),
    upload.array("documents", 5),
    uploadDocument
);

export default router;
