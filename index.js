const createEmployeeRecord = (employeeDetails) => {
  const [firstName, familyName, title, payPerHour] = employeeDetails;

  const employeeObj = {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payPerHour,
    timeInEvents: [],
    timeOutEvents: []
  };

  return employeeObj;
};

const createEmployeeRecords = (nestedEmployeeDetails) => {
  return nestedEmployeeDetails.map(employeeDetails => createEmployeeRecord(employeeDetails));
};

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

const createTimeOutEvent = (employeeObj, timeStampOut) => {
  const timeOutObj = {};
  const date = timeStampOut.slice(0, 10);
  const time = timeStampOut.slice(11);

  timeOutObj.type = "TimeOut";
  timeOutObj.hour = parseInt(time, 10);
  timeOutObj.date = date;

  employeeObj["timeOutEvents"].push(timeOutObj)

  const updatedEmployeeObj = Object.assign({}, employeeObj);

  return updatedEmployeeObj;
};

const hoursWorkedOnDate = (employeeObj, date) => {
  const timeInEvent = employeeObj["timeInEvents"].find(event => event.date === date);
  const timeOutEvent = employeeObj["timeOutEvents"].find(event => event.date === date);

  return (timeOutEvent["hour"] - timeInEvent["hour"]) / 100;
};

const wagesEarnedOnDate = (employeeObj, date) => {
  const hoursWorked = hoursWorkedOnDate(employeeObj, date);
  return hoursWorked * employeeObj["payPerHour"];
};

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
