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
const db = require("megadb");
const db2 = require("quick.db");

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
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  let blacklist = new db.crearDB("BlackList");
  let usersban = await blacklist.obtener("blacklist");
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
    //message.channel.send(
    //new Discord.MessageEmbed()
    //.setColor("RED")
    //.setThumbnail(
    // "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nuvola_apps_error.svg/1200px-Nuvola_apps_error.svg.png"
    //)
    //.setDescription("`Comando que uso no existe en mi base de datos`")
    //.addField(
    // "`Trata usando el siguiente comando`",
    //"**" + prefix + "comandos**"
    //)
    //);
  } finally {
  }
});

client.on("guildMemberAdd", async guild => {
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
    member.send(
      ":x: `|` **[Anti-Joins]** No puedes entrar porque el anti-joins para bots esta activado"
    );
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
  if(message.author.bot) return;
  let { crearDB } = require("megadb");
  let palta = new crearDB("palta");
  let Discord = require("discord.js");
  if (palta.tiene(message.guild.id)) {
    let lista = await palta.get(message.guild.id);
    if (lista.includes(message.author.id)) {
      palta.extract(message.guild.id, message.author.id);
       let r = new db.crearDB("RazonesAfk");
      r.eliminar(message.guild.id)
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
    if(message.author.bot) return;
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

    palta.push(message.guild.id, message.author.id)
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
    message.member.setNickname("[AFK] "+message.member.displayName)
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

client.login(process.env.TOKEN);
//que es lo que habia abajo de del evento guildmemberadd? , yo lo coloque pero no me acuerdo
