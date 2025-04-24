function ValidateDateTime(timeString1 , timeString2){
    let depart = new Date(timeString1);
    let arrival = new Date(timeString2);

    return depart.getTime() < arrival.getTime()
}

module.exports = ValidateDateTime
