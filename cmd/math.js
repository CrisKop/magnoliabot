const { stripIndents } = require("common-tags")

const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const d = ["Baby", "Easy", "Medium", "Hard", "Extreme"]

const dificultad= d[Math.floor(Math.random() * d.length)]

const operaciones = ["+", "*", "-"]

const maxValues = {
	baby: 10,
	easy: 50,
	medium: 100,
	hard: 500,
	extreme: 1000
}

const maxMultiplyValues = {
	baby: 5,
	easy: 12,
	medium: 30,
	hard: 50,
	extreme: 100
}

const operacion = operaciones[Math.floor(Math.random() * operaciones.length)]

let respuesta
let valor1
let valor2

switch (operacion) {
case "+":
valor1 = Math.floor(Math.random() * maxValues[dificultad]) + 1;
				valor2 = Math.floor(Math.random() * maxValues[dificultad]) + 1;
				respuesta = valor1 + valor2;
				break
case "-":
				valor1 = Math.floor(Math.random() * maxValues[dificultad]) + 1;
				valor2 = Math.floor(Math.random() * maxValues[dificultad]) + 1;
			respuesta = valor1 - valor2;
				break
case "*":
				valor1 = Math.floor(Math.random() * maxMultiplyValues[dificultad]) + 1;
				valor2 = Math.floor(Math.random() * maxMultiplyValues[dificultad]) + 1;
			respuesta = valor1 * valor2
break
}
await message.reply(stripIndents`Tienes 10 segundos para contestar\nOperacion: \`${valor1} ${operacion} ${valor2}\`\n Dificultad: \`${dificultad}\``)

const msgs = await message.channel.awaitMessages(
res => res.author.id === message.author.id,{
max: 1,
time: 10000
})

if (!msgs.size)	return message.reply(`Te demoraste la respuesta era: \`${respuesta}\`.`)

if (msgs.first().content !== respuesta.toString())
return message.reply(`Te equivocaste era, \`${respuesta}\`.`)
  
return message.reply(`Perfecto si era \`${respuesta}\``)
}