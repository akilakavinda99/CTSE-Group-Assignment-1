export const getDateAndTime = () => {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    // set one digit month and day to two digits
    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }
    // set one digit hour and minute to two digits
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }
    // set one digit second to two digits
    if (second < 10) {
        second = "0" + second;
    }
    // set date and time to a variable
    const dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
 
    return dateTime;
}

export const groupDocumets = (documents, groupBy) => {
    const groupedDocuments = documents.reduce((acc, document) => {
        const key = document[groupBy];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(document);
        return acc;
    }, {});
    return groupedDocuments;
}