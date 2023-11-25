import { readFileSync } from 'node:fs';
import { argv, stdout } from 'node:process';

const cli_args = argv.slice(2);

var FNDEFS = [];
var STACK = [];

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

const builtins = {
    ret: (args) => {
        
    }
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

    switch(fn.name) {
    case "print":
        fn.args.forEach(element => {
            if (typeof(element) == "object") {
                stdout.write(STACK.pop());
            } else {
                stdout.write(""+element);
            }
            process.stdout.write(" ")
        });
        break;
    case "ret":
        STACK.push(args[0]); // no multiple return
        return;
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
            args: [],
            body: getFunctionBody(name)
        }

        call(fn, args);
    });
}

// main stuff

if (cli_args.length == 0) {
    console.log("i need a json file to do something");
}

try {
    processJSON(
        JSON.parse(
            readFileSync(cli_args[0], "utf-8")
        )
    );
} catch (e) {
    console.log(e);
}