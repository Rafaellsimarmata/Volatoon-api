import prisma from "../config/db.config.js"

const findUserByIdDb = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { user_id: userId }
    })

    return user
}


const editUserByIdDb = async (userId, updatedData) => {
    try {
        // Update profil di database
        const updatedUser = await prisma.user.update({
            where: { user_id: userId },
            data: {
                ...updatedData,
                updatedAt: new Date() // Tambahkan updatedAt untuk mencatat perubahan
            }
        });

        return updatedUser;
    } catch (error) {
        console.error(error);
        throw new Error("Error updating profile");
    }
};

const updateUserPremiumDb = async (userId, premiumUntil) => {
    return await prisma.user.update({
        where: { user_id: userId },
        data: {
            isPremium: true,
            premium_until: premiumUntil,
        },
    });
};


export { findUserByIdDb, editUserByIdDb, updateUserPremiumDb }