const methods = {
    add: require('./methods/add'),
    set: require('./methods/set'),
    get: require('./methods/get'),
    all: require('./methods/all'),
    daily: require('./methods/daily'),
    subtract: require('./methods/subtract')
}

class guildUser {
    constructor(user, guild) {
        user.id ? this.user = user.id : this.user = user;
        guild.id ? this.guild = guild.id : this.guild = guild;
    }

    async add(amount, type) {
        return (await methods.add({amount:amount,type:type,user:this.user,guild:this.guild}));
    }

    async subtract(amount, type) {
        return (await methods.subtract({amount:amount,type:type,user:this.user,guild:this.guild}));
    }

    async set(amount, type) {
        return (await methods.set({amount:amount,type:type,user:this.user,guild:this.guild}));
    }

    async get(type) {
        return (await methods.get({type:type,user:this.user,guild:this.guild}));
    }

    async all() {
        return (await methods.all({guild:this.guild}));
    }

    async daily(amount, type) {
        return (await methods.daily({amount:amount,type:type,user:this.user,guild:this.guild}));
    }
}


module.exports = {
    guildUser: guildUser,
    version: require("./package.json").version,
    randomNumber: (min, max) => {
        return (require('./methods/randomNumber')({min:min,max:max}));
    }
};