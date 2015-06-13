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
        lastname: {
            type: DataTypes.STRING,
            allowNull: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                 console.log("yser");
                User.hasMany(models.Blog,{ foreignKey: 'user_id', foreignKeyConstraint: true});
                 User.hasMany(models.Comment,{ foreignKey: 'user_id', foreignKeyConstraint: true});
            }
        },
        tableName: 'user' //not sure what the legacy table name is
    });


    return User;
};