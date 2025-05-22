const BaseRepository = require('./baseRepository');
const { User } = require('../models');

class UserDAL extends BaseRepository {
  constructor() {
    super(User);
  }

  getAllUsers() {
    return User.findAll();
  }

  getUserId(UserId) {
    return User.findByPk(UserId);
  }

  createUser(user) {
    return User.create(user);
  }

  deleteUser(UserId) {
    return User.destroy({
      where: {
        Id: UserId
      }
    });
  }

  updateUser(UserId, user) {
    return User.update(user, {
      where: {
        Id: UserId
      }
    });
  }

  findByUsername(username) {
    return User.findOne({ where: { Username: username } });
  }
}

module.exports = UserDAL;
