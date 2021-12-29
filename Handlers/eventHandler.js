const fs = require('fs');
const ascii = require('ascii-table');

let table = new ascii("Danh Sách Events");
table.setHeading("Tên", " Trạng Thái");

module.exports = (client) => {
    fs.readdirSync(`./Events/`).forEach(dir => {
        const events = fs.readdirSync(`./Events/${dir}/`).filter(file => file.endsWith(".js"));

        for (let file of events) {

            try {
                let pull = require(`../Events/${dir}/${file}`);

                if (pull.name) {
                    client.events.set(pull.name, pull);
                    table.addRow(file, `❌  > Lỗi`);
                } else {
                    table.addRow(file, `✅  > Hoạt Động`);
                    continue;
                }
            } catch (e) {
                console.log(e)
                table.addRow(file, `❌  > Đã có lỗi xảy ra khi chạy`);
            }

        }
    });

    console.log(table.toString());
}