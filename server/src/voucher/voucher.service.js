import {
    markVoucherAsUsedDb,
    createVoucherDb,
    findAllVouchersDb,
    findVoucherByCodeDb,
    updateVoucherByCodeDb,
    deleteVoucherByCodeDb
} from "../voucher/voucher.repository.js";

const createVoucher = async (data) => {
    // console.log("asd" + data.code)
    const existingVoucher = await findVoucherByCodeDb(data.code);

    if (existingVoucher) throw new Error("Voucher code already exists");

    return await createVoucherDb(data);
};

const getAllVouchers = async () => {
    return await findAllVouchersDb();
};

const getVoucherByCode = async (code) => {
    const voucher = await findVoucherByCodeDb(code);
    if (!voucher) throw new Error("Voucher not found");
    return voucher;
};

const useVoucherByCode = async (code) => {
    const voucher = await markVoucherAsUsedDb(code);
    if (!voucher) throw new Error("Voucher not found");
    return voucher;
};

const updateVoucher = async (code, data) => {
    return await updateVoucherByCodeDb(code, data);
};

const deleteVoucher = async (code) => {
    return await deleteVoucherByCodeDb(code);
};

export { createVoucher, getAllVouchers, getVoucherByCode, updateVoucher, deleteVoucher, useVoucherByCode };
