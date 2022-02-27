import CMDHandler from "./cmdHandler";
const discord = require("discord.js");
const fetch = require("node-fetch");



const client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

let cmdHandler = new CMDHandler("-");


client.once("ready", ()=>{
  console.log(`Logged in ${client.user.tag}!`)
});

client.on("messageCreate", msg =>{
  cmdHandler.parseMessage(msg);
});

client.login(process.env.TOKEN);