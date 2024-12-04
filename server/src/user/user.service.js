import {findUserByIdDb, editUserByIdDb} from "./user.repository.js"

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

export { getUserDataById, editUserDataById}