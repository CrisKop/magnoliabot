exports.run = async (client, message, args) => {
  
  const moment = require('moment') // requerir la lib obviamente lol


let user = message.author // esto es solo para acortar un poco pero no es necesario


const joinDiscord = moment(user.createdAt).toDate() // en esta línea agarramos la fecha de cuando fue creada la cuenta y usamos el método toDate() para manejarlo mejor para más info (https://momentjs.com/docs/#/displaying/as-javascript-date/)

const timeNow = moment().subtract('2190', 'hours').toDate() // Aquí agarro la fecha actual y con el metodo subtract() le quito en horas los meses, la lógica es simple y trataré de explicarlo para que entiendas qué estás haciendo más adelante. (https://momentjs.com/docs/#/durations/subtract/)

if (!moment(timeNow).isAfter(joinDiscord)) return message.channel.send('Sorry, you do not have the valid requirements to use this command. Try it in a few days.')
  
}