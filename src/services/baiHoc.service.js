
class BaiHocService {
    constructor(BaiHocDAL) {
        this.baiHocDAL = BaiHocDAL;
    }

    async getAllBaiHoc() {
        return await this.baiHocDAL.getAllBaiHoc();
    }

    async getBaiHocId(baihocId) {
        return await this.baiHocDAL.getBaiHocId(baihocId);
    }

    async createBaiHoc(baihoc) {
        return await this.baiHocDAL.createBaiHoc(baihoc);
    }

    async deleteBaiHoc(baihocId) {
        return await this.baiHocDAL.deleteBaiHoc(baihocId);
    }

    async updateBaiHoc(baihocId, baihoc) {
        return await this.baiHocDAL.updateBaiHoc(baihocId, baihoc);
    }
}

module.exports = BaiHocService;