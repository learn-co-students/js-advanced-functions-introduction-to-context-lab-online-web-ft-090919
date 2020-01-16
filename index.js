// Your code here

function createEmployeeRecord(array){
    return {firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []}
}

function createEmployeeRecords(arrays){
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(employee, date){
    employee.timeInEvents.push({type: 'TimeIn', hour: parseInt(date.slice(11, 15)), date: date.slice(0, 10) })
    return employee
}

function createTimeOutEvent(employee, date){
    employee.timeOutEvents.push({type: 'TimeOut', hour: parseInt(date.slice(11, 15)), date: date.slice(0, 10) })
    return employee
}


function hoursWorkedOnDate(employee, date){
    const employeeInEvent = employee.timeInEvents.find((event) => { return event.date === date}) //=> {type: ..., ...}
    const employeeOutEvent = employee.timeOutEvents.find((event) => {return event.date === date})
    const hoursWorked = employeeOutEvent.hour - employeeInEvent.hour
    return hoursWorked / 100
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee['payPerHour']
}

function allWagesFor(employee){
    const dates = employee.timeInEvents.map((event) => {return event.date} )
    return dates.reduce((sum, date) => {return sum + wagesEarnedOnDate(employee, date)}, 0)
}

function findEmployeeByFirstName(src, firstName){
    return src.find((employee) => {return employee.firstName === firstName})
}

function calculatePayroll(src){
    return src.reduce((sum, employee) => {return sum + allWagesFor(employee)},0)    
}