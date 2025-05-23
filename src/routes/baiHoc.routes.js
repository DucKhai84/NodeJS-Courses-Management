const express = require('express');
const router = express.Router();
const baiHocController = require('../controllers/baiHoc.controller');
const apiResponse = require('../utils/apiResponse');    

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


module.exports = router;   