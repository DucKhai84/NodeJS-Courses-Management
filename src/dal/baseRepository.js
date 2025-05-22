// src/dal/BaseRepository.js
class BaseRepository {
  
    constructor(model) {
      this.model = model;
    }
  
    async getAll() {
      return await this.model.findAll();
    }
  
    async getById(id) {
      return await this.model.findByPk(id);
    }
  
    async create(data) {
      return await this.model.create(data);
    }
  
    async update(id, data) {
      return await this.model.update(data, {
        where: { id }
      });
    }
  
    async delete(id) {
      return await this.model.destroy({
        where: { id }
      });
    }

    async findByUsername(data){
      return await this.model.findOne({ where: { Username: data } });
    }
  }
  
  module.exports = BaseRepository;
  