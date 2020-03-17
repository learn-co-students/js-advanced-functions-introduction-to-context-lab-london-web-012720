const createEmployeeRecord = array => {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  };
};

const createEmployeeRecords = array => {
  const newArr = array.map(arr => createEmployeeRecord(arr));
  return newArr;
};

let createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  });

  return employee;
};

let createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(" ");

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  });

  return employee;
};

const hoursWorkedOnDate = (employee, givenDate) => {
  let inEvent = employee.timeInEvents.find(e => {
    return e.date === givenDate;
  });

  let outEvent = employee.timeOutEvents.find(e => {
    return e.date === givenDate;
  });

  return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = (employee, givenDate) => {
  let rawWage = hoursWorkedOnDate(employee, givenDate) * employee.payPerHour;
  return parseFloat(rawWage.toString());
};

const allWagesFor = employee => {
  let eligibleDates = employee.timeInEvents.map(function(e) {
    return e.date;
  });
  const pay = eligibleDates.reduce((accum, ca) => {
    return accum + wagesEarnedOnDate(employee, ca);
  }, 0);
  return pay;
};

const findEmployeeByFirstName = (employees, firstName) => {
  const employee = employees.find(employee => employee.firstName === firstName);
  return employee;
};

let calculatePayroll = function(arrayOfEmployeeRecords) {
  return arrayOfEmployeeRecords.reduce(function(memo, rec) {
    return memo + allWagesFor(rec);
  }, 0);
};
