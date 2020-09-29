exports.run = async (client, message, args) => {
let Discord = require("discord.js")
let humanize = require("humanize-duration");
let palabras = ["Seguridad", "Falexy", "Wolf", "Fargan"]
let palabra = palabras[Math.floor(Math.random() * palabras.length)] 
let filtro = m => m.content === palabra 
message.channel.send(
new Discord.MessageEmbed()
.setAuthor(`Juego Rapido`, client.user.displayAvatarURL())
.setDescription("**__Tienes que escribir la palabra que se muestra rapidamente para ganar__**")
.addField("**__Palabra:__**", "`"+palabra+"`")
)
message.channel.awaitMessages(filtro, {max: 1, time: 60000, errors: ["time"]}).then(msg => {
message.channel.send(`Gano ${msg.first().author} en ${humanize(Date.now() - message.createdTimestamp, {language: "es"})}`)
}).catch(() => {
message.channel.send(`Ninguno lo logro...`) 
})
}