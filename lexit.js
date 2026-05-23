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
            if(tests.space.test(char)){
                values.push(['space',value])
                continue
            }
            if(tests.newline.test(char)){
                values.push(['newline',value])
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
            if(tests.identifier_start.test(char))
            {
                char = chars[cursor]

                while(tests.identifier.test(char))
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
                let block_index = 0
                let block_size = blocks.length
                let block = null
                let delimiter = null
                while(block_index < block_size)
                {
                    let delimiters_index = 0
                    let delimiters_size = blocks[block_index].delimiters.length
                    while(delimiters_index < delimiters_size)
                    {
                        // console.info(blocks[block_index].delimiters,char)
                        if(blocks[block_index].delimiters[delimiters_index].start==char)
                        {
                            block = blocks[block_index]
                            value = ""
                            char = chars[cursor]
                            while(char && (char != blocks[block_index].delimiters[delimiters_index].end))
                            {
                                value+= char
                                cursor++
                                char = chars[cursor]
                            }
                            values.push([block.type,value])
                            values.push([signs[char],char])
                            cursor++
                            break
                        }
                        delimiters_index++    
                        if(block)
                        {
                            break
                        }
                    }
                    block_index++
                    if(block)
                    {
                        break
                    }
                }
                continue
            }
            tokens_count++
        }
        console.info(values)
    }
}
module.exports = {LexIt,utils,helpers}