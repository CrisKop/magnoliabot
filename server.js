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
    let { crearDB } = require("megadb"); // Llamamos al constructor crearDB
  let palta = new crearDB("palta"); // Creamos el archivo json en el que almacenaremos los datos de los usuarios AFK
let Discord = require("discord.js")
exports.run = async (client, message, args) => {
  if (palta.tiene(message.guild.id)) {
    //Verificamos si el archivo json tiene datos guardados con la ID del servidor donde se mando el mensaje
    let lista = await palta.get(message.guild.id); //Obtenemos el array guardado con la lista de los usuarios AFK en el servidor
    if (lista.includes(message.author.id)) {
      //Verificamos si el array incluye la ID del autor del mensaje
      palta.extract(message.guild.id, message.author.id); //Eliminamos el elemento con la ID del autor del mensaje del array
      message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setDescription("**Ya no te encuestras AFK**")
      ); //Enviamos un mensaje avisandole al autor del mensaje que ya no esta AFK
    }
  } //Cerramos
  //Lo de arriba va al inicio del evento message y arriba de cualquier condiciÃ³n que retorne si el contenido del mensaje no empieza por X caracter, por ejemplo if(!message.content.startsWith(prefix)) return;

  if (message.mentions.users.first() && palta.tiene(message.guild.id)) {
    //Verificamos si el mensaje tiene una mención y el archivo json datos
    let lista = await palta.get(message.guild.id); //Obtenemos el array con la lista de usuarios AFK nuevamente
    let text = []; //Declaramos text como un array vació
    message.mentions.users.forEach(x => {
      //Utilizamos forEach para repetir una acción con todas las menciones
      if (lista.includes(x.id)) {
        //Verificamos si el array de los usuarios AFK incluye la ID de los usuarios mencionados
        text.push("<@" + x.id + ">"); //Añadimos la ID de los usuarios AFK al array text para mencionarles luego
      }
    });
    if (text.length >= 1) {
      //Verificamos si la longitud del array es mayor o igual a 1 en caso de que ninguno de los usuarios mencionados estuviera AFK
      let estan = text.length > 1 ? "están" : "esta"; //Esto es por simple estetica, Utilizamos un operador ternario para verificar si text tiene más de 1 elemento, en caso de que si nuestra variable será igual a "están", en caso contrario "esta"
      message.channel.send("¡" + text.join(" ") + " " + estan + " afk!"); //Enviamos el mensaje, utilizamos text.join(' ') para unir el array con un espacio
    }
  } //Cerramos

  if (message.content.startsWith("f/afk")) {
    //Verificamos si el contenido del mensaje empieza con "!afk"
    if (!palta.tiene(message.guild.id)) palta.establecer(message.guild.id, []); //Verificamos si el archivo json tiene datos guardados con la ID del servidor, En caso de que no establecemos un array
    palta.push(message.guild.id, message.author.id); //Añadimos la ID del autor del mensaje al array
    message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("RED")
    .setDescription("**Te encuentras AFK en este momento**")); //Enviamos el mensaje avisandole al usuario que ahora esta AFK
  } //Cerramos
})
client.login(process.env.TOKEN);
//que es lo que habia abajo de del evento guildmemberadd? , yo lo coloque pero no me acuerdo
