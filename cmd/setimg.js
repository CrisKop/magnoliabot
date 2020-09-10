const db = require("megadb");
const desc = new db.crearDB("Imgs");
exports.run = async (client, message, args, color, prefix) => {

  const regex = /(https\:\/\/)?(www\.)?(discord(\.|dot|\(dot\))(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi.test(message.content);

  var toNote = args.join(" ");
  if (!toNote)
    return message.channel.send(
      "❌ Debe especificar un link"
    );
if(!message.content.includes("https://")) return message.channel.send("Ponga algun Link")
  
  if (regex) {
    message.channel.send("☑️ Tu Imagen ha sido **cambiada** con exito");
    desc.establecer(
      `${message.author.id}`,
      "Estan prohibidas las invitaciones"
    );
  } else {
    message.channel.send("☑️ Tu Imagen ha sido **cambiada** con exito");
    desc.establecer(`${message.author.id}`, toNote);
  }
};
