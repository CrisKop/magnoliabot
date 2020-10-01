const http = require("http");
const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/", (request, response) => {
  response.sendStatus(200);
});

app.listen(process.env.PORT);

setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const client = new Discord.Client();
const { nivelesFunc } = require("./niveles.js");
const db = require("megadb");

client.snipes = new Map();

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
  if (prefix_db.tiene(message.guild.id)) {
    prefix = await prefix_db.obtener(message.guild.id);
  } else {
    prefix = "f/";
  }

  let RegMention = new RegExp(`^<@!?${client.user.id}>( |)$`); //Este es el RegExp que utilizaremos

  if (message.content.match(RegMention)) {
    //Creamos la condicional
    if (message.author.bot) return;
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`🌐 Panel Auxiliar de ${client.user.username} 🌐`)
        .setColor("RANDOM")
        .setThumbnail(client.user.displayAvatarURL())
        .setDescription(
          "💠 **Falexy Economic** es un bot de economia mayormente pero hemos colocado sistemas de configuracion, seguridad y diversion, para mejor expectactiva de ustedes, espero que les guste"
        )
        .addField(
          "📜 `|` **Informacion/Estadisticas:**",
          `💻 **__Servidores:__** \`${client.guilds.cache.size}\` \n👥 **__Usuarios:__** \`${client.users.cache.size}\` \n🖊️ **__Prefix:__** \`${prefix}\` \n🧭 **__Lista Comandos:__** \`${prefix}comandos\` \n🚁 **__Panel Ayuda:__** \`${prefix}ayuda\``
        )
        .addField(
          "> 🔗 Enlaces:",
          "**[Server Soporte](https://discord.gg/PTVYBhW)** **|** **[Invitacion Bot](https://discord.com/api/oauth2/authorize?client_id=753340440001904841&permissions=8&scope=bot)**"
        )
    );
  }

  let blacklist = new db.crearDB("BlackList");
  let usersban = await blacklist.obtener("blacklist");
  if (message.author.bot) return;

  var words = [
    "raid",
    "hack",
    "token",
    "squad",
    "otar",
    "ash",
    "security",
    "protection",
    "assurance",
    "D.A",
    "DA",
    "equality",
    "wolf",
    "cactus",
    "Cactus",
    "CactusFire",
    "ultra",
    "UltraBot",
    "TeamUltra"
  ];
  if (words.some(ps => message.content.includes(ps))) {
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.username} [${message.author.id}]`)
      .setColor("RANDOM")
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`📜 **__Mensaje:__** ${message.content}`)
      .addField(
        "🧭 `|` **__Servidor Proveniente:__**",
        message.guild.name +
          " \n🐤 `|` **__Canal:__** " +
          `<#${message.channel.id}>`
      );
    client.channels.cache
      .get("758153152435453964")
      .send(
        "https://discord.com/channels/" +
          message.guild.id +
          "/" +
          message.channel.id +
          "/" +
          message.id
      );
    client.channels.cache.get("758153152435453964").send(embed);
  }

  if (!message.content.startsWith(prefix)) {
    nivelesFunc(message);
    return;
  }

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();

  if (usersban.includes(message.author.id))
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `${message.author.username} [${message.author.id}]`,
          message.author.displayAvatarURL()
        )
        .setColor("RED")
        .setDescription(
          "📜 `|` **__Estas en la blacklist, por lo tanto no puedes usar los comandos del BOT__**"
        )
    );

  try {
    let comandos = require(`./cmd/${command}.js`);
    comandos.run(client, message, args);
  } catch (e) {
    console.log(e.stacks);
  } finally {
  }
});

client.on("guildCreate", async guild => {
  guild.owner
    .send(
      new Discord.MessageEmbed()
        .setDescription(
          `Muchas Gracias ${guild.owner.tag} Por agregar nuestro bot **${client.user.username}** a tu Servidor: **${guild.name}**\nNo tiene ni la menor idea lo agradecidos que estamos...`
        )
        .addField("Servidores Actuales:" + client.guilds.cache.size)
        .addField("Usuarios Actuales:", +client.users.cache.size)
        .setFooter(guild.name)
    )
    .catch(e => {
      console.log("No pude enviarle ese mensaje al dueño del servidor");
    });
});

