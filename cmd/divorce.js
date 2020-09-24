const db = require("megadb");
const db_marry = new db.crearDB("marry");
const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => {
    const usuario =
      message.mentions.users.first() || client.users.cache.get(args[0]); // Hacemos que la persona la que quiera proponer matrimonio pueda mencionar o poner una ID

    if (!usuario)
      return message.channel.send(
        "Debes mencionar la persona con la que te casaste"
      ); // Si la persona no menciona o pone ID de un usuario valido enviara este mensaje.

    if (!db_marry.tiene(usuario.id))
      return message.channel.send("Esta persona no esta casada."); // Envia este mensaje si la persona que mencionan ya esta casada.

    if (!db_marry.tiene(message.author.id))
      return message.channel.send("Tu ya no estas casado con alguien."); // Envia este mensaje si la persona que propone matrimonio esta casada.

    message.channel.send(
      `${usuario} aceptas a ${message.author} para divorciarse? \nEscribe **si** para aceptar \nEscribe **no** para rechazar`
    ); // Envia el mensaje para proponer matrimonio a la persona.

    const collector = message.channel.createMessageCollector(
      m => m.author.id === usuario.id && m.channel.id === message.channel.id,
      { time: 30000 }
    ); // Ponemos que tiene 3 segundos para poder responder a este mensaje.

    collector.on("collect", collected => {
      if (collected.content.toLowerCase() === "si") {
        message.channel.send("Se han separado tristemente"); // Envia este mensaje si la respuesta de la persona que mencionaron es "yes"
        db_marry.eliminar(message.author.id, {
          id: usuario.id,
          tag: usuario.username
        }) /
          db_marry.eliminar(usuario.id, {
            id: message.author.id,
            tag: message.author.username
          }); // Enviamos esto a la base de datos.
      } else if (collected.content.toLowerCase() === "no") {
        message.channel.send("Aun te ama, y no quiere irse de tu lado"); // Si la respuesta es no enviara este mensaje.
      }
    });
  }
