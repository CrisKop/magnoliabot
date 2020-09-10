const db = require("megadb");
const desc = new db.crearDB("Descripciones");

exports.run = async (client, message, args) => {
  const regex = /(https?:\/\/)?(www\.)?(discord(\.|dot|\(dot\))(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi.test(
    message.content
  );

  var toNote = args.join(" ");
  if(!desc.tiene(message.author.id)) return message.channel.send("❌ `|` **No tienes ninguna descripcion** `No puedes borrar algo que no tienes`");

  if (regex) {
    message.channel.send("☑️ Tu descripcion ha sido **eliminada** con exito");
    desc.delete(
      `${message.author.id}`,
      "Discord invite links."
    );
  } else {
    message.channel.send("☑️ Tu descripcion ha sido **eliminada** con exito");
    desc.delete(`${message.author.id}`, toNote);
  }
};
