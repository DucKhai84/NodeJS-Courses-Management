const BaseRepository = require('./baseRepository');

class UserDAL extends BaseRepository {
  constructor(User) {
    super(User);
    this.user = User;
  }

  getAllUsers() {
    return this.user.findAll();
  }

  getUserId(UserId) {
    return this.user.findByPk(UserId);
  }

  createUser(user) {
    return this.user.create(user);
  }

  deleteUser(UserId) {
    return this.user.destroy({
      where: {
        Id: UserId
      }
    });
  }

  updateUser(UserId, user) {
    return this.user.update(user, {
      where: {
        Id: UserId
      }
    });
  }

  findByUsername(username) {
    return this.user.findOne({ where: { Username: username } });
  }
}

module.exports = UserDAL;
