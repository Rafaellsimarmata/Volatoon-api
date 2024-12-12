import { Router } from 'express';
import { findHistory, deleteHistory, addHistory, addChapterHistory } from './history.service.js';
import authenticateToken from '../middleware/token.auth.js';

const router = Router();

router.get("/history", authenticateToken, async (req, res) => {
    const { userId } = req.user;

    try {
        const data = await findHistory(userId)

        res.status(200).json({
            status: 200,
            message: "User History retrieved successfully",
            data
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

router.delete("/history/:historyId", authenticateToken, async (req, res) => {

    const historyId = req.params.historyId;

    try {
        const historyDataDelete = await deleteHistory(historyId)

        res.status(200).json({
            status: 200,
            message: "User history Deleted",
            data: {
                historyDataDelete
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.post("/history", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const historyData = req.body

    try {
        const Result = await addHistory(userId, historyData)

        res.status(201).json({
            status: 201,
            message: "User History added successfully",
            data: {
                Result
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

router.post("/history/chapter", authenticateToken, async (req, res) => {
    const { userId } = req.user;
    const historyData = req.body

    try {
        const Result = await addChapterHistory(userId, historyData)

        res.status(201).json({
            status: 201,
            message: "User History added successfully",
            data: {
                Result
            }
        })
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }

})

export default router 