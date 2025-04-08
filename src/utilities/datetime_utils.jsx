const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export const getMonthInText = (value, length) => {
    if (value.length == 0) return "";
    var date = new Date(value);
    return monthList[date.getMonth()]?.slice(0, length)
}

export const getDateInText = (value, monthLength) => {

    if (value.length == 0) return "";

    var date = new Date(value);
    return [date.getDate(), monthList[date.getMonth()]?.slice(0, monthLength), date.getFullYear()].join(" ")
}