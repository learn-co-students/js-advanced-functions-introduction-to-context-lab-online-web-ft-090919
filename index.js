function createEmployeeRecord(ray){
    return {
        firstName: ray[0],
        familyName: ray[1],
        title: ray[2],
        payPerHour: ray[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(employeeData){
    return employeeData.map(function(employee){
        return createEmployeeRecord(employee);
    });
}

function createTimeInEvent(employee,timeStamp){
    let [date, time] = timeStamp.split(" ");

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time,10),
        date: date
    });
    return employee;
}

function createTimeOutEvent(employee,timeStamp){
    let [date, time] = timeStamp.split(" ");

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time,10),
        date: date
    });
    return employee;
}

function hoursWorkedOnDate(employee,date){
    let timeIn = employee.timeInEvents.find((e) => {return e.date === date});
    let timeOut = employee.timeOutEvents.find((e) => {return e.date === date});

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(employee,date){
    let wage = hoursWorkedOnDate(employee,date) * employee.payPerHour;
    return wage;
}

function allWagesFor(employee){
    let datesWorked = employee.timeInEvents.map((e) => {return e.date});

    let totalPay = datesWorked.reduce(function(total, date){
        return total + wagesEarnedOnDate(employee,date);
    }, 0);
    return totalPay;
}

function calculatePayroll(employees){
    return employees.reduce(function(total,employee){
        return total + allWagesFor(employee);
    }, 0);
}

function findEmployeeByFirstName(employeesRay,firstName){
    return employeesRay.find((employee) => { return employee.firstName === firstName; });
}
