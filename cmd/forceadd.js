exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  const db = require("megadb");
  if (
    message.author.id !== "711003655150501899" 
  )
    return message.channel.send("no puedes utilizar este comando!")
  let forceadd = new db.crearDB("Ids");
  let forceadd2 = new db.crearDB("Razones");
  let reason = args.slice(1).join(" ");
  if (!forceadd.tiene("ids")) {
    forceadd.establecer("ids", []);
  }
  if (!args[0]) return message.channel.send("Debe colocar una id");
  if (isNaN(args[0])) return message.channel.send("Debe colocar una ID real");

  const idsxd = await forceadd.obtener("ids");
  if (idsxd.includes(args[0]) == true)
    return message.channel.send("El usuario ya esta en la forceban");

  if (!reason) return message.channel.send("Especifica una razon");

  forceadd.push("ids", args[0]);
  forceadd2.establecer(args[0], reason);

  message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor("✅Nuevo usuario para la force✅")
      .setDescription(
        "🆔 **ID Usuario:**" + args[0] + " \n📌 **Razon** " + reason
      )
      .setColor("RANDOM")
  );
};
