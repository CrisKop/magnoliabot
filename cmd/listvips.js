const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const db = require("megadb")
const vips_db = new db.crearDB("Vips");
let i = await vips_db.obtener("Vips")
  
 if (!vips_db.tiene("Vips")) {
      vips_db.establecer("Vips", []);
    } 
  
  var encontrados = [];
   i.forEach(id => {
    if (message.guild.members.cache.get(id)) {
      encontrados.push(id);
    }
  });

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
   .setAuthor("Hay `"+ parseInt(encontrados.length) +"` Usuarios VIPS en: " + message.guild.name)
  .setDescription(fin.join("\n"))
  await message.channel.send(embed)
}