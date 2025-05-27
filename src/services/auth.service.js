const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


class AuthService {
    constructor(UserDAL, RoleDAL, UserRoleDAL) {
        this.userDAL = UserDAL;
        this.roleDAL = RoleDAL;
        this.userRoleDAL = UserRoleDAL;
    }

    async register(user) {
        if (!user || !user.Password) {
            throw new Error('Missing user or password');
        }

        const hashedPassword = await bcrypt.hash(user.Password, 10);
        const newUserData = {
            ...user,
            Password: hashedPassword,
        };

        const newUser = await this.userDAL.createUser(newUserData);

        const defaultRole = await this.roleDAL.findByRoleName('User');

        if (!defaultRole) {
            throw new Error('Role này hiện chưa tồn tại!!');
        }

        await this.userRoleDAL.createUserRole(newUser.id, defaultRole.id);

        return newUser;
    }

    async login(username, password) {
        const user = await this.userDAL.findByUsername(username);
        const roleObj = await this.userRoleDAL.getRoleId(user.id);
        const roleId = roleObj.RoleId;

        if (!user || !(await bcrypt.compare(password, user.Password))) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign({ id: user.id, roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }
}

module.exports = AuthService;