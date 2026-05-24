const fs            = require('fs')
const os            = require('os')
const current_path  = (sub=null)=>__dirname+(sub?(sub.startsWith('/') ? "" : "/")+sub:"")
const read_json     = (filepath)=>JSON.parse(fs.readFileSync(filepath))
const assets_path   = (sub=null)=>current_path('assets')+(sub?(sub.startsWith('/') ? "" : "/")+sub:"")


const get_helpers       = ()=>({
    blocks          : read_json(assets_path('blocks.json')),
    signs           : read_json(assets_path('signs.json')),
    operator_ref    : read_json(assets_path('operator_ref.json')),
    operators       : read_json(assets_path('operators.json')),
    keywords        : read_json(assets_path('keywords.json')),
    tests           : read_json(assets_path('tests.json'))
})
const helpers = get_helpers()
module.exports = {
    current_path,
    read_json,
    assets_path,
    os,
    fs,
    helpers
}