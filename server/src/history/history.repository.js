import prisma from "../config/db.config.js"

const findHistoryByuserIdDb = async (userId) => {
    const result = await prisma.History.findMany({
        where: { userId }
    })

    return result
}

const deleteHistoryByHistoryIdDb = async (HistoryId) => {
    const result = await prisma.History.delete({
        where: { History_id : HistoryId }
    })

    return result
}

const addHistoryByUserIdDb = (userId, HistoryData) => {
    const HistoryResult = prisma.History.create({
        data: {
            userId: userId,
            komik_id: HistoryData.komikId,
        }
    })
    return HistoryResult
}

export {
    findHistoryByuserIdDb,
    deleteHistoryByHistoryIdDb,
    addHistoryByUserIdDb
}