const {KhoaHoc, User} = require('../models');
const BaseRepository = require('./baseRepository');

class KhoaHocDAL extends BaseRepository{

    constructor(){
        super(KhoaHoc);
    }

    getAllKhoaHoc(){
        return KhoaHoc.findAll();
    }

    getKhoaHocId(KhoaHocId){
        return KhoaHoc.findByPk(KhoaHocId);
    }

    createKhoaHoc(khoahoc){
        return KhoaHoc.create(khoahoc);
    }

    deleteKhoaHoc(KhoaHocId){
        return KhoaHoc.destroy({
            where:{
                Id: KhoaHocId
            }
        });
    }

    updateKhoaHoc(KhoaHocId, khoahoc){
        return KhoaHoc.update(khoahoc,{
            where:{
                Id: KhoaHocId
            }
        });
    }
    getKhoaHocWithUsers(khoaHocId) {
        return KhoaHoc.findOne({
          where: { id: khoaHocId },
          attributes: ['id', 'TenKhoaHoc', 'NgonNgu'],
          include: [
            {
              model: User,
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