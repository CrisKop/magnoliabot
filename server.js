const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://NameProject.glitch.me/`);
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
  let prefix = "f/";
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

client.login(process.env.TOKEN)