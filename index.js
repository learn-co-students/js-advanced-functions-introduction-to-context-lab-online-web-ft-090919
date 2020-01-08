class Employee {
  constructor(firstName, familyName, title, payPerHour) {
    this.timeInEvents = [],
      this.timeOutEvents = [],
      this.firstName = firstName,
      this.familyName = familyName
    this.title = title
    this.payPerHour = payPerHour
  }

} // Your code here

function createEmployeeRecord(row) {
  let firstName = row[0]
  let familyName = row[1]
  let title = row[2]
  let payPerHour = row[3]

  return (new Employee(firstName, familyName, title, payPerHour))

}

function createEmployeeRecords(info) {
  return info.map(function(row) {
    return createEmployeeRecord(row)
  })

}

function createTimeInEvent(employee, timeIn) {

  let [date, time] = timeIn.split(' ')
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time, 10),
    date,
  })

  return employee

}

function createTimeOutEvent(employee, timeOut) {

  let [date, time] = timeOut.split(' ')
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time, 10),
    date,
  })

  return employee

}


function hoursWorkedOnDate(employee, date) {

  let inD = employee.timeInEvents.find(function(e) {
    return e.date === date
  })

  let outD = employee.timeOutEvents.find(function(e) {
    return (e.date === date)

  })

  return (outD.hour - inD.hour) / 100
}

function wagesEarnedOnDate(employee, date) {
  let wagesDay = hoursWorkedOnDate(employee, date)
  return (wagesDay * employee.payPerHour)
}

function allWagesFor(employee) {
  let allDates = employee.timeInEvents.map(function(e) {
    return e.date
  })

  let pay = allDates.reduce(function(all, day) {
    return all + wagesEarnedOnDate(employee, day)
  }, 0)
  return pay
}

function calculatePayroll(data) {
  return data.reduce(function(employees, employee) {
    return employees + allWagesFor(employee)
  }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec) {
    return rec.firstName === firstName
  })
}
