const fs = require("fs");

function readWriteSync() {
    const data = fs.readFileSync("./mock.log", "utf-8");

    let newValue = data.replace(/<[^<>]*>/g, "<XXX>"); // censor author
    newValue = newValue.replace(/BAN[^(]*/g, "BAN: XXX "); // censor author
    // TODO: delete \ `

    fs.writeFileSync("mock_censored.log", newValue, "utf-8");
}

readWriteSync();
