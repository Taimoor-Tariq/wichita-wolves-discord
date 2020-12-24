const fs = require('fs');
const appInfo = require('../app/package.json');

let main = () => {
    return new Promise((resolve) => {
        let steps = [1,2,3,4,5];

        let prom = steps.map(s => {
            if (s == 1) try {fs.unlink(`${__dirname}/${appInfo.name}-v${appInfo.version}-setup.exe`, (err) => { if (err) console.error(err) }); } catch (e) {}
            if (s == 2) try {fs.mkdirSync(`${__dirname}/${appInfo.name}-win32-x64/data/`); } catch (e) {}
            if (s == 3) try {fs.rename(`${__dirname}/${appInfo.name}-win32-x64/locales`, `${__dirname}/${appInfo.name}-win32-x64/data/locales`, (err) => { if (err) console.error(err) }); } catch (e) {}
            if (s == 4) try {fs.rename(`${__dirname}/${appInfo.name}-win32-x64/resources`, `${__dirname}/${appInfo.name}-win32-x64/data/resources`, (err) => { if (err) console.error(err) }); } catch (e) {}
            if (s == 5) try {fs.rename(`${__dirname}/${appInfo.name}-win32-x64/swiftshader`, `${__dirname}/${appInfo.name}-win32-x64/data/swiftshader`, (err) => { if (err) console.error(err) }); } catch (e) {}
        });

        Promise.all(prom).then(() => resolve());
    })
};

main().then(() => {
    require("innosetup-compiler-cn")(`${__dirname}/compiler.iss`, { gui: false, verbose: true }, (error) => {
        if (error) console.log(error);
        else console.log("DONE !!!");
    });
}).catch(err => { console.log(err) });