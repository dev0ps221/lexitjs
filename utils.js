const fs            = require('fs')
const os            = require('os')
const current_path  = (sub=null)=>'./'+(sub?"/"+sub:"")
const read_json     = (filepath)=>JSON.parse(fs.readFileSync(filepath))
const assets_path   = (sub=null)=>current_path('assets')+(sub?"/"+sub:"")


const get_helpers       = ()=>({
    blocks          : read_json(assets_path('blocks.json')),
    signs           : read_json(assets_path('signs.json')),
    operator_ref    : read_json(assets_path('operator_ref.json')),
    operators       : read_json(assets_path('operators.json')),
    keywords        : read_json(assets_path('keywords.json')),
    tests           : read_json(assets_path('tests.json'))
})
const helpers = get_helpers()
const toRegex       = (str) => 
{
    const match = str.match(/^\/(.*)\/([a-z]*)$/i);
    if (!match) throw new Error("Invalid regex format: " + str);
    return new RegExp(match[1], match[2]);
};

for (const key in helpers.tests) {
    helpers.tests[key] = toRegex(helpers.tests[key]);
}
module.exports = {
    current_path,
    read_json,
    assets_path,
    os,
    fs,
    toRegex,
    helpers
}