client.on("message", async message => {
  if (message.author.bot) return; //k onda hago el addstaff  con rango?
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

  let al = new (require("megadb")).crearDB("AntiLoggers");
  const log = new db.crearDB("Logs");
  if (al.tiene(`${message.guild.id}.at`)) {
    if (array2.some(word => message.content.toLowerCase().includes(word))) {
      message.delete();
      message
        .reply("❌ Las IPLoggers estas bloqueadas en mi configuracion.")
        .then(response => {
          return response.delete({ timeout: 6000 });
        });
      if (!log.tiene(`${message.guild.id}`)) return;
      let logs = await log.obtener(`${message.guild.id}`);
      const canalrendered = client.channels.cache.get(logs);
      canalrendered.send(
        new Discord.MessageEmbed()
          .setAuthor(
            `Anti-Loggers, elimino un logger de **${message.author.tag}**`,
            message.author.displayAvatarURL()
          )
          .setColor("RANDOM")
          .setTimestamp()
      );
      message.author
        .send(
          "❌ **__Las IPLoggers estas bloqueadas en mi configuracion.__** \nEn `" +
            message.guild.name +
            "`"
        )
        .catch(e => {
          message.channel
            .send(
              "❌ **__No pude enviarte mensaje al privado, tienes los MD cerrados__**"
            )
            .then(m => m.delete({ timeout: 2000 }));
        });
    }
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  let am = new (require("megadb")).crearDB("AntiMessage");
  if (am.tiene(`${message.guild.id}.at`)) {
    if (message.member.hasPermission("ADMINISTRATOR")) return;
    message.delete();
  }
});

const megadb = require("megadb");
let ab = new db.crearDB("AntiBots");
client.on("guildMemberAdd", async member => {
  if (ab.tiene(`${member.guild.id}.at`)) {
    if (member.user.bot) member.kick();
  }
});

client.on("guildMemberAdd", async member => {
  const u = new db.crearDB("AntiUser");
  if (u.tiene(`${member.guild.id}.at`)) {
    if (member.user.bot) return;
    member.kick();
    member.send(
      ":x: `|` **[Anti-Joins]** No puedes entrar porque el anti-joins para usuarios esta activado"
    );
  }
});

client.on("guildMemberAdd", async member => {
  const u = new db.crearDB("AntiUser");
  let ab = new db.crearDB("AntiBots");
  if (u.tiene(`${member.guild.id}.at`)) {
    if (ab.tiene(`${member.guild.id}.at`)) {
      member.kick();
      member.send(
        ":x: `|` **[Anti-Joins All]** No puedes entrar porque el anti-joins para todos esta activado"
      );
    }
  }
});

client.on(`guildCreate`, (guild, message) => {
  //Empezamos poniendo un let que guardara la ID del canal en donde se enviara el mensaje
  let canal = "758153148266315817";
  //Ahora creamos un Embed (Para que se vea un poco mas lindo)
  let embed = new Discord.MessageEmbed() //Para la V12... Si usas V11 solo cambia "MessagEmbed" por "RichEmbed"
    .setTitle("Evento guildCreate")
    .setColor("RANDOM") //Lo pondre RANDOM, lo pueden cambiar ;)
    .addField("Nombre", `${guild.name}`)
    .addField(`Dueño`, `${guild.owner}`)
    .addField("ID", `${guild.id}`)
    .addField("Miembros", `${guild.memberCount}`)
    .setImage(guild.iconURL()); //Aca si usas la V11 quita el () y lo que esta entre el

  //Ya terminamos por enviar el Embed al canal puesto en el "let canal"
  client.channels.resolve(canal).send(embed);
});

client.on("message", async message => {
  if (message.author.bot) return;
  let { crearDB } = require("megadb");
  let palta = new crearDB("palta");
  let Discord = require("discord.js");
  if (palta.tiene(message.guild.id)) {
    let lista = await palta.get(message.guild.id);
    if (lista.includes(message.author.id)) {
      palta.extract(message.guild.id, message.author.id);
      let r = new db.crearDB("RazonesAfk");
      r.eliminar(message.guild.id);
      message.channel.send(`${message.author} has vuelto de tu AFK!`);
    }
  }

  if (message.mentions.users.first() && palta.tiene(message.guild.id)) {
    let lista = await palta.get(message.guild.id);
    let text = [];
    message.mentions.users.forEach(x => {
      if (lista.includes(x.id)) {
        text.push("<@" + x.id + ">");
      }
    });
    let r = new db.crearDB("RazonesAfk");
    let ra = await r.obtener(message.guild.id);
    if (text.length >= 1) {
      let estan = text.length > 1 ? "están" : "esta";
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription(
            "👤 ! " +
              `${text.join(" ")}` +
              " " +
              estan +
              " Afk! \n🖊️ **__Razon:__** `" +
              ra +
              "`"
          )
      );
    }
  }
  if (message.content.startsWith("f/afk")) {
    if (message.author.bot) return;
    const db = require("megadb");
    let prefix_db = new db.crearDB("prefixes"); //q haces :v

    var prefix;
    if (prefix_db.tiene(`${message.guild.id}`)) {
      prefix = await prefix_db.obtener(`${message.guild.id}`);
    } else {
      prefix = "f/";
    }

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    let razon = args.slice(0).join(" ") || "Razon Indefinida";
    let r = new db.crearDB("RazonesAfk");
    if (!palta.tiene(message.guild.id)) palta.establecer(message.guild.id, []);

    palta.push(message.guild.id, message.author.id);
    message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ size: 1024, dynamic: true })
        )
        .setColor("GREEN")
        .setThumbnail(
          message.author.displayAvatarURL({ size: 1024, dynamic: true })
        )
        .setDescription(
          `👤 ${message.author} [${message.author.id}] **Ahora esta AFK! \n🧭 Razon:** ${razon}`
        )
    );
    r.establecer(message.guild.id, razon);
    //message.member.setNickname("[AFK] "+message.member.displayName)
  }
});

