const db = require('quick.db');

module.exports = async ({amount,type,user,guild}) => {
    if(!amount)return {"error":"noAmount"};
    type = type ? ((type == "bank" || type == "wallet") ? type : "wallet") : "wallet";
    if(isNaN(amount))return {"error":"amount is Not a Number"};

    let date = new Date(Date.now());

    let day = date.getDate();
    if(day < 10)day = `0${day}`;
    let month = Number(date.getMonth()) + 1;
    if(month < 10)month = `0${month}`;
    let year = date.getFullYear();
    let hour = date.getHours();
    if(hour < 10)hour = `0${hour}`;
    let minutes = date.getMinutes();
    if(minutes < 10)minutes = `0${minutes}`;

    let time = `${day}_${month}_${year}`

    let todayUsed = await db.get(`daily.${guild}.${time}`);
    if(!todayUsed)todayUsed = [];
    if(todayUsed.includes(user))return {"error":"alreadyCollected"};

    await db.add(`cash.${guild}.${user}.${type}`, amount);
    db.push(`daily.${guild}.${time}`, user);
    return true;
}