const Discord = require("discord.js");

const Database = require("../../Helpers/Database");

exports.run = async (client, message, args) => {
    const db = new Database("./Servers/" + message.guild.id, "Invites");

    var victim =
      message.mentions.users.first() ||
      client.users.cache.get(args[0]) ||
      message.author;

    var data = db.get(`invites.${victim.id}`) || {
      total: 0,
      fake: 0,
      inviter: null,
      regular: 0,
      bonus: 0,
      leave: 0
    };

    var embed = new Discord.MessageEmbed()

      .setDescription(
        `<@${victim.id}> **Total:** \`${(data.total || 0) +
          (data.bonus || 0)}\`, **Regular:** \`${data.regular ||
          0}\`, **Bonus:** \`${data.bonus || 0}\`, **Leave:** \`${data.leave ||
          0}\`, (**Fake:** \`${data.fake || 0}\`)`
      )

      .setColor("RANDOM");

    message.channel.send(embed);
  }