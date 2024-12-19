import { Router } from 'express';
import validate from '../middleware/validate.auth.js';
import { registerAccount, loginAccount, updatePassword, findEmailOnDB } from './auth.service.js';

const router = Router();

router.post("/register", validate, async (req, res) => {
    const userData = req.body;
    try {
        await registerAccount(userData);

        res.status(201).json({  
            status: 201,
            message: "account registered successfully"
        });
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
})

router.post("/login", validate, async (req, res) => {
    const userData = req.body;
    try {
        const token = await loginAccount(userData);
        console.log(token);

        res.status(200).json({
            status: 200,
            token,
            message: "account login successfully"
        });
    } catch (err) {
        return res.status(401).send(err.message)
    }
})

router.put("/update-password", validate, async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        await updatePassword(email, newPassword);
        res.status(200).json({
            status: 200,
            message: "Password updated successfully"
        });
    } catch (err) {
        return res.status(400).json({
            status: 400,
            message: err.message
        });
    }
});

router.get("/find-user", validate, async (req, res) => {
    const { email } = req.query;
    try {
        if (!email){
            return res.status(400).json({
                status: 400,
                message: 'Email is required'
            });
        }
        const user = await findEmailOnDB(email);
        res.status(200).json({
            status: 200,
            message: "User found",
            userData: user.email
        });
    } catch (err) {
        return res.status(404).json({
            status: 404,
            message: "User not found"
        });
    }
});

export default router 