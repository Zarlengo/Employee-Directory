import departmentSeed from './departmentSeed';
import roleSeed from './roleSeed';
import employeeSeed from './employeeSeed';

// const eraseDatabaseOnSync = true;

export default function seed(db) {
    db.sequelize
    .sync({ force: true })
    .then(() => {
        console.log('Connection has been established successfully');
        db.Department.bulkCreate(departmentSeed)
            .then((data) => {
                console.log(data.length + ' records inserted in Department!');
                db.Role.bulkCreate(roleSeed)
                    .then((data) => {
                        console.log(
                            data.length + ' records inserted in Role!'
                        );
                        db.Employee.bulkCreate(employeeSeed)
                            .then((data) => {
                                console.log(
                                    data.length +
                                        ' records inserted in Employee!'
                                );
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    })
    .catch((error) =>
        console.error('Unable to connect to the database:', error)
    );
return;
};
