exports.run = async (client, message, args) => {
  let Discord = require("discord.js");
const res = await require("node-fetch")(
    `https://corona.lmao.ninja/v2/countries`
  );
  const data = await res.json();

  const cases = data.map(d => d.cases).reduce((a, b) => a + b);

  const casesToday = data.map(d => d.todayCases).reduce((a, b) => a + b);
  const deaths = data.map(d => d.deaths).reduce((a, b) => a + b);
  const deathsToday = data.map(d => d.todayDeaths).reduce((a, b) => a + b);
  const recovered = data.map(d => d.recovered).reduce((a, b) => a + b);
  const critical = data.map(d => d.critical).reduce((a, b) => a + b);

  const cs = new Discord.MessageEmbed()
    .setThumbnail(
      "https://i.pinimg.com/originals/64/d8/bb/64d8bb0835db28da85e53aeabbae4e51.png"
    )
    .setAuthor("⛔ | COVID-19 Estadisticas | ⛔")
    .setURL("https://www.covidvisualizer.com/")
    .setColor("RANDOM")
    .setDescription(
      "💬 | Aqui Podras Ver Los Casos De Corona Virus En Todo El Mundo"
    )
    .setURL(
      "https://www.rtve.es/noticias/20200326/mapa-mundial-del-coronavirus/1998143.shtml"
    )
    .addField(":bust_in_silhouette: `|` **__Casos hoy:__**", casesToday, true)
    .addField(":sneeze: `|` **__Casos En General:__**", cases, true)
    .addField(":skull: `|` **__Muertes:__**", deaths, true)
    .addField(":hot_face: `|` **__Muertes hoy:__**", deathsToday, true)
    .addField(":pill: `|` **__Recuperados:__**", recovered, true)
    .addField(":skull_crossbones: `|` **__Criticos:__**", critical, true);
  message.channel.send(cs);
}