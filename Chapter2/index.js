const fsPromises = require('fs').promises;
const path = require('path');


const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'Files', 'starter.txt'), 'utf-8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'Files', 'starter.txt'))
        await fsPromises.writeFile(path.join(__dirname, 'Files', 'promiseWrite.txt'), data)
        await fsPromises.appendFile(path.join(__dirname, 'Files', 'promiseWrite.txt'), '\n\nYes it is')
        await fsPromises.rename(path.join(__dirname, "Files", 'promiseWrite.txt'), path.join(__dirname, 'Files', 'promiseComplete.txt'))
        const newDat = await fsPromises.readFile(path.join(__dirname, 'Files', 'promiseComplete.txt'), 'utf-8');
        console.log(newDat);
    } catch (err) {
        console.error(err);
    }
}

fileOps();
// fs.readFile(path.join(__dirname, 'Files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// console.log('Hello.....')

// process.on('uncaughtException', err => {
//     console.error(`There was an uncaught error: ${err}`);
//     process.exit(1);
// })

// fs.writeFile(path.join(__dirname, 'Files', 'reply.txt'), 'Nice to meet you', (err) => {
//     if (err) throw err;
//     console.log("Write complete");

//     fs.appendFile(path.join(__dirname, 'Files', 'reply.txt'), '\n\nYes it is', (err) => {
//         if (err) throw err;
//         console.log('Append complete')
   

//         fs.rename(path.join(__dirname, 'Files', 'reply.txt'), path.join(__dirname, 'Files', 'NewReply.txt'), (err) => {
//             if (err) throw err;
//             console.log('Rename complete');
//         })
//     })
// })
