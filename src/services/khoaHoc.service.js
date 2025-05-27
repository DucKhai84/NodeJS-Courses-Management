class KhoaHocService {
    constructor(KhoaHocDAL) {
        this.khoaHocDAL = KhoaHocDAL;
    }

    async getAllKhoaHoc() {
        return await this.khoaHocDAL.getAll();
    }
    async getKhoaHocId(khoaHocId) {
        if (!khoaHocId) {
            throw new Error("Khóa học này không tồn tại!!");
        }
        return await this.khoaHocDAL.getById(khoaHocId);
    }
    async createKhoaHoc(khoahoc) {
        return await this.khoaHocDAL.create(khoahoc);
    }
    async deleteKhoaHoc(khoaHocId) {
        if (!khoaHocId) {
            throw new Error("Khóa học này không tồn tại!!");
        }
        return await this.khoaHocDAL.delete(khoaHocId);
    }
    async updateKhoaHoc(khoaHocId, khoahoc) {
        if (!khoaHocId) {
            throw new Error("Khóa học này không tồn tại!!");
        }
        return await this.khoaHocDAL.update(khoaHocId, khoahoc);
    }

    async getKhoaHocWithUsers(khoaHocId) {
        if (!khoaHocId) {
            throw new Error("Khóa học này không tồn tại!!");
        }
        return await this.khoaHocDAL.getKhoaHocWithUsers(khoaHocId);
    }
}
module.exports = KhoaHocService;