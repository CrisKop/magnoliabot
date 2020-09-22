
const raiders = require("../raiders.json");
const fs = require("fs");
const db = require("megadb");
const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  let yaexiste = new Discord.MessageEmbed()
    .setAuthor("ID Ya Registrada")
    .setDescription(
      "**La ID que intentas añadir ya está registrada en la base de datos de Falexy Economic**"
    )
    .setColor(15158332);

  let permisos = [
  "520988949053702145", //candy
  "692363394719809577", //xeantrix
  ];

  if (!permisos.includes(message.author.id))
    return message.channel.send("**Necesitas ser dev del bot para usar el comando.**");
  let texto = args.join(' ');

  let args2 = texto.split(' | ');

  let razon = args2[1];
  let pruebass = args2[2];
  let autor = message.author.username
  let feecha = args2[3];

  if (!raiders[args2[0]]) {
    raiders[args2[0]] = {
      reason: false,
      status: "Raider desactivado",
      pruebas: false,
      author: false,
      feecha: false
    };
  }
  if (!args2[0] || !razon || !pruebass || !feecha)
    return message.channel.send("**Debe colocar los argumentos:** `"+prefix+"forceadd <id> | <razon> | <pruebas> | <fecha || DD/MM/YYYY>`") 

  if (raiders[args2[0]].status === "Raider activado")
    return message.channel.send("**La ID que intentas añadir ya está registrada en la base de datos de Falexy Economic**");
  raiders[args2[0]] = {
    reason: razon,
    status: "on",
    pruebas: pruebass,
    author: autor,
    fecha: feecha //no lo toques
  };

  fs.writeFile("./raiders.json", JSON.stringify(raiders), err => {
    if (err) console.log(err);
  });
  
let canal = client.channels.cache.get("758066566062407752")
let embedd = new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(`Forceban (Usuario Añadido)`)
.setThumbnail("https://image.flaticon.com/icons/svg/3039/3039418.svg")
.setDescription("Un usuario ha sido correctamente a mi base de datos de usuarios maliciosos.")
.addField("👤 `|` **Usuario:**", "<@"+args2[0]+">")
.addField("🆔 `|` **ID**", `${args[0]}`)
.addField("👮 `|` **Rsponsable:**", message.author)
.addField("📆 `|` **Fecha de Sanción:**", feecha)
.addField("🧰 `|` **Razon:**", razon)
.addField("🖼️ `|` **Pruebas:**", `[Pruebas](${pruebass})`)
message.channel.send("**Se han enviado los reportes de forceban**")
canal.send(embedd)
canal.send("<@&731535699966296115>")
}