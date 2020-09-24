exports.run = async (client, message, args) => {
 const Discord = require("discord.js");
  const db = require("megadb");
  let blacklist = new db.crearDB("BlackList");
  let blackrazon = new db.crearDB("Razones");
  let i = await blacklist.obtener("blacklist")
  var encontrados = [];
  i.forEach(id => {
    if (message.guild.members.cache.get(id)) {
      encontrados.push(id);
    }
  });
  if (encontrados < 1)
    return message.channel.send(
      "❌ No he detectado ningun raider en el servidor"
    );

let index = 0;
  let fin = []
  let reasons = []
  for(let i = 0; i < encontrados.length;i++){
    console.log(encontrados[i])
      let datos = await blackrazon.get(encontrados[i])
      reasons.push(datos)
     fin.push(`📌 ${++index} <@${encontrados[i]}> | **Razon:** ${reasons[i]}`)
  }
  

  message.channel.send(new Discord.MessageEmbed()
    .setColor("RED")
    .setThumbnail("https://image.freepik.com/vector-gratis/auditoria-o-investigacion-fiscal-o-lista-paginas-papel-traves-lupa-icono-vector-dibujos-animados-plana_101884-673.jpg")
    .setAuthor("Deteccion de usuarios maliciosos en " + message.guild.name)
    .setDescription( fin.join("\n") )
                       )
}