exports.run = async (client, message, args) => {
  let Discord = require("discord.js")
      const megadb = require("megadb");
      let perms = message.member.hasPermission("MANAGE_ROLES");

      if (!perms)
        return message.channel.send(
          "No tienes permisos."
        );

        if(!args[0]) return message.channel.send(
          new Discord.MessageEmbed()
          .setColor("RED")
          .setDescription("👤 **Para configurar el role usuarios** `setautorole user @role` \n🤖 **Para configurar el role bots** `setautorole bot @role`")
        )

      if(args[0] === "user"){
      const role = new megadb.crearDB("AutoUser");

      let role2 =
        message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
      if (!role2)
        return message.channel.send(
          "❌ `|` **Debe mencionar el role para usuarios**"
        );

        if(role2.comparePositionTo(message.guild.me.roles.highest) > 0) return message.channel.send(
          new Discord.MessageEmbed()
          .setDescription("❌ `|` **No puedo establecer el role mencionado, porque ese role esta por encima de mi role**")
        )

      role.establecer(`${message.guild.id}`, role2.id);
      message.channel.send(`☑️ El role ${role2} ha sido seleccionado con exito **USUARIOS**`)
    }

    if(args[0] === "bot"){
      const roleb = new megadb.crearDB("AutoBots");
      let role1 = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
      if (!role1)
        return message.channel.send(
          "❌`|` **Debe mencionar el role para bots**"
        );

        if(role1.comparePositionTo(message.guild.me.roles.highest) > 0) return message.channel.send(
          new Discord.MessageEmbed()
          .setDescription("❌ `|` **No puedo esteblecer el role que quieres configurar, porque mi role esta por debajo del role**")
        )

      roleb.establecer(`${message.guild.id}`, role1.id);
      message.channel.send(`☑️ El role ${role1} ha sido seleccionado con exito **BOTS**`)
    }
  }