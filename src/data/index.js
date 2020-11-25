import departmentSeed from './departmentSeed';
import roleSeed from './roleSeed';
import employeeSeed from './employeeSeed';

const employeeObject = {};
employeeSeed.forEach(element => {
    if ( element.nickname ) {
        employeeObject[element.id] = `${ element.nickname } (${ element.firstName }) ${ element.lastName }`;
    } else {
        employeeObject[element.id] = `${ element.firstName } ${ element.lastName }`;
    };
});

export default employeeSeed.map(element => {
    if ( element.nickname ) {
        element.name = `${ element.nickname } (${ element.firstName })`;
        element.email = `${ element.nickname.charAt(0) }.${ element.lastName }@company.com`;
    } else {
        element.name = element.firstName;
        element.email = `${ element.firstName.charAt(0) }.${ element.lastName }@company.com`;
    };

    if ( element.managerId ) {
        element.manager = employeeObject[element.managerId];
    } else {
        element.manager = null;
    }

    element.title = roleSeed[element.roleId].description;
    element.department = departmentSeed[roleSeed[element.roleId].departmentId].description;

    return element;
});
