#!/usr/bin/env node

const utils = require('./utils')

const { current_path,read_json,assets_path,os,fs,toRegex,get_helpers,helpers } = utils

const { blocks,signs,operator_ref,operators,tests } = helpers

class LexIt{
    tokenize(expression)
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
            if(char && char.match(tests.space)){
                values.push(['space',value])
                continue
            }
            if(char && char.match(tests.newline)){
                values.push(['newline',value])
                continue
            }
            if(char && char.match(tests.number))
            {
                char = chars[cursor]
                while(char && char.match(tests.number))
                {
                    value+=char
                    cursor++
                    char = chars[cursor]
                }
                values.push(['number',value])
                continue
            }
            if(char && char.match(tests.identifier_start))
            {
                char = chars[cursor]

                while(char && char.match(tests.identifier))
                {
                    value += char
                    cursor++
                    char = chars[cursor]
                }
                values.push(['identifier', value])
                continue
            }
            // if(operators.hasOwnProperty(char))
            // {
            //     values.push([operators[char],value])
            //     continue
            // }
            let three = chars.slice(cursor-1, cursor+2).join("")
            let two   = chars.slice(cursor-1, cursor+1).join("")
            let one   = char

            if(operators[three])
            {
                values.push([operators[three], three])
                cursor += 2
                continue
            }

            if(operators[two])
            {
                values.push([operators[two], two])
                cursor += 1
                continue
            }

            if(operators[one])
            {
                values.push([operators[one], one])
                continue
            }
            if(signs.hasOwnProperty(char)) 
            {
                values.push([signs[char],value])

                let block = null
                let matched = false

                for (let i = 0; i < blocks.length; i++) {
                    for (let j = 0; j < blocks[i].delimiters.length; j++) {

                        const d = blocks[i].delimiters[j]

                        if (d.start === char) {
                            block = blocks[i]
                            matched = true
                            value = ""

                            cursor++

                            while (cursor < chunk_size && chars[cursor] !== d.end) {
                                value += chars[cursor]
                                cursor++
                            }

                            values.push([block.type, value])

                            if (chars[cursor] === d.end) {
                                values.push([signs[chars[cursor]], chars[cursor]])
                                cursor++
                            }

                            break
                        }
                    }
                    if (matched) break
                }

                if (!matched) {
                    cursor++   // 👈 CRITICAL SAFETY NET
                }

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
            //         while(delimiters_index < delimiters_size)
            //         {
            //             // console.info(blocks[block_index].delimiters,char)
            //             if(blocks[block_index].delimiters[delimiters_index].start==char)
            //             {
            //                 block = blocks[block_index]
            //                 value = ""
            //                 char = chars[cursor]
            //                 while(char && char && (char != blocks[block_index].delimiters[delimiters_index].end))
            //                 {
            //                     value+= char
            //                     cursor++
            //                     char = chars[cursor]
            //                 }
            //                 values.push([block.type,value])
            //                 values.push([signs[char],char])
            //                 cursor++
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
            tokens_count++
        }
        console.info(values)
    }
}
module.exports = {LexIt,utils,helpers}