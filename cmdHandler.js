const fs = require("fs");

class CMDHandler{
  static suffix = ".js";
  static fileSeperator = "/";
  static paths = "./cmd";
  
  constructor(prefix){
    this.prefix = prefix;
    this.commands = CMDHandler.loadCommands(CMDHandler.loadCommandPaths(CMDHandler.paths));
  }

  static isCommand(cmd){
    return cmd.startsWith(CMDHandler.prefix);
  }

  parseMessage(msg){
    let parts = msg.content.split(/ +/);
    let cmd = parts.shift().toLowerCase().trim();

    if(!isCommand(cmd)) return;
    
    for(const [command, value] of this.commands){
      if(cmd === command){
        value.callback(msg, parts);
        break;
      }
    }
  }
  getHelpMessage(){
    return "help";
  }

  static getFileName(dir){
    let parts = dir.split(CMDHandler.fileSeperator);
    let end = parts[parts.length - 1];

    return end.replace(/\.[^/.]+$/, "").toLowerCase().trim();
  }

  static loadCommands(cmdPaths){
    let cmd = {};
    
    cmdPaths.forEach((file)=>{
      const command = require(file);

      if(!command){
        console.warn(`File ${file} not Found`);
        return;
      }
      if(!command.callback){
        console.warn(`Command ${file} doesn't have a callback!!`);
        return;
      }
      if(!command.description){
        console.log(`Command ${file} doesn't have a description!!`);
        command.description = "No Description :- (";
      }

      cmd[CMDHandler.getFileName(file)] = command;
      
    });

    return cmd;
    
  }

  static loadCommandPaths(dir){
    let files = fs.readdirSync(dir, {withFileTypes:true});

    let cmds = [];

    files.forEach((file)=>{
      if(file.isDirectory()){
        cmds = [...cmds, ...CMDHandler.loadCommandPaths(`${dir}${CMDHandler.fileSeperator}${file.name}`)];
      } else if(file.name.endsWith(CMDHandler.suffix)){
        cmds.push(`${dir}/${file.name}`);
      }
      
    });

    return cmds;
  }
}

module.exports = CMDHandler;