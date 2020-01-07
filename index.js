// Your code here
function createEmployeeRecord(arr) { 
  return { 
    firstName: arr[0],
    familyName: arr [1],
    title: arr [2],
    payPerHour: arr [3],
    timeInEvents: [], 
    timeOutEvents: []
  } 
} 

function createEmployeeRecords(arr) {
    let newArr = []
    arr.map((employee) => {
        newArr.push(createEmployeeRecord(employee))
  })
  return newArr
}

function createTimeInEvent (employee, dateStamp) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
  }
  employee.timeInEvents.push(timeIn)
  return employee
}

function createTimeOutEvent (employee, dateStamp) { 
  let timeOut = { 
    type: "TimeOut", 
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0]
  } 
  employee.timeOutEvents.push(timeOut)
  return employee 
} 

function hoursWorkedOnDate (employee, date) {
    let startHour = employee.timeInEvents.find(event => event.date === date).hour
    let endHour = employee.timeOutEvents.find(event => event.date === date).hour
    let hours = (endHour - startHour) / 100
    return hours
} 

function wagesEarnedOnDate (employee, date) { 
  let hours = hoursWorkedOnDate(employee, date)
  let pay = hours * employee.payPerHour
  return pay 
} 

function allWagesFor (employee) {
    let pay = 0
    for (let i = 0; i < employee.timeInEvents.length; i++) {
        pay += wagesEarnedOnDate(employee, employee.timeInEvents[i].date)
    }
    return pay
} 

function calculatePayroll (employees) {
    let allPay = 0
    employees.forEach(employee => {
      allPay += allWagesFor(employee)
      
    })
    return allPay
}

function findEmployeeByFirstName (employees, firstName) { 
  return employees.find(employee => employee.firstName) 
} 