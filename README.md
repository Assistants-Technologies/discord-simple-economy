# *discord-simple-economy*

Hey! This module was created for economics on Discord. If you are unfamiliar with databases or want to save some time, this module is for you!

You can start by installing this npm:
> npm install discord-simple-economy --save

#   How it's working?

Easy and fast. Data is saved to the **sqlite3** database using *quick-db*. Economics is divided into **wallet** and **bank** balance, so you have more room to act!

# Simple economy system

  Discord.js economic system has never been so easy to use before.
  *discord-simple-economy* supports activities such as **add,** **set**, **get**, **subtract**, **reset**, **delete**, **with**, **dep** and **daily**! (with, dep, reset and delete not in there already in `v2.0.0`...)



##   Introduction

To start your adventure, you need to create ecoClient with this module. It is not difficult.
Example:

```js
const Discord = require('discord.js');
const eco = require('discord-simple-economy');

const client = new Discord.Client();

client.on('message', async (message) => {
    const ecoClient = new eco.guildUser(message.author, message.guild);
    //eco stuff with ecoClient with author and guild :]
});

client.login("token");
```

* Note: *you can use `message.author.id` instead of `message.author` in `member` and `message.guild.id` instead of `message.guild` in `guild`*

### Functions List
|                |WALLET                         |BANK                         |
|----------------|-------------------------------|-----------------------------|
|add|`ecoClient.add(amount, "wallet")`            |`ecoClient.add(amount, "bank")`    
|set|`ecoClient.set(amount, "wallet")`            |`ecoClient.set(amount, "bank")`   
|subtract        |`ecoClient.subtract(amount, "wallet")`            |`ecoClient.subtract(amount, "bank")`   
|get          |`ecoClient.get("wallet")`            |`ecoClient.get("bank")`           |
|daily          |`ecoClient.daily(amount, "wallet")`            |`ecoClient.daily(amount, "bank")`           |
* amount should be an **number**

|                |USAGE                         |
|----------------|-------------------------------|
|randomNumber| `eco.randomNumber(minNumber, maxNumber)` |
|all|`ecoClient.all()`|
|lb|`ecoClient.lb(type)`|

* Info: `randomNumber` can be used only with `eco`, no with `ecoClient`
* Note: `all()` method returns all guild data (cash and daily stuff)


# Methods
## Add
```js
async function add(message, amount, type){
    await ecoClient.add(amount, type);
    const amountNow = await ecoClient.get(type);
    message.reply(`You have now **${amountNow}** in *${type}*!`);
}

add(message, 100, "bank");
```

## All
```js
async function all() {
    const allGuildData = await ecoClient.all();
    /*
    returns:
    {
        "cash": guildUsersCashData,
        "daily": guildUsersDailyData
    }
    */
   console.log(allGuildData);
}

all();
```

## Lb
```js
async function lb() {
    const lb = await ecoClient.lb('wallet');
    /*
    returns sorted Array with leaderboard (if type is not provided or type=null, it's sorting by both wallet and bank values).
    [
    {
        user: 'id',
        cash: 143423432
    },
    {
        user: 'id',
        cash: 45433
    },
    {
        user: 'id',
        cash: 4353
    }
    ]
    */
   console.log(lb);
}

lb();
```

## Daily
```js
async function collectDaily(message, type) {
    const amount = eco.randomNumber(1,50);
    const daily = await ecoClient.daily(amount, type);
    if(daily.error == 'alreadyCollected')return message.reply("You have already collected your daily reward. Go back tommorow.");
    
    message.reply(`Success. You have now **${amount}** more cash in *${type}*!`)
}

collectDaily(message);
```

## Get
```js
async function get(message, type){
    const amount = await ecoClient.get(type);
    message.reply(`Your amount of *${type}* is **${amount}**.`);
}

get(message, "bank");
```

## Random Number
```js
const randomNumber = eco.randomNumber(1,100);
```

## Set
```js
async function set(message, amount, type){
    await ecoClient.set(amount, type);
    message.reply(`Success. Your amount of cash in *${type}* is now **${amount}**.`);
}

set(message, 60, "bank");
```

## Subtract
```js
async function subtract(message, amount, type){
    await ecoClient.subtract(amount, type);
    const amountNow = await ecoClient.get(type);
    message.reply(`Successfully subtracted **${amount}** from *${type}*. You have now *${amountNow}* left in there.`);
}

subtract(message, 10, "wallet");
```

# Need help?
Join our <a href="https://discord.gg/c3Eqc6BFzX">Discord Support Server</a>!
