module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT(20),
             references: {
                model: "user",
                key: "id"
            },
            allowNull: false
        },
        blog_id: {
            type: DataTypes.BIGINT(20),
             references: {
                model: "blog",
                key: "id"
            },
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        tableName: 'comment' //not sure what the legacy table name is
    });


    return Comment;
};