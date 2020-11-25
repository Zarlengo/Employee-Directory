module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define('Department', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Department.associate = function (models) {
        Department.hasOne(models.Role, {
            onDelete: 'cascade',
        });
    };

    return Department;
};
