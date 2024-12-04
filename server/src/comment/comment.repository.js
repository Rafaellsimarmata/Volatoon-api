import prisma from "../config/db.config.js"

const findCommentsByChapterIdDb = async (komikId) => {
    const comments = await prisma.comment.findMany({
        where: { komik_id: komikId },
        include: {
            user: {
                select: {
                    username: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    return comments
}

const addCommentDb = async (userId, chapterId, content) => {
    console.log("as")
    const comment = await prisma.comment.create({
        data: {
            userId,
            chapter_id: chapterId,
            content
        },
        include: {
            user: {
                select: {
                    username: true,
                    name: true
                }
            }
        }
    })
    return comment
}

const deleteCommentDb = async (commentId) => {
    const comment = await prisma.comment.delete({
        where: { comment_id: commentId }
    })
    return comment
}

const likeCommentDb = async (commentId) => {
    const comment = await prisma.comment.update({
        where: { 
            comment_id: commentId 
        },
        data: {
            likes: {
                increment: 1
            }
        }
    })
    return comment
}



export {
    findCommentsByChapterIdDb,
    addCommentDb,
    deleteCommentDb,
    likeCommentDb
}
