const createEmployeeRecord = arr => {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = arr => {
    return arr.map(el => {
        return createEmployeeRecord(el)
    })
}

const createTimeInEvent = (obj, stamp) => {
    let [date, hour] = stamp.split(' ')
    obj.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return obj
}

const createTimeOutEvent = (obj, stamp) => {
    let [date, hour] = stamp.split(' ')
    obj.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })
    return obj
}

const hoursWorkedOnDate = (obj, date) => {
    const timeInEvent = obj.timeInEvents.find(el => el.date === date)
    const timeOutEvent = obj.timeOutEvents.find(el => el.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100
}

const wagesEarnedOnDate = (obj, date) => {
    return hoursWorkedOnDate(obj, date) * obj.payPerHour
}

const allWagesFor = (obj) => {
    let dates = obj.timeOutEvents.map(el => el.date)
    return dates.reduce((x, date) => x + wagesEarnedOnDate(obj, date), 0)
}

const findEmployeeByFirstName = (arr, firstName) => {
    return arr.find(el => firstName === el.firstName)
}

const calculatePayroll = (arr) => {
    return  arr.reduce((x, el) => x + allWagesFor(el), 0)
}