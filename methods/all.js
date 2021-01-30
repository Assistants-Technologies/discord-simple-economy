const db = require('quick.db');

module.exports = async ({guild}) => {
    let allData = {};
    const cashData = await db.get(`cash.${guild}`);
    allData.cash = cashData;
    const dailyData = await db.get(`daily.${guild}`);
    allData.daily = dailyData;
    return allData;
};