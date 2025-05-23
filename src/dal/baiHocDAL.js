const BaseRepository = require('./baseRepository');
const { BaiHoc } = require('../models');

class BaiHocDAL extends BaseRepository {
    constructor() {
        super(BaiHoc);
    }

    getAllBaiHoc() {
        return BaiHoc.findAll();
    }

    getBaiHocId(baihocId) {
        return BaiHoc.findByPk(baihocId);
    }

    createBaiHoc(baihoc) {
        return BaiHoc.create(baihoc);
    }

    deleteBaiHoc(baihocId) {
        return BaiHoc.destroy({
            where: {
                Id: baihocId
            }
        });
    }

    updateBaiHoc(baihocId, baihoc) {
        return BaiHoc.update(baihoc, {
            where: {
                Id: baihocId
            }
        });
    }
}

module.exports = BaiHocDAL;