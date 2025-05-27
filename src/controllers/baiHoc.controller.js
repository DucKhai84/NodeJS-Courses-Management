const apiResponse = require('../utils/apiResponse')

class BaiHocController {
    constructor(BaiHocService) {
        this.baiHocService = BaiHocService;
    }

    async getAll(req, res) {
        try {
            const baihocs = await this.baiHocService.getAllBaiHoc();
            res.json(baihocs);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi lấy dữ liệu bài học'));
        }
    }
    async getById(req, res) {
        try {
            const baihoc = await this.baiHocService.getBaiHocId(req.params.id);
            if (!baihoc) {
                return res.status(404).json(apiResponse.error('Bài học không tồn tại'));
            }
            res.json(baihoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi lấy dữ liệu bài học'));
        }
    }

    async create(req, res) {
        try {
            const { KhoaHocId, TenBaiHoc, NoiDung, LoaiBaiHoc } = req.body;
            const newBaiHoc = await this.baiHocService.createBaiHoc({
                KhoaHocId,
                TenBaiHoc,
                NoiDung,
                LoaiBaiHoc
            });
            res.status(201).json(newBaiHoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi tạo bài học'));
        }
    }

    async delete(req, res) {
        try {
            const baihoc = await this.baiHocService.deleteBaiHoc(req.params.id);
            if (!baihoc) {
                return res.status(404).json(apiResponse.error('Bài học không tồn tại'));
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi xóa bài học'));
        }
    }

    async update(req, res) {
        try {
            const { KhoaHocId, TenBaiHoc, NoiDung, LoaiBaiHoc } = req.body;
            const baihoc = await this.baiHocService.updateBaiHoc(req.params.id, {
                KhoaHocId,
                TenBaiHoc,
                NoiDung,
                LoaiBaiHoc
            });
            if (!baihoc) {
                return res.status(404).json(apiResponse.error('Bài học không tồn tại'));
            }
            res.json(baihoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi cập nhật bài học'));
        }
    }
}

module.exports = BaiHocController;  
