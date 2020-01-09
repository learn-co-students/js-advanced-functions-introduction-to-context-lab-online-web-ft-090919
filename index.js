// Your code here

function createEmployeeRecord(arr) {
        let newRecord = {}
        newRecord.firstName = arr[0]
        newRecord.familyName = arr[1]
        newRecord.title = arr[2]
        newRecord.payPerHour = arr[3]
        newRecord.timeInEvents = []
        newRecord.timeOutEvents = []    
        return newRecord 
}

function createEmployeeRecords(arr) {
    let newRecords = 
    arr.map(a => {
        // return a as an object 
        return createEmployeeRecord(a)
    })
    return newRecords 
}

function createTimeInEvent(newRecord, dateStamp) {
    let timeIn = {}

    timeIn.type = "TimeIn"
    timeIn.date = dateStamp.slice(0, 10)
    timeIn.hour = parseInt((dateStamp.slice(11, 15)), 10)

    newRecord["timeInEvents"].push(timeIn)

   let updatedRecord = newRecord 
   return updatedRecord 
}

function createTimeOutEvent(newRecord, dateStamp) {
    let timeOut = {}

    timeOut.type = "TimeOut"
    timeOut.date = dateStamp.slice(0, 10)
    timeOut.hour = parseInt((dateStamp.slice(11, 15)), 10)

    newRecord["timeOutEvents"].push(timeOut)

   let updatedRecord = newRecord 
   return updatedRecord 
}

function hoursWorkedOnDate(newRecord, dateStamp) {
    let date = dateStamp.slice(0, 10)

    let timeIn = newRecord["timeInEvents"].find(d => d.date === date)
    let timeOut = newRecord["timeOutEvents"].find(d => d.date === date)

    let hours = (timeOut.hour - timeIn.hour)/100 
    return hours 
}

function wagesEarnedOnDate(newRecord, date) {
    let pay = (newRecord.payPerHour) * (hoursWorkedOnDate(newRecord, date))
    return pay 
}

function allWagesFor(newRecord) {
    let dateArray = newRecord["timeInEvents"].map(d => d.date)

    return dateArray.reduce((allPay, date) => allPay + wagesEarnedOnDate(newRecord, date), 0)
}

function findEmployeeByFirstName(arr, name = "") {
   let result = arr.find(n => n.firstName = name)
   return result 
}

function calculatePayroll(arr) {
    return arr.reduce((total, employee) => total + (allWagesFor(employee)), 0)
}

