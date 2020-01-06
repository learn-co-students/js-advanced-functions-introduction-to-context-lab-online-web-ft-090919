// Your code here
let createEmployeeRecord = function (row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function (employeeArray) {
  return employeeArray.map(function (row) {
    return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date
  })

  return employee
}

let createTimeOutEvent = function (employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: 'TimeOut',
    hour: parseInt(hour, 10),
    date
  })

  return employee
}

let hoursWorkedOnDate = function (employee, dateInput) {
  let inEvent = employee.timeInEvents.find(function (e) {
    return e.date === dateInput
  })

  let outEvent = employee.timeOutEvents.find(function (e) {
    return e.date === dateInput
  })

  return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function (employee, dateInput) {
  let grossWage = hoursWorkedOnDate(employee, dateInput) * employee.payPerHour
  return parseFloat(grossWage.toString())
}

let allWagesFor = function (employee) {
  let eligibleDates = employee.timeInEvents.map(function (e) {
    return e.date
  })

  let payable = eligibleDates.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(employee, d)
  }, 0)

  return payable
}

let calculatePayroll = function (employeeArray) {
  return employeeArray.reduce(function (memo, rec) {
      return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function (employeeArray, employeeFirstName) {
    return employeeArray.find(function (rec) {
        return rec.firstName === employeeFirstName
    }, 0)
}









