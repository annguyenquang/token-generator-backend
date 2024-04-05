import { Router } from "express";
const router = Router();

import TokenController from '../controllers/TokenController';

router.use('/save', TokenController.saveToken);
router.use('/', TokenController.getAllToken);

module.exports = router;