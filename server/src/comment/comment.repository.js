import prisma from "../config/db.config.js"

const findCommentsByChapterIdDb = async (chapterId) => {
    const comments = await prisma.comment.findMany({
        where: { chapter_id: chapterId },
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
    });

    // Map the results to rename fields
    const mappedComments = comments.map(comment => ({
        ...comment,
        user: {
            userName: comment.user.username, // Renaming `username` to `userName`
            fullName: comment.user.name      // Renaming `name` to `fullName`
        }
    }));

    return mappedComments;
};

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
