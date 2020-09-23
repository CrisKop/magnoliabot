exports.run = async (client, message, args) => {
  let Discord = require("discord.js");

  let db = require("megadb");
  const notas = new db.crearDB("Notas");

  if (!args[0])
    return message.channel.send(
      new Discord.MessageEmbed()
      .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
        .setAuthor(`ERROR`)
        .setDescription(
          "**Informacion acerca de las notas** \n<a:si:739197012569882645> **Para agregar usa `notas añadir (nota)` \n<a:no:739167677440065659> Para eliminar usa `notas eliminar <id>/<all>` \n🔍 Para ver tus notas usa `notas ver` \n🆙 Para actualizar una nota usa `notas actualizar <id> <nueva-nota>`**"
        )
    );

    if(args[0] === "añadir") {
      let no = args.slice(1).join(" ")
      if (!no) return message.channel.send("Debe colocar un texto para notas");
      let max = await notas.obtener(message.author.id)
      
      if(notas.tiene(message.author.id)) {
        const arr = await notas.obtener(message.author.id);
        notas.push(message.author.id, no);
        message.channel.send("Ha sido añadida la nota tu libreta");
      } else {
        notas.establecer(message.author.id, [args.slice(1).join(" ")]);
        message.channel.send("Ha sio añadida la nota a tu libreta");
      }
    }
  if (args[0] === "ver") {
    if(notas.tiene(message.author.id)) {
    let arr = await notas.obtener(message.author.id)
    let text = "";
        let i = 0;
        arr.forEach(r => {
          i++
          text += i + ". " + r + "\n";
        })
    if(arr.length > 5) return message.channel.send("No puedo mostrarte tus notas , tienes mas de 5, usa `notas eliminar all`")
    const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`${text ? `**${text}**` : "**No tienes notas**"}`)
    message.channel.send(embed)
  } else {
  message.channel.send("No tienes notas")
  }
  }
  if (args[0] === "eliminar"){
    if(notas.tiene(message.author.id)) {
        if (!args[0]) return message.channel.send(":no_entry: Pon la ID de una nota para eliminarla \nSi quieres eliminar notas usa `notas eliminar all`");
        if (args[1] === "all") {
          //En caso de querer remover todo....
          notas.delete(message.author.id);
          message.channel.send("Has eliminado todas tus notas");
        } else {
          //Un número
          const arr = await notas.obtener(message.author.id);
          let o = parseInt(args[1])
          if(!o) return message.channel.send("Esa ID esa invalida")
          let i = o - 1;
          if(!arr[i]) return message.channel.send("La nota con esa ID no existe en tu libreta");
          arr.splice(i, 1);
          notas.establecer(message.author.id, arr)
          message.channel.send("Has eliminado una nota");
        }
      } else return message.channel.send("No tienes notas"); 
  }
  if (args[0] === "actualizar"){
          if(notas.tiene(message.author.id)) {
        if (!args[0]) return message.channel.send("Debe colocar la ID de la nota que quiere actualizar");
        else {
          //Hay que ver si la ID de esa nota existe..
          const arr = await notas.obtener(message.author.id);
          let o = parseInt(args[1]);
          if(!o) return message.channel.send("Esa ID es invalida")
          let i = o - 1;
          if(!arr[i]) return message.channel.send("No tienes una nota con esa ID");
          if (!args[1]) return message.channel.send("Debes colocar un texto `notas actualizar <id> <nueva-nota>`");
          arr[i] = args.slice(2).join(" ").replace(/(\r\n|\n|\r)/gm, " ");
          notas.establecer(message.author.id, arr);
          message.channel.send("Has actualizado una nota");
        }
      } else return message.channel.send("No tienes notas");
  }
}