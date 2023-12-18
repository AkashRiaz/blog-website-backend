import express from 'express';
import { resisterUser } from '../controllers/userControllers.js';
const router = express.Router();

router.post("/resister", resisterUser)

export default router