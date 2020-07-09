// Your code here

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowData) {
    return employeeRowData.map(function(row){
        return createEmployeeRecord(row) 
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour ] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type:"TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp ) {
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date, 
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === date
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, date) {
    let wages = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wages.toString())
}

let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = dates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

let calculatePayroll = function(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

