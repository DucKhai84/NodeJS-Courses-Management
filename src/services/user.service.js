class UserService {
    constructor(UserDAL) {
        this.userDAL = UserDAL;
    }

    async getAllUsers() {
        return await this.userDAL.getAllUsers();
    }

    async getUserId(userId) {
        if (!userId) {
            throw new Error("Hãy nhập Id người dùng");
        }
        return await this.userDAL.getUserId(userId);
    }

    async createUser(user) {
        if (!user.Username || !user.Password || !user.HoTen || !user.DiaChi || !user.SDT) {
            throw new Error("Hãy nhập đầy đủ thông tin người dùng");
        }
        return await this.userDAL.createUser(user);
    }

    async deleteUser(userId) {
        if (!userId) {
            throw new Error("Hãy nhập Id người dùng");
        }
        return await this.userDAL.deleteUser(userId);
    }

    async updateUser(userId, user) {
        if (!userId) {
            throw new Error("Hãy nhập Id người dùng");
        }
        return await this.userDAL.updateUser(userId, user);
    }
}

module.exports = UserService;