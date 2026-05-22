#!/usr/bin/env node


expression = "2 + 4 = 5"
tests = {
    number:/[0-9]/,
    string:/[a-z]/i,
    space:/ /
}
operators = {
    "+"  : "PLUS",
    "-"   : "MINUS",
    "*"   : "MULT",
    "/"   : "DIV",
    "=="  : "SAME",
    "===" : "SURELYSAME",
    "!="  : "DIFF",
    "!==" : "SURELYDIFF",
    "="   : "IS",
}
keywords = [
    "say",
    "get",
    "func",
    "let",
    "do",
    "while",
    "if",
    "else",
    "elsif",
    "then",
    "for"
]
function lexit(expression)
{
    const tokens        = []
    const chars         = expression.split("")
    const values        = []
    let   cursor        = 0 
    let   chunk_size    = chars.length
    let   tokens_count  = 0
    while(cursor < chunk_size)
    {
        let char = chars[cursor]
        let value  = char 
        cursor++
        if(tests.space.test(char)){
            values.push(['space',value])
            continue
        }
        if(tests.number.test(char))
        {
            char = chars[cursor]
            while(tests.number.test(char))
            {
                value+=char
                cursor++
                char = chars[cursor]
            }
            values.push(['number',value])
            continue
        }
        if(tests.string.test(char))
        {
            char = chars[cursor]
            while(tests.string.test(char))
            {
                value+=char
                cursor++
                char = chars[cursor]
            }
            values.push(['string',value])
            continue
        }
        if(operators.hasOwnProperty(char))
        {
            values.push([operators[char],value])
            continue
        }
        tokens_count++
    }
    console.info(values)
}
lexit(expression)