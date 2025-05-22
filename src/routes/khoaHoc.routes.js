const express = require('express');
const router = express.Router();
const khoaHocController = require('../controllers/khoaHoc.controller');
const apiResponse = require('../utils/apiResponse');    

router.get('/courses/:khoaHocId', async (req, res) => {
    try {
        const khoaHocId = req.params.khoaHocId;
        const khoaHocWithUser = await khoaHocController.getKhoaHocWithUsers(req, res);
        
    } catch (err) {
        console.error(err);
        res.status(500).json(apiResponse.error('Lỗi route'));
    }
});

router.get('/courses/:id', (req, res) => khoaHocController.getById(req, res));
router.get('/courses', (req, res) => khoaHocController.getAll(req, res));
router.post('/courses', (req, res) => khoaHocController.create(req, res));
router.delete('/courses/:id', (req, res) => khoaHocController.delete(req, res));
router.put('/courses/:id', (req, res) => khoaHocController.update(req, res));

module.exports = router;
