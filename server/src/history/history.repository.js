import prisma from "../config/db.config.js"
import axios from "axios"

const findHistoryByuserIdDb = async (userId) => {

    const result = await prisma.History.findMany({
        where: { userId }
    })

    // Fetch comic details from the external API for each comic_id
    const historyWithComicDetails = await Promise.all(
        result.map(async (history) => {
            try {
                const response = await axios.get(`https://api-otaku.vercel.app/api/komik/${history.komik_id}`);
                return {
                    ...history,
                    comicDetails: response.data // Attach comic details to the bookmark
                };
            } catch (error) {
                console.error(`Failed to fetch details for comic_id ${history.comic_id}`, error);
                return {
                    ...history,
                    comicDetails: null
                };
            }
        })
    );

    return historyWithComicDetails
}

const deleteHistoryByHistoryIdDb = async (HistoryId) => {
    const result = await prisma.History.delete({
        where: { history_id: HistoryId }
    })

    return result
}

const addHistoryByUserIdDb = (userId, HistoryData) => {
    const HistoryResult = prisma.History.create({
        data: {
            userId: userId,
            komik_id: HistoryData.komikId,
            chapter_id: null
        }
    })
    return HistoryResult
}

const addHistoryChapterByUserIdDb = (userId, HistoryData) => {
    const HistoryResult = prisma.History.create({
        data: {
            userId: userId,
            chapter_id: HistoryData.chapterId,
        }
    })
    return HistoryResult
}

export {
    findHistoryByuserIdDb,
    deleteHistoryByHistoryIdDb,
    addHistoryByUserIdDb,
    addHistoryChapterByUserIdDb
}