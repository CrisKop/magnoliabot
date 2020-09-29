
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
  let server = message.guild.name

  if (!raiders[args2[0]]) {
    raiders[args2[0]] = {
      reason: false,
      status: "Off",
      pruebas: false,
      author: false,
      feecha: false,
      server: false
    };
  }
  if (!args2[0] || !razon || !pruebass || !feecha)
    return message.channel.send("**Debe colocar los argumentos:** `"+prefix+"forceadd <id> | <razon> | <pruebas> | <fecha || DD/MM/YYYY>`") 

  if (raiders[args2[0]].status === "Raider activado")
    return message.channel.send("**La ID que intentas añadir ya está registrada en la base de datos de Falexy Economic**");
  raiders[args2[0]] = {
    reason: razon,
    status: "Raider activado",
    pruebas: pruebass,
    author: autor,
    fecha: feecha,//no lo toques
    server: server
  };

  fs.writeFile("./raiders.json", JSON.stringify(raiders), err => {
    if (err) console.log(err);
  });
  
let canal = client.channels.cache.get("758153160963129447")
let embedd = new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(`Forceban (Usuario Añadido)`)
.setThumbnail("https://image.flaticon.com/icons/svg/3039/3039418.svg")
.setDescription("Un usuario ha sido correctamente a mi base de datos de usuarios maliciosos.")
.addField("👤 `|` **Usuario:**", "<@"+args2[0]+">", true)
.addField("🆔 `|` **ID**", `${args[0]}`, true)
.addField("👮 `|` **Rsponsable:**", message.author.tag, true)
.addField("📆 `|` **Fecha de Sanción:**", feecha, true)
.addField("🧰 `|` **Razon:**", razon, true)
.addField("🖼️ `|` **Pruebas:**", `[Pruebas](${pruebass})`, true)
.addField("☄️ `|` **Server:**", server, true)
message.channel.send("**Se han enviado los reportes de forceban**")
canal.send(embedd)
canal.send("<@!692363394719809577> | <@!520988949053702145> | @everyone")
  
let user = new Discord.MessageEmbed()
.setColor("GREEN")
.setAuthor(`Has sido añadido`)
.setThumbnail("https://image.flaticon.com/icons/svg/3039/3039418.svg")
.setDescription("Has sido añadido a la base de datos, por usuario malicioso")
.addField("👤 `|` **Usuario:**", "<@"+args2[0]+">", true)
.addField("🆔 `|` **ID**", `${args[0]}`, true)
.addField("👮 `|` **Rsponsable:**", message.author.tag, true)
.addField("📆 `|` **Fecha de Sanción:**", feecha, true)
.addField("🧰 `|` **Razon:**", razon, true)
.addField("🖼️ `|` **Pruebas:**", `[Pruebas](${pruebass})`, true)
.addField("☄️ `|` **Server:**", server, true)
client.users.cache.get(args2[0]).send(user)
client.users.cache.get(args2[2]).send(":white_check_mark: `|` **Has sido añadido a la forceban por ser usuario malicioso**")
}