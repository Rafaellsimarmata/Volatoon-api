import prisma from "../config/db.config.js";

// Create a new voucher
const createVoucherDb = async (voucherData) => {
    try {
        const voucher = await prisma.vouchers.create({
            data: voucherData
        });
        return voucher;
    } catch (error) {
        console.error(error);
        throw new Error("Error creating voucher");
    }
};

// Find all vouchers
const findAllVouchersDb = async () => {
    try {
        const vouchers = await prisma.vouchers.findMany();
        return vouchers;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving vouchers");
    }
};

// Find voucher by code
const findVoucherByCodeDb = async (voucherCode) => {
    try {
        const voucher = await prisma.vouchers.findUnique({
            where: { code: voucherCode }
        });
        return voucher;
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving voucher");
    }
};

// Update voucher details
const updateVoucherByCodeDb = async (voucherCode, updatedData) => {
    try {
        const updatedVoucher = await prisma.vouchers.update({
            where: { code: voucherCode },
            data: {
                ...updatedData,
                updatedAt: new Date() // Add timestamp for updates
            }
        });
        return updatedVoucher;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating voucher");
    }
};

const markVoucherAsUsedDb = async (voucherCode) => {
    try {
        const usedVoucher = await prisma.vouchers.update({
            where: { code: voucherCode },
            data: { is_used: true },
        });
        return usedVoucher;
    } catch (error) {
        console.error(error);
        throw new Error("Error using voucher");
    }
};

// Delete voucher by code
const deleteVoucherByCodeDb = async (voucherCode) => {
    try {
        const deletedVoucher = await prisma.vouchers.delete({
            where: { code: voucherCode }
        });
        return deletedVoucher;
    } catch (error) {
        console.error(error);
        throw new Error("Error deleting voucher");
    }
};

export {
    markVoucherAsUsedDb,
    createVoucherDb,
    findAllVouchersDb,
    findVoucherByCodeDb,
    updateVoucherByCodeDb,
    deleteVoucherByCodeDb
};