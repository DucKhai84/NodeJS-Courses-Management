const express = require('express');
const router = express.Router();
const BaiHocController = require('../controllers/baiHoc.controller');
const BaiHocService = require('../services/baiHoc.service');
const apiResponse = require('../utils/apiResponse');

const { baiHocDAL } = require('../models');

const baiHocService = new BaiHocService(baiHocDAL);
const baiHocController = new BaiHocController(baiHocService);

router.get('/lectures', (req, res) => baiHocController.getAll(req, res));
router.get('/lectures/:id', (req, res) => baiHocController.getById(req, res));
// router.get('/lectures/:khoaHocId', async (req, res) => {
//     try{
//         const khoaHocId = req.params.khoaHocId;
//         const baiHocWithUser = await baiHocController.getBaiHocWithUsers(req, res);
//         res.json(apiResponse.success(baiHocWithUser));
//     }catch(err){
//         console.error(err);
//         res.status(500).json(apiResponse.error('Lỗi route'));
//     }
// })
router.post('/lectures', (req, res) => baiHocController.create(req, res));
router.delete('/lectures/:id', (req, res) => baiHocController.delete(req, res));
router.put('/lectures/:id', (req, res) => baiHocController.update(req, res));


module.exports = router;   