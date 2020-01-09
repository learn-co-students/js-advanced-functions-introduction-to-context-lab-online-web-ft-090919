function mapToNegativize(sourceArray) {
    let new_array = []
    sourceArray.forEach(int => {
        new_array.push(int * -1)
    })
    return new_array
}

arr.map(a => {
    return a * 2 
  })


  function createTimeInEvent(obj, dateStamp) {
    let timeInEvents = []
    // obj.type = "TimeIn"
    // obj.hour = dateStamp[11] + dateStamp[12]
    // obj.time = 
    timeInEvents.push(obj)
    timeInEvents.last.type = "TimeIn"
    timeInEvents.last.hour = dateStamp[11] + dateStamp[12]
    timeInEvents.last.date = dateStamp[8] + dateStamp[9]
    return timeInEvents.last 
}


let newEvent = updatedRecord.timeInEvents[0]


const createTimeInEvent = (employeeObj, timeStampIn) => {
    const timeInObj = {};
    const [date, time] = timeStampIn.split(' ');
  
    timeInObj.type = "TimeIn";
    timeInObj.hour = parseInt(time, 10);
    timeInObj.date = date;
  
    employeeObj["timeInEvents"].push(timeInObj)
  
    const updatedEmployeeObj = Object.assign({}, employeeObj);
  
    return updatedEmployeeObj;
  };
  

//   -obj hash has a "timeInEvents" attribute.
//   -That attribute holds a hash. (or an array?)
//   -That hash has a key that points to another hash.
//   -That hash has the type, hour, and date keys pointing to their 
//    values
//   -So the type, hour, and date belong to the "timeIn" hash,
//    which belongs to "timeInEvents" hash, which belongs to the obj
//    hash.
//   -Create and assign variable for a hash that has the 
//    updated obj (with above info) inside it
//   -Return the new obj hash 


// newRecord - {}
//     name - string
//     lastname
//     etc. 
//     timeInEvents - {}
//         timeIn - {}
//             type 
//             hour
//             date 

// timeIn.date = dateStamp[8] + dateStamp[9]


let aInt = parseInt(a, 10)
let bInt = parseInt(b, 10)





let a = ["corinna", "brock", "cohort lead", 30]
undefined
let a = ["corinna", "brock", "cohort lead", 30]
VM3838:1 Uncaught SyntaxError: Identifier 'a' has already been declared
    at <anonymous>:1:1
(anonymous) @ VM3838:1
let b = ["jamie", "lee", "student", 20]
undefined
let arr = [a, b]
undefined
let dateStamp = "2014-02-28 1400"
undefined
let corinna = (createEmployeeRecords(arr))
undefined
corinna = (createEmployeeRecords(arr))[0]
{firstName: "corinna", familyName: "brock", title: "cohort lead", payPerHour: 30, timeInEvents: Array(0), …}
date = "2014-02-28"
"2014-02-28"
createTimeInEvent(corinna, dateStamp)
{firstName: "corinna", familyName: "brock", title: "cohort lead", payPerHour: 30, timeInEvents: Array(1), …}
createTimeOutEvent(corinna, dateStamp)
{firstName: "corinna", familyName: "brock", title: "cohort lead", payPerHour: 30, timeInEvents: Array(1), …}
let updatedCorinna = createTimeInEvent(corinna, dateStamp)
undefined
hoursWorkedOnDate(corinna, date)
0
updatedCorinna.timeInEvents[0].date
"2014-02-28"
updatedCorinna.timeInEvents[0].hour
1400
updatedCorinna.timeOutEvents[0].hour
1400

let date = d.date 



const allWagesFor = (employeeObj) => {
    const dates = employeeObj["timeInEvents"].map(event => event.date);
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeObj, date), 0);
  };
  
  const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((total, employee) => total + allWagesFor(employee), 0);
  };
  
  const findEmployeeByFirstName = (employeeRecords, name) => {
    return employeeRecords.find(record => record.firstName === name);
  };



  const hoursWorkedOnDate = (employeeObj, date) => {
    const timeInEvent = employeeObj["timeInEvents"].find(event => event.date === date);
    const timeOutEvent = employeeObj["timeOutEvents"].find(event => event.date === date);
  
    return (timeOutEvent["hour"] - timeInEvent["hour"]) / 100;
  };



  function hoursWorkedOnDate(newRecord, dateStamp) {
    let timeIn 
    let timeOut
    let date = dateStamp.slice(0, 10)
    if (date === newRecord["timeInEvents"][0].date) 
     timeIn = newRecord["timeInEvents"][0].hour
    if (date === newRecord["timeOutEvents"][0].date)
     timeOut = newRecord["timeOutEvents"][0].hour 
     let hours = (timeOut - timeIn)/100 
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