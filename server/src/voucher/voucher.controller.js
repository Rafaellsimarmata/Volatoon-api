import { Router } from "express";
import {
    createVoucher,
    getAllVouchers,
    getVoucherByCode,
    updateVoucher,
    deleteVoucher
} from "../voucher/voucher.service.js";
import authenticateToken from "../middleware/token.auth.js";

const router = Router();

// Admin-only middleware placeholder
const adminAuth = (req, res, next) => {
    const adminKey = req.headers["admin-key"];
    if (adminKey !== "ADMIN_VOLA12") {
        return res.status(403).json({
            status: 403,
            message: "Unauthorized",
        });
    }
    next();
};

// Create a new voucher
router.post("/vouchers", authenticateToken, adminAuth, async (req, res) => {
    try {
        const { code, duration_days } = req.body;
        const newVoucher = await createVoucher({
            code,
            duration_days,
        });

        return res.status(201).json({
            status: 201,
            message: "Voucher created successfully",
            data: newVoucher,
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// Get all vouchers
router.get("/vouchers", authenticateToken, adminAuth, async (req, res) => {
    try {
        const vouchers = await getAllVouchers();

        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved vouchers",
            data: vouchers,
        });
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: err.message,
        });
    }
});

// Get voucher by code
router.get("/vouchers/:code", authenticateToken, adminAuth, async (req, res) => {
    try {
        const { code } = req.params;
        const voucher = await getVoucherByCode(code);

        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved voucher",
            data: voucher,
        });
    } catch (err) {
        return res.status(404).json({
            status: 404,
            message: err.message,
        });
    }
});

// Update voucher
router.put("/vouchers/:code", authenticateToken, adminAuth, async (req, res) => {
    try {
        const { code } = req.params;
        const updatedData = req.body;

        // Filter only valid data
        Object.keys(updatedData).forEach((key) => {
            if (!updatedData[key]) delete updatedData[key];
        });

        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                status: 400,
                message: "No data provided to update",
            });
        }

        const updatedVoucher = await updateVoucher(code, updatedData);

        return res.status(200).json({
            status: 200,
            message: "Voucher updated successfully",
            data: updatedVoucher,
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message,
        });
    }
});

// Delete voucher
router.delete("/vouchers/:code", authenticateToken, adminAuth, async (req, res) => {
    try {
        const { code } = req.params;
        await deleteVoucher(code);

        return res.status(200).json({
            status: 200,
            message: "Voucher deleted successfully",
        });
    } catch (err) {
        return res.status(404).json({
            status: 404,
            message: err.message,
        });
    }
});

export default router;
