const { QuickDB } = require("quick.db")
const { MongoDriver } = require("quickmongo")
const methods = {
    add: require('./methods/add'),
    set: require('./methods/set'),
    get: require('./methods/get'),
    all: require('./methods/all'),
    daily: require('./methods/daily'),
    subtract: require('./methods/subtract'),
    lb: require('./methods/lb')
}

let database;

/**
 * Allows user select a DB driver
 * @param {"sqlite"|"mongodb"} driver Driver name
 * @param {object} options The options object
 * @returns {void}
 */
async function selectDriver(driver, options){
    if(!["mongodb", "sqlite"].includes(driver)) throw new TypeError("[discord-simple-economy] Unknown driver. Select either 'mongodb' or 'sqlite'!")

    if(driver == "mongodb" && !options.mongoUri) throw new SyntaxError("[discord-simple-economy] Missing mongo uri on options object.")

    if(driver == "sqlite") database = new QuickDB()
    if(driver == "mongodb"){
        const d = new MongoDriver(options.mongoUri)
        await d.connect()
        database = new QuickDB({ driver: d })
    }
}

class guildUser {
     /**
     * @param {user} string Discord user ID or member object with ID.
     * @param {guild} string Discord guild ID or guild object with ID.
     */
    constructor(user, guild) {
        if(!database) throw new SyntaxError("[discord-simple-economy] Missing database. Did you used selectDriver()?")
        user.id ? this.user = user.id : this.user = user;
        guild.id ? this.guild = guild.id : this.guild = guild;
    }

    async add(amount, type) {
        return (await methods.add({ db: database, amount: amount, type: type, user: this.user, guild: this.guild }));
    }

    async subtract(amount, type) {
        return (await methods.subtract({ db: database, amount: amount, type: type, user: this.user, guild: this.guild }));
    }

    async set(amount, type) {
        return (await methods.set({ db: database, amount: amount, type: type, user: this.user, guild: this.guild }));
    }

    async get(type) {
        return (await methods.get({ db: database, type: type, user: this.user, guild: this.guild }));
    }

    async all() {
        return (await methods.all({ db: database, guild: this.guild }));
    }

    async daily(amount, type) {
        return (await methods.daily({ db: database, amount: amount, type: type, user: this.user, guild: this.guild }));
    }

    async lb(type=null){
        return (await methods.lb({ db: database, type: type, user: this.user, guild: this.guild }));
    }
}


module.exports = {
    guildUser: guildUser,
    version: require("./package.json").version,
    selectDriver,
    randomNumber: (min, max) => {
        return (require('./methods/randomNumber')({min:min,max:max}));
    }
};
