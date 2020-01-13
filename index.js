// Your code here

function createEmployeeRecord(paramArray){
  const [firstName, familyName, title, payRate] = paramArray
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrayOfArrays){
  let arrayOfObjects = arrayOfArrays.map(array => createEmployeeRecord(array))
  return arrayOfObjects
}

function createTimeInEvent(record, dateStamp){
  let timeInEvent = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0,10)
  }
  record.timeInEvents.push(timeInEvent)
  return record
}

function createTimeOutEvent(record, dateStamp){
  let timeOutEvent = {
    type: "TimeOut",
    hour: parseInt(dateStamp.slice(-4)),
    date: dateStamp.slice(0,10)
  }
  record.timeOutEvents.push(timeOutEvent)
  return record
}

function hoursWorkedOnDate(record, date){
  let timeInFound = record.timeInEvents.find(object => {
    return object.date === date ? object.hour : false
  })

  let timeOutFound = record.timeOutEvents.find(object => {
    return object.date === date ? object.hour : false
  })

  return (timeOutFound.hour - timeInFound.hour) / 100
}



function wagesEarnedOnDate(record, date){
  return hoursWorkedOnDate(record, date) * record.payPerHour
}

function allWagesFor(record){
  let hoursWorked = record.timeInEvents.reduce((total, timeInEvent) => {

    let matchingOutEvent = record.timeOutEvents.find(timeOutEvent => {
      return timeOutEvent.date === timeInEvent.date ? timeOutEvent : false
    })

    return (((matchingOutEvent.hour - timeInEvent.hour) / 100) + total)

  }, 0)

  return hoursWorked * record.payPerHour
}


function findEmployeeByFirstName(srcArray, firstName){
  return srcArray.find(record => {return record.firstName === firstName})
}

function calculatePayroll(recordArray){
  return recordArray.reduce((total, record) => total + allWagesFor(record), 0)
}
