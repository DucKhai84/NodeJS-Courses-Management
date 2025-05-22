const UserService = require ('../services/user.service');
const apiReponse = require('../utils/apiResponse')

class UserController {

  constructor() {
    this.userService = new UserService();
  }
  async getAll(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json(apiReponse.error('Lỗi khi lấy dữ liệu người dùng !!'));
    }
  }

  async getById(req, res) {
    try {
      const user = await this.userService.getUserId(req.params.id);
      if (!user) {
        return res.status(404).json(apiReponse.error('Không tìm thấy ID người dùng'));
      }
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(apiReponse.error('Lỗi khi lấy id người dùng'));
    }
  }

  async create(req, res) {
    try {
      const { Username, Password, HoTen, DiaChi, SDT } = req.body;
      const newUser = await this.userService.createUser({
        Username,
        Password,
        HoTen,
        DiaChi,
        SDT
      });
      res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(apiReponse.error('Lỗi khi tạo người dùng'));
    }
  }

  async delete(req, res) {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        return res.status(404).json(apiReponse.error('Người dùng không tồn tại'));
      }
      res.status(204).send();
    } catch (err) {
      console.error(err);
      res.status(500).json(apiReponse.error('Lỗi khi xóa người dùng'));
    }
  }

  async update(req, res) {
    try {
      const { Username, Password, HoTen, DiaChi, SDT } = req.body;
      const updatedUser = await this.userService.updateUser(req.params.id, {
        Username,
        Password,
        HoTen,
        DiaChi,
        SDT
      });
      if (!updatedUser) {
        return res.status(404).json(apiReponse.error('Người dùng không tồn tại'));
      }
      res.json(updatedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(apiReponse.error('Lỗi khi cập nhật thông tin người dùng'));
    }
  }
}

module.exports = new UserController(); 

