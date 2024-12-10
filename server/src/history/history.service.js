import {
    findHistoryByuserIdDb,
    deleteHistoryByHistoryIdDb,
    addHistoryByUserIdDb
} from "./history.repository.js"

const findHistory = async (userId) => {
    const result = await findHistoryByuserIdDb(userId)
    if (!result) throw new Error("User doesnt have any History!")
    return result
}

const deleteHistory = async (HistoryId) => {
    const result = await deleteHistoryByHistoryIdDb(HistoryId)
    if (!result) throw new Error("failed deleting History")
    return result
}

const addHistory = async (userId, HistoryData) => {
    const HistoryDataResult = await addHistoryByUserIdDb(userId, HistoryData)
    if (!HistoryDataResult) throw new Error("failed adding History")
    return HistoryDataResult
}

export { findHistory, deleteHistory, addHistory } 