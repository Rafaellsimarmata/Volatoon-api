import prisma from "../config/db.config.js"
import axios from "axios"

const findBookmarkByuserIdDb = async (userId) => {
    const result = await prisma.bookmark.findMany({
        where: { userId }
    })

     // Fetch comic details from the external API for each comic_id
     const bookmarksWithComicDetails = await Promise.all(
        result.map(async (bookmark) => {
            try {
                const response = await axios.get(`https://api-otaku.vercel.app/api/komik/${bookmark.komik_id}`);
                return {
                    ...bookmark,
                    comicDetails: response.data // Attach comic details to the bookmark
                };
            } catch (error) {
                console.error(`Failed to fetch details for comic_id ${bookmark.comic_id}`, error);
                return {
                    ...bookmark,
                    comicDetails: null // Handle API failure gracefully
                };
            }
        })
    );

    return bookmarksWithComicDetails
}

const deleteBookmarkByBookmarkIdDb = async (bookmarkId) => {
    const result = await prisma.bookmark.delete({
        where: { bookmark_id : bookmarkId }
    })

    return result
}

const addBookmarkByUserIdDb = (userId, bookmarkData) => {
    const bookmarkResult = prisma.bookmark.create({
        data: {
            userId: userId,
            komik_id: bookmarkData.komikId,
        }
    })
    return bookmarkResult
}

export {
    findBookmarkByuserIdDb,
    deleteBookmarkByBookmarkIdDb,
    addBookmarkByUserIdDb
}