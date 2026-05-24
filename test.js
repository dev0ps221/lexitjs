#!/usr/bin/env node
const {LexIt,utils,helpers,get_helpers} = require('./lexit')
const lexer = new LexIt()
const tokenize = lexer.tokenize
// expression = "2 + 4"
// tokenize(expression)
// expression = '"salut comment tu vas"'
// tokenize(expression)
// expression = 'set var_1 = "salut"'
// tokenize(expression)
// expression = 'set condition = "salut" !== "ca va"'
// tokenize(expression)
// expression = `
//     func say_hello[name]
//         say "helo {{name}}";
//     end
// `
// tokenize(expression)
expression = 'let var_a'
tokenize(expression)