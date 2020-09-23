  let { crearDB } = require("megadb"); // Llamamos al constructor crearDB
  let palta = new crearDB("palta"); // Creamos el archivo json en el que almacenaremos los datos de los usuarios AFK
let Discord = require("discord.js")
exports.run = async (client, message, args) => {
  if (palta.tiene(message.guild.id)) {
    //Verificamos si el archivo json tiene datos guardados con la ID del servidor donde se mando el mensaje
    let lista = await palta.get(message.guild.id); //Obtenemos el array guardado con la lista de los usuarios AFK en el servidor
    if (lista.includes(message.author.id)) {
      //Verificamos si el array incluye la ID del autor del mensaje
      palta.extract(message.guild.id, message.author.id); //Eliminamos el elemento con la ID del autor del mensaje del array
      message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setDescription("**Ya no te encuestras AFK**")
      ); //Enviamos un mensaje avisandole al autor del mensaje que ya no esta AFK
    }
  } //Cerramos
  //Lo de arriba va al inicio del evento message y arriba de cualquier condiciÃ³n que retorne si el contenido del mensaje no empieza por X caracter, por ejemplo if(!message.content.startsWith(prefix)) return;

  if (message.mentions.users.first() && palta.tiene(message.guild.id)) {
    //Verificamos si el mensaje tiene una mención y el archivo json datos
    let lista = await palta.get(message.guild.id); //Obtenemos el array con la lista de usuarios AFK nuevamente
    let text = []; //Declaramos text como un array vació
    message.mentions.users.forEach(x => {
      //Utilizamos forEach para repetir una acción con todas las menciones
      if (lista.includes(x.id)) {
        //Verificamos si el array de los usuarios AFK incluye la ID de los usuarios mencionados
        text.push("<@" + x.id + ">"); //Añadimos la ID de los usuarios AFK al array text para mencionarles luego
      }
    });
    if (text.length >= 1) {
      //Verificamos si la longitud del array es mayor o igual a 1 en caso de que ninguno de los usuarios mencionados estuviera AFK
      let estan = text.length > 1 ? "están" : "esta"; //Esto es por simple estetica, Utilizamos un operador ternario para verificar si text tiene más de 1 elemento, en caso de que si nuestra variable será igual a "están", en caso contrario "esta"
      message.channel.send("¡" + text.join(" ") + " " + estan + " afk!"); //Enviamos el mensaje, utilizamos text.join(' ') para unir el array con un espacio
    }
  } //Cerramos

  if (message.content.startsWith("f/afk")) {
    //Verificamos si el contenido del mensaje empieza con "!afk"
    if (!palta.tiene(message.guild.id)) palta.establecer(message.guild.id, []); //Verificamos si el archivo json tiene datos guardados con la ID del servidor, En caso de que no establecemos un array
    palta.push(message.guild.id, message.author.id); //Añadimos la ID del autor del mensaje al array
    message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("RED")
    .setDescription("**Te encuentras AFK en este momento**")); //Enviamos el mensaje avisandole al usuario que ahora esta AFK
  } //Cerramos
}