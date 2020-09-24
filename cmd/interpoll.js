exports.run = async (client, message, args) => {
  const db = require("megadb");
  let Discord = require("discord.js");
  let prefix_db = new db.crearDB("prefixes");

  let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle("Falexy Economic Premium")
        .setDescription(
          "Falexy Premium, es un beneficio exclusivo para Partners y Safers"
        )
        .addField(
          "🔑 ❯ Beneficios",
          "• Filtro Anti-Message \n• Filtro Anti-Spam \n• Noticias exclusivas sobre raiders y usuarios maliciosos. \n• Acceso a comandos beta. \n• Más proximamente"
        )
        .addField(
          "💸 ❯ ¿Como coseguirlo?",
          "• Siendo Safer Oro en nuestro [servidor público](https://discord.gg/8tF7xF3) \n• Siendo partner en nuestro [servidor público](https://discord.gg/8tF7xF3) \n• Ganando algun sorteo de Falexy Premium."
        )
    );

  if (args[0] === "genkey") {
    const vips_db = new db.crearDB("Vips");
    const vip = await vips_db.obtener("Vips");
    let keys_db = new db.crearDB("keys");
    let keyuser = await keys_db.obtener("keys");
    let user = message.author;
    if (vip.includes(user.id) == false)
      return message.channel.send(
        "**No eres VIP, no puedes generar ninguna key.**"
      );
    if (keys_db.tiene(message.author.id) == true) return message.channel.send(
        "**Tu ya tienes una KEY, no puedes generar mas.**"
      );

    let c1 = 1000000000001;
    let c2 = 100000;
    let something = Math.floor(Math.random() * (c1 - c2) + c2);

    // let frases = ["🌊 ¡Me gusta el ritmo de las olas!", "🍎 ¿Tienes una manzana para mí?", "🌤️ Hace un hermoso día afuera.", "🗣️ Mejor fumador pero"] //esto afecta en algo???  || No pongas las frases//mira
    // let frase = frases[Math.floor(frases.length * Math.random())]

    //message.author.send("Tu clave premium es la siguiente: `" + something + "`**.**")
    message.author.send(
      new Discord.MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`🌐 | Clave Premium`)
        .setDescription(
          "👉 Tu clave premium es la siguiente: `" + something + "`."
        )
        .setFooter(
          "Para canjear la clave ejecuta " + prefix + "interpoll canjear " + something
        )
    );
    keys_db.push(message.author.id, something);
    message.channel.send(
      ":incoming_envelope: " +
        `${message.author}` +
        ", **Te hemos enviado una clave al MD, no la pierdas!**"
    );
  }

  if (args[0] === "canjear") {
    const vips_db = new db.crearDB("Vips");
    const vip = await vips_db.obtener("Vips");
    let user = message.author;
   if (vip.includes(user.id) == false)
      return message.channel.send("**No eres VIP**");
    let ap = new db.crearDB("premiumssv");
    
    if(!args[1]) return message.channel.send("Debes colocar la contraseña que se te dio")
    if(ap.tiene(message.guild.id) === true) return message.channel.send("El servidor ya tiene las ventajas premiums")
    if(ap.tiene(message.author.id) === true) return message.channel.send("Ya has canjeado tu key en este server")
    ap.establecer(message.guild.id, args[1]);
    message.channel.send(
      `**☑️ \`|\` El servidor ahora tiene todas las ventajas premiums.** \n Usa ${prefix}ventajasvips`
    );
  }
};
