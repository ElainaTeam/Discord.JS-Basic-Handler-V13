const fs = require('fs');
const ascii = require('ascii-table');

let table = new ascii("Danh Sách Commands");
table.setHeading("Tên", " Trạng Thái");

module.exports = (client) => {
    // let command = 0
    
    fs.readdirSync(`./Commands/`).forEach(dir => {
        let commands = fs.readdirSync(`./Commands/${dir}/`).filter(file => file.endsWith(".js"));
        // if (commands.length <= 0) return console.log(`[Dio Systems] ElainaGB can't find any commands`)

        for (let file of commands) {
            let pull = require(`../Commands/${dir}/${file}`);

            if (pull.name) {
                // command++;
                client.commands.set(pull.name, pull);
                // table.addRow(file, '✅  > Hoạt Động');
                table.addRow(file, `✅  > Hoạt Động`)
            } else {
                table.addRow(file, `❌  > Lỗi`);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}