const cli_args = process.argv.slice(2);
const fs = require("fs");

var FNDEFS = [];

function getFunctionName(obj) {
    return Object.keys(obj)[0]; // there's only 1 item.
}

function getFunctionArgs(obj, name) {
    return obj[name];
}

function getFunctionBody(name) {
    for (var i of FNDEFS) {
        if (name == i.name) {
            return i.body;
        }
    };
    return [];
}

function call(fn, args) {
    fn.args.forEach(element =>{
        if (typeof(element) == "object") {

            var name = getFunctionName(element);
            var args = getFunctionArgs(element, name);

            let new_fn = {
                name: name,
                args: args,
                body: getFunctionBody(name)
            }

            call(new_fn, args);
        }
    });

    if (fn.name == "print") {
        console.log(args.join(' '));
    }

    fn.body.forEach(element => {
        var name = getFunctionName(element);
        var args = getFunctionArgs(element, name);

        let new_fn = {
            name: name,
            args: args,
            body: getFunctionBody(name)
        }

        call(new_fn, args);
    });
}

function processJSON(json) {
    json.defn.forEach(element => {
        FNDEFS.push(element);
    });

    json.main.forEach(element => {
        var name = getFunctionName(element);
        var args = getFunctionArgs(element, name);

        let fn = {
            name: name,
            args: args,
            body: getFunctionBody(name)
        }

        call(fn, args);
    });
}

function main() {
    if (cli_args.length == 0) {
        console.log("i need a json file to do something");
    }

    var data;
    try {
        data = fs.readFileSync(cli_args[0], "utf-8");
    } catch (e) {
        console.log(e);
    }

    processJSON(JSON.parse(data));
}

main();
