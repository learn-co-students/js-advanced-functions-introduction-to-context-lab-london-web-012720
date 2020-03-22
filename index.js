// Your code here
let createEmployeeRecord = (row) => {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = (employeeData) => {
    return employeeData.map((row) => {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = (employee, timeStamp) => {
    let [date, hour] =timeStamp.split(' ')

    employee.timeInEvents.push ({
        type: 'TimeIn',
        hour: parseInt(hour, 10),
        date 
        
    })
    return employee
}

let createTimeOutEvent = (employee, dateStamp) => {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return employee
}

let hoursWorkedOnDate = (employee, dateStamp) => {
    let inDate = employee.timeInEvents.find( (event) => {
        return event.date === dateStamp
    })
    let outDate = employee.timeOutEvents.find( (event) => {
        return event.date === dateStamp
    })
    return (outDate.hour - inDate.hour) / 100
}

let wagesEarnedOnDate = (employee, dateStamp) => {
    let wage = hoursWorkedOnDate(employee, dateStamp)
        * employee.payPerHour 

    return parseFloat(wage.toString())
}

let allWagesFor = (employee) => {
    let dates = employee.timeInEvents.map( (event) => {
        return event.date
    })

    let pay = dates.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return pay
}

let findEmployeeByFirstName = (employees, name) => {
    return employees.find ( (employee) => {
        return employee.firstName === name
    })
}
 
let calculatePayroll = (EmployeeRecords) => {
    return EmployeeRecords.reduce( (memo, record) => {
        return memo + allWagesFor(record)
    }, 0)
}