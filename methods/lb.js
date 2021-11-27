const db = require('quick.db');

module.exports = async ({type,user,guild}) => {
    type = type ? ((type == "bank" || type == "wallet") ? type : null) : null;

    const eco = require('../main');
    const ecoClient = new eco.guildUser(user, guild);
    const allData = await ecoClient.all();

    allData.cash ? null : allData.cash = {};

    let endArray = [];

    let count = 0;
    for (let i in allData.cash) {
        let ov = Object.values(allData.cash)[count];

        let returnHowMuch = 0;
        if(type == null){
            returnHowMuch = Number(ov['bank'] || 0) + Number(ov['wallet'] || 0);
        }else if(type == "bank"){
            returnHowMuch = Number(ov['bank'] || 0);
        }else if(type == "wallet"){
            returnHowMuch = Number(ov['wallet'] || 0)
        }
        endArray.push({user: Object.keys(allData.cash)[count], cash: returnHowMuch || 0});

        count++;
    }
    return endArray.sort((a, b) => b.cash - a.cash);
}
