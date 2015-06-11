module.exports = function (sequelize, DataTypes) {
    var Blog = sequelize.define('Blog', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "user",
                key: "id"
            },
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                console.log("check");
                Blog.belongsTo(models.User, {
                    foreignKey: 'user_id'
                });
            }
        },
        paranoid: true,
        underscored: true,
        tableName: 'blog' //not sure what the legacy table name is
    });


    return Blog;
};