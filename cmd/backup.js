exports.run = async (client, message, args) => {
  //npms//
  const Discord = require("discord.js"),
    backup = require("discord-backup");
  const db = require("megadb");
  //npms//
let prefix_db = new db.crearDB("prefixes")

    let prefix;
  if (prefix_db.tiene(`${message.guild.id}`)) {
    prefix = await prefix_db.obtener(`${message.guild.id}`);
  } else {
    prefix = "f/";
  }
  //prefix//
  
let user = message.author;
const vips_db = new db.crearDB("Vips");
  const vip = await vips_db.obtener("Vips");
  if(vip.includes(user.id) == false) return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(`Has encontrado un beneficio VIP`, message.author.displayAvatarURL())
    .setDescription("**__¿Para que sirve el VIP?__** \nEl vip sirve para que puedas obtener beneficios que tiene el bot, y veas mejor expectativa al bot")
    .setColor("BLUE")
    .setThumbnail(message.author.displayAvatarURL())
    .addField("**__¿Como puedo conseguir VIP?__**", "`Donando: (1.00 a 5.00 USD/EUR)` **[PayPal](https://paypal.me/Xeantrix?locale.x=es_XC)** \n`Boosteando Wolf Security` **[Server Wolf](https://discord.gg/W8nn78X)** \n`Metiendo a Wolf Security a Servidores llenos` **[Invite](https://discord.com/api/oauth2/authorize?client_id=752518742692462672&permissions=403712255&scope=bot)**")
)
  
  const embed = new Discord.MessageEmbed()
      .setThumbnail(message.author.displayAvatarURL())
      .setAuthor(`Informacion Comandos`, client.user.displayAvatarURL())
      .addField(
        "**Lista Comandos:**",
        "📌 Usa `backup create` Para crear backup del servidor \n🧼 Usa `backup load` Para cargar un backup que haya creado anteriormente \n⚙️ Usa `backup list` Para ver la informacion de algun backup hecho \n🔧 **Prefix:** `"+prefix+"`"
      )
      .setColor("PURPLE");

  if (!args[0] || args[0] === "help") return message.channel.send(embed)
  
  if (args[0] === "create") {
    let perms = message.member.hasPermission("ADMINISTRATOR");

    if (!perms)
      return message.channel.send(
        "<a:no:703054715138605067> Error ``|`` No tienes permisos **necesitas permisos de ``Administrador``** <a:no:703054715138605067>."
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
          .setDescription(`Carga backup, usa `+ "`"+ `${prefix}backup load ${backupData.id}` +"` En cualquier servidor")
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
        "<a:no:703054715138605067> Error ``|`` No tienes permisos **necesitas permisos de ``Administrador``** <a:no:703054715138605067>."
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
