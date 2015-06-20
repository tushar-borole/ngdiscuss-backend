module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
         id: {
            type: DataTypes.BIGINT(20),
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "user",
                key: "id"
            },
            allowNull: true
        },
        blog_id: {
            type: DataTypes.BIGINT(20),
            references: {
                model: "blog",
                key: "id"
            },
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                console.log("blog association");
                Comment.belongsTo(models.User, {
                    foreignKey: 'user_id',
                    foreignKeyConstraint: true
                });
                Comment.belongsTo(models.Blog, {
                    foreignKey: 'blog_id',
                    foreignKeyConstraint: true
                });
            }
        },
        paranoid: true,
        underscored: true,
        tableName: 'comment' //not sure what the legacy table name is
    });


    return Comment;
};