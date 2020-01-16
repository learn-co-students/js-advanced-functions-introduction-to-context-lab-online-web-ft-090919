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

function checkForDate(event, date){
    debugger
    return event.date === date
}


function hoursWorkedOnDate(employee, date){
    const employeeInEvent = employee.timeInEvents.forEach(checkForDate(date)) //=> {type: ..., ...}
    const employeeOutEvent = employee.timeOutEvents.forEach(checkForDate(date))
    const hoursWorked = employeeOutEvent.hour - employeeInEvent.hour
    return hoursWorked
}