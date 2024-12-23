const { Router } = require('express');
const userRoutes = require("./UserRoutes")
const router = Router();

router.use('/', userRoutes);

module.exports = router;