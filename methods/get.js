module.exports = async ({db, type, user, guild}) => {
    type = type ? ((type == "bank" || type == "wallet") ? type : "wallet") : "wallet";

    let cash = await db.get(`cash.${guild}.${user}.${type}`);
    cash ? null : cash = 0;
    return cash;
}