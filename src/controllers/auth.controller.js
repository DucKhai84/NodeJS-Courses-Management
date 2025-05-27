
const apiResponse = require('../utils/apiResponse')

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  async register(req, res) {
    try {

      const { Username, Password, HoTen, SDT } = req.body;

      if (!Username || !Password || !HoTen || !SDT) {
        return res.status(400).json(apiResponse.error('Thiếu thông tin người dùng !! '));
      }

      const user = await this.authService.register({ Username, Password, HoTen, SDT });
      res.status(201).json({ message: 'Đăng ký thành công', user });
    } catch (err) {
      console.error(err);
      res.status(500).json(apiResponse.error('Lỗi khi đăng ký'));
    }
  }
  async login(req, res) {
    try {
      const result = await this.authService.login(req.body.Username, req.body.Password);
      if (!result) {
        return res.status(401).json(apiResponse.error('Tên tài khoản hoặc mật khẩu không đúng !!'));
      }
      const token = result.token;
      const user = result.user;
      res.status(200).json({ message: 'Đăng nhập thành công', token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json(apiResponse.error('Lỗi khi đăng nhập'));
    }
  }
}

module.exports = AuthController;
