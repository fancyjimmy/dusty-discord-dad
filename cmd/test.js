const {Message} = require("discord.js");
let description = "Do Something";

function callback(msg, ...args){
  msg.reply("Hihi");
  
}

module.exports = {
  description:description,
  callback: callback
};