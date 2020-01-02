

let createEmployeeRecord = function(employee){
  return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}


function createEmployeeRecords(rows){
  return rows.map(createEmployeeRecord)
}

const getHour = function(dateTime){
  return parseInt(dateTime.match(/\d{4}$/)[0])
}

const getDate = function(dateTime){
  return dateTime.match(/\d{4}-\d{2}-\d{2}/)[0]
}

function createTimeInEvent(record, timeIn){
  record.timeInEvents.push({
    type: "TimeIn",
    date: getDate(timeIn),
    hour: getHour(timeIn)
  })
  return record
}

function createTimeOutEvent(record, timeOut){
  record.timeOutEvents.push({
    type: 'TimeOut',
    date: getDate(timeOut),
    hour: getHour(timeOut)
  })
  return record
}

function hoursWorkedOnDate(record, date){
  let timeIn = record.timeInEvents.find(event => event.date == date)
  let timeOut = record.timeOutEvents.find(event => event.date == date)
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(record, date){
  let hours = hoursWorkedOnDate(record, date)
  return record.payPerHour * hours
}

let allWagesFor = function(record){
  return record.timeInEvents.reduce((total, event) => {return total + wagesEarnedOnDate(record, event.date)}, 0)
}


let calculatePayroll = function(employees){
  return employees.reduce((total,employee) => {return total + allWagesFor(employee)}, 0)
}


let findEmployeeByFirstName = function(employees, name){
  return employees.find(employee => employee.firstName == name)
}
