const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserDAL = require('../dal/userDAL');
const RoleDAL = require('../dal/roleDAL');
const UserRoleDAL = require('../dal/userRoleDAL');

class AuthService {
    constructor() {
        this.userDAL = new UserDAL();
        this.roleDAL = new RoleDAL();
        this.userRoleDAL = new UserRoleDAL();
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

        const defaultRole = await this.roleDAL.findByRoleName('Admin');

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
        const token = jwt.sign({ id: user.Id, roleId}, process.env.JWT_SECRET, { expiresIn: '1h' });
        return { user, token };
    }
}

module.exports = AuthService;