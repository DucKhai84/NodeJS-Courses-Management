const apiResponse = require('../utils/apiResponse');

class KhoaHocController {

    constructor(KhoaHocService) {
        this.khoaHocService = KhoaHocService;
    }

    async getAll(req, res) {
        try {
            const khoahocs = await this.khoaHocService.getAllKhoaHoc();
            res.json(khoahocs);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi lấy dữ liệu khóa học'));
        }
    }

    async getById(req, res) {
        try {
            const khoahoc = await this.khoaHocService.getKhoaHocId(req.params.id);
            if (!khoahoc) {
                return res.status(404).json(apiResponse.error('Khóa học không tồn tại'));
            }
            res.json(khoahoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi lấy dữ liệu khóa học'));
        }
    }

    async create(req, res) {
        try {
            const { TenKhoaHoc, MoTa, Gia } = req.body;
            const newKhoaHoc = await this.khoaHocService.createKhoaHoc({
                TenKhoaHoc,
                MoTa,
                Gia
            });
            res.status(201).json(newKhoaHoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi tạo khóa học'));
        }
    }

    async delete(req, res) {
        try {
            const khoahoc = await this.khoaHocService.deleteKhoaHoc(req.params.id);
            if (!khoahoc) {
                return res.status(404).json(apiResponse.error('Khóa học không tồn tại'));
            }
            res.status(204).send();
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi xóa khóa học'));
        }
    }

    async update(req, res) {
        try {
            const khoahoc = await this.khoaHocService.updateKhoaHoc(req.params.id, req.body);
            if (!khoahoc) {
                return res.status(404).json(apiResponse.error('Khóa học không tồn tại'));
            }
            res.json(khoahoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi cập nhật khóa học'));
        }
    }
    async getKhoaHocWithUsers(req, res) {
        try {
            const khoaHocId = req.params.khoaHocId;
            const khoaHoc = await this.khoaHocService.getKhoaHocWithUsers(khoaHocId);

            if (!khoaHoc) {
                return res.status(404).json(apiResponse.error('Khóa học không tồn tại'));
            }

            res.status(200).json(khoaHoc);
        } catch (err) {
            console.error(err);
            res.status(500).json(apiResponse.error('Lỗi khi lấy ID khóa học'));
        }
    }

}

module.exports = KhoaHocController;
