module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        },
        google: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        },
        github: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null

        }
    }, {
        classMethods: {
            associate: function (models) {
                console.log("yser");
                User.hasMany(models.Blog, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    },

                    foreignKeyConstraint: true
                });
                User.hasMany(models.Comment, {
                    foreignKey: {
                        name: 'user_id',
                        allowNull: false
                    },
                    foreignKeyConstraint: true
                });
            }
        },
        tableName: 'user' //not sure what the legacy table name is
    });


    return User;
};