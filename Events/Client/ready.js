const client = require("../../main.js");
const ascii = require('ascii-table');
const config = require('../../Settings/Configuration/config.json')
let table = new ascii("Bot Ready");
table.setHeading("Danh sách", " Chi Tiết");

client.once('ready', async () => {
    const user = client.guilds.cache.map((guild) => guild.memberCount).reduce((p, c) => p + c)
    table.addRow(`Bot Name`, `${client.user.username}`)
    table.addRow(`Total Guilds`, `${client.guilds.cache.size} guilds`)
    table.addRow(`Total Users`, `${user} users`)
    table.addRow(`Total Commands`, `${client.commands.size} commands`)
    table.addRow(`Working`, `${client.user.username} is now working !`)
    table.addRow(`Credits`, `Source by DiozVN`)
    console.log(table.toString());

    client.user.setActivity(`My prefix : ${config.prefix}`, {
        type: "PLAYING",
    })
})