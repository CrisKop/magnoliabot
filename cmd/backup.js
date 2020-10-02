exports.run = async (client, message, args) => { //sholo queria saber :c
  const Discord = require("discord.js"),
    backup = require("discord-backup");
  const embed = new Discord.MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL())
      .setAuthor(`Informacion Comandos`, client.user.displayAvatarURL())
      .addField(
        "**Lista Comandos:**",
        "📌 Usa `backup create` Para crear backup del servidor \n🧼 Usa `backup load` Para cargar un backup que haya creado anteriormente \n⚙️ Usa `backup list` Para ver la informacion de algun backup hecho"
      )
      .setColor("PURPLE");

  if (!args[0] || args[0] === "help") return message.channel.send(embed)
  
  if (args[0] === "create") {
    let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
       "❌ `|` **Perdon "+`${message.author}`+", No tienes permisos de `Administrador` para ejecutar ese comando**"
      );
    backup
      .create(message.guild, {
        jsonBeautify: true
      })
      .then(backupData => {
        // And send informations to the backup owner
        message.author.send(
          new Discord.MessageEmbed()
         .setAuthor(`✅ Backup creado correctamente ✅`)
          .setColor("GREEN")
          .setDescription(`Carga backup, usa `+ "`"+ `backup load ${backupData.id}` +"` En cualquier servidor")
          .setThumbnail(message.author.displayAvatarURL())
          )
        message.channel.send(//backupData.id
          new Discord.MessageEmbed()
          .setAuthor(`✅ Backup creado correctamente ✅`)
          .setColor("GREEN")
          .setThumbnail(message.author.displayAvatarURL())
          .setDescription("**La ID del backup, se te ha enviado al MD**")
        );
      });
  }
  if (args[0] === "load") {
    let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
        "No tienes permisos"
      );
    let backupID = args[1];
    if (!backupID) {
      return message.channel.send(":x: | Debe colocar la ID valida del backup");
    }
    // Fetching the backup to know if it exists
    backup
      .fetch(backupID)
      .then(async () => {
        // If the backup exists, request for confirmation
        message.channel.send(
          ":warning: | Cuando se carga la copia de seguridad, se reemplazarán todos los canales, mensajes, roles, etc. Tipo `f/confirmar` para confirmar!"
        );
        await message.channel
          .awaitMessages(
            m =>
              m.author.id === message.author.id && m.content === "f/confirmar",
            {
              max: 1,
              time: 20000,
              errors: ["time"]
            }
          )
          .catch(err => {
            // if the author of the commands does not confirm the backup loading
            return message.channel.send(
              ":x: | El tiempo se acabo, copia de seguridad cancelado"
            );
          });
        // When the author of the command has confirmed that he wants to load the backup on his server
        message.author.send(
          ":white_check_mark: | ¡Copia de seguridad cargada correctamente!"
        );
        // Load the backup
        backup
          .load(backupID, message.guild)
          .then(() => {
            // When the backup is loaded, delete them from the server
            backup.remove(backupID);
          })
          .catch(err => {
            // If an error occurenced
            return message.author.send(
              ":x: | Lo sentimos, se produjo un error ... Por favor, compruebe que tengo permisos de administrador."
            );
          });
      })
      .catch(err => {
        // if the backup wasn't found
        return message.channel.send(
          ":x: | No se encontraron copias de seguridad para `" + backupID + "`!"
        );
      });
  }
  if (args[0] === "list") {
        let backupID = args[1];
        if(!backupID){
            return message.channel.send(":x: | Debe colocar una ID valida de backup");
        }
        // Fetch the backup
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let embed = new Discord.MessageEmbed()
                .setAuthor("🛠️ Ajustes Copia Seguridad", client.user.displayAvatarURL())
                // Display the backup ID
                .addField("🪓 **Backup ID**", backupInfos.id, false)
                .setThumbnail(message.guild.iconURL())
                // Displays the server from which this backup comes
                .addField("📱 **Server ID**", backupInfos.data.guildID, false)
                // Display the size (in mb) of the backup
                .addField("🔋 **Tamaño:**", `${backupInfos.size} MB`, false)
                // Display when the backup was created
                .addField("📆 **Creado el:**", formatedDate, false)
                .setColor("RANDOM");
            message.channel.send(embed);
        }).catch((err) => {
            // if the backup wasn't found
            return message.channel.send(":x: | No se encontraron copias de seguridad para `"+backupID+"`!");
        });
  }
};
