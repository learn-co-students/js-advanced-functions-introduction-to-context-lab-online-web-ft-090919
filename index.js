// Your code here
const createEmployeeRecord = (information) => ({
    firstName: information[0],
    familyName: information[1],
    title: information[2],
    payPerHour: information[3],
    timeInEvents: [],
    timeOutEvents: []
})

const createEmployeeRecords = (informationArray) => informationArray.map(createEmployeeRecord);

function createTimeEvent(employee, time, type) {
    let [date, hour] = time.split(' ');
    hour = parseInt(hour.slice(0, -2) + '00');
    employee[type[0].toLowerCase() + type.slice(1) + 'Events'].push({
        type: type,
        hour: hour,
        date: date
    });
    return employee;
}

const createTimeInEvent = (employee, time) => createTimeEvent(employee, time, 'TimeIn');
const createTimeOutEvent = (employee, time) => createTimeEvent(employee, time, 'TimeOut');

function hoursWorkedOnDate(employee, date) {
    const dateFunc = (ev) => ev.date === date;
    let timeIn = employee.timeInEvents.find(dateFunc);
    let timeOut = employee.timeOutEvents.find(dateFunc);
    return (timeOut.hour - timeIn.hour) / 100;
}

const wagesEarnedOnDate = (employee, date) => hoursWorkedOnDate(employee, date) * employee.payPerHour;

function allWagesFor(employee) {
    return employee.timeInEvents.map(
        (stamp) => stamp.date
    ).reduce(
        (total, date) => total + wagesEarnedOnDate(employee, date), 0
    )
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

findEmployeeByFirstName = (employees, firstName) => employees.find((employee) => employee.firstName === firstName);
