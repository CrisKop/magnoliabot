const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://falexyEco.glitch.me/`);
}, 280000);


const Discord = require("discord.js");
const client = new Discord.Client();
const { nivelesFunc } = require("./niveles.js");

client.on("ready", () => {
  console.log("Estoy listo!");
  setInterval(function() {
    let statuses = [`f/ayuda 🎸 ${client.guilds.cache.size} Servidores`, `f/comandos 👤 ${client.users.cache.size} Usuarios`];
    let status = Math.floor(Math.random() * statuses.length);
    let dstatus = statuses[status];
    client.user.setPresence({
      activity: {
        name: `${dstatus}`,
        type: "LISTENING"//pq volvimos a glitch?
      },
      status: "online"
    });
  }, 5000);
});

client.on("message", async message => { 
  
  const db = require("megadb");
  let prefix_db = new db.crearDB("prefixes") 
  
  var prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  
  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send(
  new Discord.MessagEmbed()
  .setAuthor(`Gracias por hablarme`, client.user.displayAvatarURL())
  .setColor("RANDOM")
  .addField("🖊️ `|` **__Enlaces:__**", "**[Invitame](https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot) `|` [Soporte](https://discord.gg/PTVYBhW)**"))
  if (message.content.indexOf(prefix) !== 0) {
    nivelesFunc(message);
    return;
  }
  
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  
  try {
    let comandos = require(`./cmd/${command}.js`);
    comandos.run(client, message, args);
  } catch (e) {
    console.log(e.stacks);
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RED")
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1200px-Nuvola_apps_error.svg.png"
        )
        .setDescription("`Comando que uso no existe en mi base de datos`")
        .addField(
          "`Trata usando el siguiente comando`",
          "**" + prefix + "comandos**"
        )
    );
  } finally {
  }
});

client.on("guildMemberAdd", async guild => {
  
  guild.owner.send(
new Discord.MessageEmbed()
    .setDescription(`Muchas Gracias ${guild.owner.tag} Por agregar nuestro bot **${client.user.username}** a tu Servidor: **${guild.name}**\nNo tiene ni la menor idea lo agradecidos que estamos...`)
    .addField("Servidores Actuales:" +client.guilds.cache.size)
    .addField("Usuarios Actuales:", +client.users.cache.size)
    .setFooter(guild.name)
 );
  
});

client.login(process.env.TOKEN)