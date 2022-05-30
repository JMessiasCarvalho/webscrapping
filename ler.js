const fs = require('fs')
const csv = require('fast-csv')
const entrada = fs.createReadStream('perfisUrl.csv')

const perfis = [];

const saveDB = record => {
    return new Promise((resolve, reject) =>{
        setTimeout(resolve, Math.ceil(Math.random()*400))
        console.log(record);
        perfis.push({url: record.perfilURL})
    })
}

const csvStream = entrada.pipe(csv.parse({ headers: true}))
.on('data', data => {
    csvStream.pause();
    saveDB(data).then(()=>{
        csvStream.resume();
    })
}).on('end', e => console.log(perfis))