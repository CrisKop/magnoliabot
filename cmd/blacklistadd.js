exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  const developers_db = new db.crearDB("Developers");
  let devs = await developers_db.obtener("Developers");
  let user = message.author;
  if (devs.includes(user.id) == false)
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          `${user.username} [${user.id}]`,
          message.author.displayAvatarURL()
        )
        .setColor("RED")
        .setDescription(
          "🗳️ `|` **__No eres STAFF del BOT, por lo tanto no puedes usar el comando__**"
        )
    );

  let blacklist = new db.crearDB("BlackList");
  if (!blacklist.tiene("blacklist")) {
    blacklist.establecer("blacklist", []);
  }
  if (!args[0]) return message.channel.send("❌ Debes introducir una ID");
  if (isNaN(args[0]))
    return message.channel.send("❌ ¡La ID introducida no existe!");
  
  let xd = args.slice(1).join(" ") || "Razon Indefinida"
  const idsxd = await blacklist.obtener("blacklist");
  if (idsxd.includes(args[0]) == true)
    return message.channel.send(
      "❌ El usuario ya se encuentra en la BlackList"
    );

  blacklist.push("blacklist", args[0]);

  message.channel.send(`**__Se ha agregado un nuevo usuario a la blacklist__** <@${args[0]}> \`\`[${args[0]}]\`\` \nRazon: \`\`${xd}\`\``)
   client.users.cache.get(args[0]).send("**__Has sido agregado a la blacklist__** \nRazon: `"+xd+"`").catch(e => {
     message.channel.send("**__Hubo un error al enviar el mensaje__**").then(m => {
       m.delete({ timeout: 5000 })
     })
   })
};
