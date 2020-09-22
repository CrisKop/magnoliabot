const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const db = require("megadb")
const vips_db = new db.crearDB("Vips");
let i = await vips_db.obtener("Vips")
  
  var encontrados = [];

let index = 0;
  let fin = []
  let reasons = []
  for(let i = 0; i < encontrados.length;i++){
    console.log(encontrados[i])
      let datos = await vips_db.get(encontrados[i])
      reasons.push(datos)
     fin.push(`${++index}📌 <@${encontrados[i]}>`)
  }
  
  
  const embed = new Discord.MessageEmbed()
  .setAuthor(`Lista VIPS ${client.user.username}`)
  .setDescription(fin.join("\n"))
  .addField("Ids:", i)
  message.channel.send(embed)
}