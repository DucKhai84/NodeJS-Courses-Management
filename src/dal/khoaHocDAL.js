const BaseRepository = require('./baseRepository');

class KhoaHocDAL extends BaseRepository {

    constructor(KhoaHoc, User) {
        super(KhoaHoc);
        this.khoaHoc = KhoaHoc;
        this.user = User;
    }

    getAllKhoaHoc() {
        return this.khoaHoc.findAll();
    }

    getKhoaHocId(KhoaHocId) {
        return this.khoaHoc.findByPk(KhoaHocId);
    }

    createKhoaHoc(khoahoc) {
        return this.khoaHoc.create(khoahoc);
    }

    deleteKhoaHoc(KhoaHocId) {
        return this.khoaHoc.destroy({
            where: {
                Id: KhoaHocId
            }
        });
    }

    updateKhoaHoc(KhoaHocId, khoahoc) {
        return this.khoaHoc.update(khoahoc, {
            where: {
                Id: KhoaHocId
            }
        });
    }
    getKhoaHocWithUsers(khoaHocId) {
        return this.khoaHoc.findOne({
            where: { id: khoaHocId },
            attributes: ['id', 'TenKhoaHoc', 'NgonNgu'],
            include: [
                {
                    model: this.user,
                    through: {
                        attributes: ['BaiHocCuoiCung', 'createdAt']
                    },
                    attributes: ['id', 'Username', 'HoTen']
                }
            ]
        });
    }
}

module.exports = KhoaHocDAL;