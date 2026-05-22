#!/usr/bin/env node


expression = "2 + 4"
tests = {
    number:/[0-9]/,
    identifier:/[a-z]/i,
    space:/ /
}
blocks = [
    {
        type:"STRING",
        delimiters:[
            {
                start:"\"",
                end:"\""
            },
            {
                start:"'",
                end:"'"
            },
        ]
    },
    {
        type:"FUNC",
        delimiters:[
            {
                start:"func",
                end:"end"
            }
        ]
    }
]
signs = {
    "\"" : "DOUBLEQUOTE",
    "\'" : "QUOTE",
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
    "set",
    "func",
    "end",
    "let",
    "do",
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
        if(tests.identifier.test(char))
        {
            char = chars[cursor]
            while(tests.identifier.test(char))
            {
                value+=char
                cursor++
                char = chars[cursor]
            }
            values.push(['identifier',value])
            continue
        }
        if(operators.hasOwnProperty(char))
        {
            values.push([operators[char],value])
            continue
        }
        // if(signs.hasOwnProperty(char))
        // {
        //     values.push([signs[char],value])
        //     let block_index = 0
        //     let block_size = blocks.length
        //     let block = null
        //     let delimiter = null
        //     while(block_index < block_size)
        //     {
        //         let delimiters_index = 0
        //         let delimiters_size = blocks[block_index].delimiters.length
        //         console.info(delimiters_index < delimiters_size)
        //         while(delimiters_index < delimiters_size)
        //         {
        //             if(blocks[block_index].delimiters[delimiters_index].start.match(char))
        //             {
        //                 block = blocks[block_index]
        //                 value = ""
        //                 cursor++
        //                 char = chars[cursor]
        //                 while(char != blocks[block_index].delimiters[delimiters_index].end.match(char))
        //                 {
        //                     value+= char
        //                     cursor++
        //                     char = chars[cursor]
        //                 }
        //                 values.push([block.type,value])
        //                 break
        //             }
        //             delimiters_index++    
        //             if(block)
        //             {
        //                 break
        //             }
        //         }
        //         block_index++
        //         if(block)
        //         {
        //             break
        //         }
        //     }
        //     continue
        // }

        if (signs.hasOwnProperty(char)) {
            values.push([signs[char], char])

            let delimiter = null

            for (let b = 0; b < blocks.length; b++) {
                for (let d = 0; d < blocks[b].delimiters.length; d++) {
                    if (blocks[b].delimiters[d].start === char) {
                        delimiter = blocks[b].delimiters[d]
                        break
                    }
                }
                if (delimiter) break
            }

            if (delimiter) {
                let value = ""
                char = chars[cursor]

                while (cursor < chunk_size && char !== delimiter.end) {
                    value += char
                    cursor++
                    char = chars[cursor]
                }

                values.push(["STRING", value])

                if (char === delimiter.end) {
                    values.push([signs[char], char])
                    cursor++
                }

                continue
            }
        }
        tokens_count++
    }
    console.info(values)
}
lexit(expression)
expression = '"salut comment tu vas"'
lexit(expression)
expression = 'set var_1 = "salut"'
lexit(expression)