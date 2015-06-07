module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comment', {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.BIGINT(20),
            references: 'user', // <<< Note, its table's name, not object name
            referencesKey: 'id',
            allowNull: false
        },
        blog_id: {
            type: DataTypes.BIGINT(20),
            references: 'blog', // <<< Note, its table's name, not object name
            referencesKey: 'id',
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true,
        tableName: 'comment' //not sure what the legacy table name is
    });


    return Comment;
};