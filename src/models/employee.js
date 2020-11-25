module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        managerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    });

    Employee.associate = function (models) {
        Employee.belongsTo(models.Role, {
            foreignKey: {
                allowNull: false,
            },
        });
    };

    return Employee;
};
