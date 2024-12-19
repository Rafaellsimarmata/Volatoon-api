import { Router } from 'express';
import { getUserDataById, editUserDataById, utilizeVoucher } from './user.service.js';
import authenticateToken from '../middleware/token.auth.js';
const router = Router();

router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const userRawData = await getUserDataById(userId)

        res.status(200).json({
            status: 200,
            message: "Successfully get user data",
            userData: {
                fullName: userRawData.name,
                userName: userRawData.username,
                email: userRawData.email,
                status: userRawData.status,
                ispremium: userRawData.isPremium,
                premiumUntil: userRawData.premium_until
            }
        });
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

router.put("/profile", authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user; // Ambil user ID dari token
        const updatedData = req.body;

        // Filter hanya data yang ada
        Object.keys(updatedData).forEach(key => {
            if (!updatedData[key]) delete updatedData[key];
        });

        // Jika tidak ada data yang diberikan, kembalikan error
        if (Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                status: 400,
                message: "No data provided to update"
            });
        }

        // Panggil fungsi untuk memperbarui data
        const updatedUser = await editUserDataById(userId, updatedData);

        // Berikan respons sukses
        res.status(200).json({
            status: 200,
            message: "Profile updated successfully",
            userData: {
                fullName: updatedUser.name || null,
                userName: updatedUser.username,
                email: updatedUser.email,
                status: updatedUser.status || null
            }
        });
    } catch (err) {
        // Tangani error dan kirim respons
        res.status(500).json({
            status: 500,
            message: err.message
        });
    }
});

router.post('/redeem', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.user;
        const { voucherCode } = req.body;

        if (!voucherCode) {
            return res.status(400).json({
                status: 400,
                message: "Voucher code is required",
            });
        }

        const updatedUser = await utilizeVoucher(userId, voucherCode);

        return res.status(200).json({
            status: 200,
            message: "Voucher Redeemed successfully",
            userData: {
                fullName: updatedUser.name,
                userName: updatedUser.username,
                email: updatedUser.email,
                isPremium: updatedUser.isPremium,
                premiumUntil: updatedUser.premium_until,
            },
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message,
        });
    }

});


export default router