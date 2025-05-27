const express = require('express');
const router = express.Router();
const KhoaHocController = require('../controllers/khoaHoc.controller');
const KhoaHocService = require('../services/khoaHoc.service');
const apiResponse = require('../utils/apiResponse');

const { khoaHocDAL } = require('../models');

const khoaHocService = new KhoaHocService(khoaHocDAL);
const khoaHocController = new KhoaHocController(khoaHocService);

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