const config = require("./config.json");
client.config = config;

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  default: {
    botsCanWin: false,
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
  "giveawayReactionAdded",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

client.giveawaysManager.on(
  "giveawayReactionRemoved",
  (giveaway, member, reaction) => {
    console.log(
      `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
    );
  }
);

const spamdetector = require("dspamdetector");
let opciones = {
  minletters: 5,
  minwords: 0,
  maxpercentcaps: 15,
  maxpercentletters: 60,
  blockedwords: [],
  floodt: 60,
  floodml: 3
};
let detector = new spamdetector.detector(opciones);

client.on("message", message => {
  if (message.author.bot) return;
  let amp = new (require("megadb")).crearDB("AntiSpam");
  if (amp.tiene(`${message.guild.id}.at`)) {
    detector.isSpam(message.content).then(resultado => {
      if (resultado == true) {
        message.channel
          .send("❌ `|` **__[AntiSpam]__** Mensaje considerado como SPAM")
          .then(m => m.delete({ timeout: 5000 }));
        message.delete();
      }
    });
  }
});

let opciones1 = {
  floodt: 100, //limite de segundos
  floodml: 5 //limite de mensajes
};
let detector1 = new spamdetector.detector(opciones1);

client.on("message", message => {
  let af = new (require("megadb")).crearDB("AntiFlood");
  //El 3 son el limite de mensajes y el 60 es cada cuanto tiempo por ejemplo si yo escribiera en menos de 1 minuto 3 mensajes el npm te dira que es spam
  if (message.author.bot) return;
  if (af.tiene(`${message.guild.id}.at`)) {
    //esta linea no es obligatoria pero al no ponerla el bot entrara en bucle ya que detectara sus propios mensajes como spam o borrara los mensajes de otros bots si los manda muy rapido
    detector
      .isFlood(message.author.id, message.guild.id, message.channel.id)
      .then(resultado1 => {
        if (resultado1 == true) {
          message.channel
            .send("❌ `|` **__[AntiFlood]__** Mensaje considerado como FLOOD")
            .then(m => m.delete({ timeout: 5000 }));
          message.delete();
        }
      });
  }
});

const roleb = new db.crearDB("AutoBots");
client.on("guildMemberAdd", async member => {
  if (!roleb.tiene(member.guild.id)) return;
  let ID2 = await roleb.obtener(member.guild.id);
  if (member.user.bot) member.roles.add(ID2);
});

client.on("guildMemberAdd", async member => {
  const role = new db.crearDB("AutoUser");

  if (!role.tiene(`${member.guild.id}`)) return;
  else if (role.tiene(`${member.guild.id}`)) {
    if (member.user.bot) return;
    let rol = await role.obtener(`${member.guild.id}`);
    member.roles.add(rol);
  }
});

client.on("messageDelete", message => {
  //este es el evento "messageDelete" se activa cuando un mensaje es eliminado.

  client.snipes.set(message.channel.id, {
    content: message.content,
    delete: message.author,
    canal: message.channel
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  const words = new (require("megadb")).crearDB("Palabras");
  let wo = await words.obtener(message.guild.id);
  if (words.tiene(`${message.guild.id}`)) {
    if (wo.some(word => message.content.toLowerCase().includes(word))) {
      if (message.member.hasPermission("ADMINISTRATOR")) return;
      message.delete();
      message.channel
        .send(
          "⛔ " +
            `${message.author}` +
            " `>` **Esa palabra esta bloqueada en el servidor**."
        )
        .then(m2 => m2.delete({ timeout: 5000 }));
    }
  }
});

client.on("guildMemberAdd", async member => {
  //DBS//
  const db = require("megadb");
  let welcome_db = new db.crearDB("setwelcome", "welcomeleave");
  let imagen_db = new db.crearDB("setwelcomeimg", "welcomeleave");
  if (!welcome_db.tiene(`${member.guild.id}`)) return;
  if (!imagen_db.tiene(member.guild.id)) return;
  let imagen = await imagen_db.obtener(`${member.guild.id}`);
  let welcome = await welcome_db.obtener(`${member.guild.id}`);
  const canalrendered = client.channels.cache.get(welcome);
  if (!welcome_db.tiene(`${member.guild.id}`)) return;
  //dbs

  const embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.displayAvatarURL())
    .setColor("RANDOM")
    .setAuthor(
      `🌐 | Bienvenido ${member.user.username} | 🌐`,
      member.user.displayAvatarURL()
    )
    .setDescription(
      "🔥 `|` **__Espero te diviertas en `" +
        member.guild.name +
        "` Respeta las reglas y no tendras problemas__**"
    );
  //.setImage(imagen)
  canalrendered.send(
    `${member}` +
      " 💠 Bienvenido a `" +
      member.guild.name +
      "` Espero te diviertas y respetes a todos 💠"
  );
  canalrendered.send(embed);
});

client.on("channelCreate", async channel => {
  let ac = new (require("megadb")).crearDB("AntiChannel");
  if (ac.tiene(channel.guild.id)) {
    channel.delete();
  }
});

client.on("roleCreate", async role => {
  let ar = new (require("megadb")).crearDB("AntiRoles");
  if (ar.tiene(role.guild.id)) {
    role.delete();
  }
});

client.on("message", async message => {
  const db = require("megadb");
  const ate = new db.crearDB("AntiTextos");
  let prefix_db = new db.crearDB("prefixes"); //q haces :v

  var prefix;
  if (prefix_db.tiene(message.guild.id)) {
    prefix = await prefix_db.obtener(message.guild.id);
  } else {
    prefix = "f/";
  }
  const args = message.content;

  if (ate.tiene(message.guild.id)) {
    let msg = args.join(" ")
    if (msg.length > 300)
      return message.channel.send(
        "Se ha borrado un mensaje de " +
          msg.length +
          ", procura enviar mensajes menor a 300 caracteres"
      ).then(m => m.delete)
  }
});
client.login(process.env.TOKEN);
