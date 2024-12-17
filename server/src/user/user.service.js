import { findUserByIdDb, editUserByIdDb, updateUserPremiumDb } from "./user.repository.js"
import {
    getVoucherByCode,
    useVoucherByCode
} from "../voucher/voucher.service.js";

const getUserDataById = async (userId) => {
    const userData = await findUserByIdDb(userId)
    if (!userData) new Error("email already used!")
    return userData
}

const editUserDataById = async (userId, updatedData) => {
    const updatedUser = await editUserByIdDb(userId, updatedData);
    if (!updatedUser) throw new Error("Failed to update user data!");
    return updatedUser;
};

const utilizeVoucher = async (userId, voucherCode) => {
    // Check if voucher exists
    const voucher = await getVoucherByCode(voucherCode);
    if (!voucher) {
        throw new Error("Voucher not found");
    }

    // Check if the voucher has already been used
    if (voucher.isUsed) {
        throw new Error("Voucher has already been used");
    }

    // Calculate new premium duration
    const durationDays = voucher.durationDays || 30; // Default to 30 days if not specified
    const now = new Date();
    const premiumUntil = new Date();
    premiumUntil.setDate(now.getDate() + durationDays);

    // Mark voucher as used and update user premium status
    await useVoucherByCode(voucherCode);
    const updatedUser = await updateUserPremiumDb(userId, premiumUntil);

    return updatedUser;
};

export { getUserDataById, editUserDataById, utilizeVoucher }