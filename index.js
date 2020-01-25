
let createEmployeeRecord = function(record){
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(records) {
    return records.map(function(record) {
        return createEmployeeRecord(record)
    })
}

let createTimeInEvent = function(employee, dateTime) {
    // split dateTime and set as object atts
    let [date, hour] = dateTime.split(" ")
    
    // push data into timeInEvents object
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

// same as above function but for timeOutEvents
let createTimeOutEvent = function(employee, dateTime){
    let [date, hour] = dateTime.split(" ")

    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

let hoursWorkedOnDate = function(record, date) {
    // find the time in
    let timeIn = record.timeInEvents.find(function(f){
        return f.date === date
    })

    // find the time out
    let timeOut = record.timeOutEvents.find(function(f){
        return f.date === date
    })

    // subtract one from the other to find hours worked
    // divide by 100 to parse to hour format (ie. 1700 - 0900 = 800, so 8 hours worked)
    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(record, date) {
    // find hours worked on date
    let hours = hoursWorkedOnDate(record, date)

    // multiply hours worked by wage
    return (hours * record.payPerHour)
}

let allWagesFor = function(record) {
    // get a list of all dates
    let dates = record.timeInEvents.map(function(e){
        return e.date
    })

    // calculate wage on each date and reduce to total
    return dates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(record, d)
    }, 0)
}

// use allWagesFor to find total wages for each record, reduce to single sum
let calculatePayroll = function(records) {
    return records.reduce(function(memo, record){
        return memo + allWagesFor(record)
    }, 0)
}

let findEmployeeByFirstName = function(records, firstName) {
    return records.find(function(rec){
      return rec.firstName === firstName
    })
  }
  