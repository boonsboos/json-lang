# json-lang

the coolest programming language ever!

## features
- familiar syntax
- zero cost javascript interop (wip)
- runs on anything*
- dynamic typing with type inference
- garbage collected
- JIT compiled
- no variables (yet) (wip)
- multiple types of null
- no pointers to do arithmetic with

## requirements
- node.js / deno (bun might work, but has not been tested)
- a way to type commands into your terminal
- access to a terminal

## building

### nodejs
no need! after cloning the repo, just run the compiler with
```shell
$ node main.js yourjsonfile.json
```
or if you're fancy, add this to your `.bashrc` or `.zshrc` or whatever:
`alias jsonc="node /path/to/main.js"`

### deno
you can either run it with
```shell
$ deno run -A main.js yourjsonfile.json
```

or compile it into an executable with
```shell
# the resulting executable should be named 'json-lang'
$ deno compile -A main.js
```

*anything that supports running node.js
