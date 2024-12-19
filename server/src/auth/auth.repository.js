import prisma from "../config/db.config.js"
import bcrypt from "bcrypt"

const findUserByEmailDb = async (email) => {
    console.log("f")
    const user = await prisma.user.findUnique({
        where: { email }
    })

    console.log(user)
    return user
}

const findUserByUsernameDb = async (username) => {
    const user = await prisma.user.findUnique({
        where: { username }
    })

    return user
}

const updatePasswordDb = async (email, newPassword) => {
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword }
    });
    return user;
}

const addUserDb = async (userData) => {
    const user = await prisma.user.create({
        data: {
            username: userData.userName,
            email: userData.email,
            password: userData.password,
            name: userData.fullName
        }
    })

    return user
}

export {
    findUserByEmailDb,
    findUserByUsernameDb,
    addUserDb,
    updatePasswordDb
}