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
    let statuses = [
      `f/ayuda 🎸 ${client.guilds.cache.size} Servidores`,
      `f/comandos 👤 ${client.users.cache.size} Usuarios`
    ];
    let status = Math.floor(Math.random() * statuses.length);
    let dstatus = statuses[status];
    client.user.setPresence({
      activity: {
        name: `${dstatus}`,
        type: "LISTENING" //pq volvimos a glitch?
      },
      status: "online"
    });
  }, 5000);
});

client.on("message", async message => {
  const db = require("megadb");
  let prefix_db = new db.crearDB("prefixes"); //q haces :v

  var prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  if (message.author.bot) return;

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
      .setDescription(
        `Muchas Gracias ${guild.owner.tag} Por agregar nuestro bot **${client.user.username}** a tu Servidor: **${guild.name}**\nNo tiene ni la menor idea lo agradecidos que estamos...`
      )
      .addField("Servidores Actuales:" + client.guilds.cache.size)
      .addField("Usuarios Actuales:", +client.users.cache.size)
      .setFooter(guild.name)
  );
});

client.on("message", message => {
  if(message.author.bot) return; //k onda hago el addstaff  con rango?
   let array2 = [
    "grabify.",
    "iplogger.org",
    "blasze.com",
    "webresolver.nl/tools/iplogger",
    "leancoding.",
    "stopify.",
    "freegiftcards.",
    "joinmy.",
    "curiouscat.",
    "catsnthings.",
    "2no.co",
    "iplogger.com",
    "iplogger.ru",
    "yip.su",
    "iplogger.co",
    "iplogger.info",
    "ipgrabber.ru",
    "ipgraber.ru",
    "shorturl.at/",
    "bl.link/",
    "tiny.cc/",
    "iplis.ru",
    "02ip.ru",
    "ezstat.ru",
    "https://www.miiplogger.com/index.php?q="
  ];

  const al = new (require("megadb")).crearDB("AntiLoggers");
  if (al.tiene(`${message.guild.id}.at`)) {
    if (array2.some(word => message.content.toLowerCase().includes(word))) {
      message.delete();
      message
        .reply("❌ Las IPLoggers estas bloqueadas en mi configuracion.")
        .then(response => {
          return response.delete({ timeout: 6000 });
        });
    }
  }
});

client.login(process.env.TOKEN);
//que es lo que habia abajo de del evento guildmemberadd? , yo lo coloque pero no me acuerdo