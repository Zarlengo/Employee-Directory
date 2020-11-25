module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salary: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
    });

    Role.associate = function (models) {
        Role.belongsTo(models.Department, {
            foreignKey: {
                allowNull: false,
            },
        });

        Role.hasMany(models.Employee, {
            onDelete: 'cascade',
        });
    };

    return Role;
};
