const Discord = require("discord.js");
exports.run = async (client, message, args) => {
const superagent = require("superagent")
let pais = args[0]
if(!pais) return message.channel.send("❌ `|` **Debes escribir un pais valido**")

superagent
.get(`https://corona.lmao.ninja/v2/countries/${pais}`)
.end((err,res) => {
  let body = res.body
  
  if(body.message) return message.channel.send("❌ `|` **Ese pais no existe, ingresa un pais valido**")

    const cs = new Discord.MessageEmbed()
      .setThumbnail(
        "https://imagenes.catholic.net/imagenes_db/bd20d7_advertencia.jpg"
      )
      .setAuthor("⛔ | CoronaVirus | ⛔")
      .setColor("RANDOM")
      .setURL("https://www.covidvisualizer.com/")
      .setDescription(
        ":roll_of_paper: `|` **Aqui Vera Las Estadisticas Acerca Del CoronaVirus En** " +
          "`" +
          pais +
          "` Recuerda Lavarte Las Manos :hand_splayed: :soap:"
      )
      .addField(":sneeze: `|` **__Casos:__**", `${body.cases}`, true)
      .addField(":bust_in_silhouette: `|` **__Casos Hoy:__**", `${body.todayCases}`, true)
      .addField(":skull_crossbones: `|` **__Muertes:__**", `${body.deaths}`, true)
      .addField(":skull: `|` **__Muertes Hoy:__**", `${body.todayDeaths}`, true)
      .addField(":pill: `|` **__Recuperados:__**", `${body.recovered}`, true)
      .addField(":hot_face: `|` **__Criticos:__**", `${body.critical}`, true)
    message.channel.send(cs);
  })
}