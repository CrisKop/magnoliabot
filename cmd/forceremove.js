exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  if (
    message.author.id !== "692363394719809577"
  )
    return;
  let forceadd = new db.crearDB("Ids");
  if (!forceadd.tiene("ids")) {
    forceadd.establecer("ids", []);
  } //Guardamos los argumentos 0 (id) en el array creado anteriormente El codigo este va en el comando el de arriba en otro para crearlo

  if (!args[0]) return message.channel.send("Debe colocar una ID");
  const idsxd = await forceadd.obtener("ids");
  if (idsxd.includes(args[0]) == false)
    return message.channel.send("El usuario no esta en la forceban");

  if (isNaN(args[0])) return message.channel.send("Debe colocar una ID real");

  forceadd.extract("ids", args[0]);

  message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor("📌Usuario sacado de la force📌")
      .setDescription("🆔 **ID Usuario:** " + args[0])
      .setColor("RANDON")
  );
};
