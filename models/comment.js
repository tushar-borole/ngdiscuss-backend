module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT(20),
             references: {
                model: "User",
                key: "id"
            },
            allowNull: true
        },
        blog_id: {
            type: DataTypes.BIGINT(20),
             references: {
                model: "Blog",
                key: "id"
            },
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                console.log("blog association");
                Comment.belongsTo(models.User, {
                    foreignKey: 'user_id',
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