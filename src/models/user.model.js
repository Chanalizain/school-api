    import { DataTypes } from 'sequelize';
    import bcrypt from 'bcryptjs'; // <--- Make sure this is bcryptjs for consistency

    const UserModel = (sequelize) => {
        const User = sequelize.define('User', {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: { isEmail: true },
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        User.beforeCreate(async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        });

        // Hash password before update (optional, only if modified)
        User.beforeUpdate(async (user) => {
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        });

        return User;
    };

    export default UserModel;
