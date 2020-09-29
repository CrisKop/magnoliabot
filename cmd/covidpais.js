const Discord = require("discord.js");
module.exports = {
  name: "pais",
  category: "utilidad",
  description: "Te muestra las estadisticas del coronavirus en un pais",
  usage: "`pais <pais>`",
  run: async (client, message, args) => {
const superagent = require("superagent")
let pais = args[0]
if(!pais) return message.channel.send("<:no:726124490139893790> ``|`` **Ingresa una pais**")

superagent
.get(`https://corona.lmao.ninja/v2/countries/${pais}`)
.end((err,res) => {
  let body = res.body
  
  if(body.message) return message.channel.send("<:no:726124490139893790> ``|`` **Ingresa pais valido**.")

    const cs = new Discord.MessageEmbed()
      .setThumbnail(
        "https://imagenes.catholic.net/imagenes_db/bd20d7_advertencia.jpg"
      )
      .setTitle(":no_entry: >> | CoronaVirus | << :no_entry:")
      .setColor("#ff0000")
      .setURL("https://www.covidvisualizer.com/")
      .setDescription(
        ":roll_of_paper: >> | **Aqui Vera Las Estadisticas Acerca Del CoronaVirus En** " +
          "`" +
          pais +
          "` Recuerda Lavarte Las Manos :hand_splayed: :soap:"
      )
      .addField(":sneeze: >> | Casos", `${body.cases}`, true)
      .addField(":bust_in_silhouette: >> | Casos Hoy", `${body.todayCases}`, true)
      .addField(":skull_crossbones: >> | Muertes", `${body.deaths}`, true)
      .addField(":skull: >> | Muertes Hoy", `${body.todayDeaths}`, true)
      .addField(":pill: >> | Recuperados", `${body.recovered}`, true)
      .addField(":hot_face: >> | Criticos", `${body.critical}`, true)
      .setFooter("Wolf Security | Covid-19", client.user.displayAvatarURL());
    message.channel.send(cs);
  })
}
}