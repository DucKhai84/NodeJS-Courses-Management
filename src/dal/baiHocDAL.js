const BaseRepository = require('./baseRepository');

class BaiHocDAL extends BaseRepository {
    constructor(BaiHoc) {
        super(BaiHoc);
        this.baiHoc = BaiHoc;
    }

    getAllBaiHoc() {
        return this.baiHoc.findAll();
    }

    getBaiHocId(baihocId) {
        return this.baiHoc.findByPk(baihocId);
    }

    createBaiHoc(baihoc) {
        return this.baiHoc.create(baihoc);
    }

    deleteBaiHoc(baihocId) {
        return this.baiHoc.destroy({
            where: {
                id: baihocId
            }
        });
    }

    updateBaiHoc(baihocId, baihoc) {
        return this.baiHoc.update(baihoc, {
            where: {
                id: baihocId
            }
        });
    }
}

module.exports = BaiHocDAL;