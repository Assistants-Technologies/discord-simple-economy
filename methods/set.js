const db = require('quick.db');

module.exports = async ({amount,type,user,guild}) => {
    if(!amount)return {"error":"noAmount"};
    type = type ? ((type == "bank" || type == "wallet") ? type : "wallet") : "wallet";
    if(isNaN(amount))return {"error":"amount is Not a Number"};

    await db.set(`cash.${guild}.${user}.${type}`, amount);
    return true;
}