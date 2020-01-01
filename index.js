function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr) {
    return arr.map(array => createEmployeeRecord(array))
}

function createTimeInEvent(obj, date) {
    let split = date.split(' ')
    let myDate = split[0]
    let time = split[1]

    obj.timeInEvents.push({
        type: "TimeIn",
        date: myDate,
        hour: parseInt(time)
    })
    return obj 
}

function createTimeOutEvent(obj, date) {
    let splitDate = date.split(' ')
    let myDate = splitDate[0]
    let time = splitDate[1]

    obj.timeOutEvents.push({
        type: "TimeOut",
        date: myDate,
        hour: parseInt(time)
    })
    // Return the object!
    return obj 
}

function hoursWorkedOnDate(obj, date) {
    // Iterate through the nested arrays inside the objects to find the right date
   let timeIn = obj.timeInEvents.find(element => element.date === date)
   let timeOut = obj.timeOutEvents.find(element => element.date === date)

    // Divide by 100 because hr is in military style
   return (timeOut.hour - timeIn.hour ) / 100
}

function wagesEarnedOnDate(obj, date) {
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
}

function allWagesFor(obj) {
    // returns an array of the 'date' attribute
    let dates = obj.timeInEvents.map(function(el){
        return el.date
    })
    // I want to take the array of dates and pass each one to wagesEarnedOnDate fn which I want to return an array of wages earned. Then I want to go through that shit and reduce the values to get the sum.
    let wages = []
    dates.map(function(date) {
        wages.push(wagesEarnedOnDate(obj, date))
    })    

    return wages.reduce((a, b) => a + b)
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(obj => obj.firstName === name)
}

function calculatePayroll(arr) {
    let workersWages = []
    arr.map(function(obj) {
        workersWages.push(allWagesFor(obj))
    })
    return workersWages.reduce((a, b) => a + b)
}