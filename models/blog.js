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
        comment_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        pageview_count: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                console.log("blog association");
                Blog.belongsTo(models.User, {
                    foreignKey: 'user_id',
                    foreignKeyConstraint: true
                });
            }
        },
        paranoid: true,
        underscored: true,
        tableName: 'blog' //not sure what the legacy table name is
    });


    return Blog;
};