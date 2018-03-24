const fs = require('fs-extra');
const zipFolder = require('zip-folder');
let manifest = require('../manifest.json');

const BUILD_PATH = "./build";
const BUILDS_PATH = "./builds";

main();

async function main() {
    ensureFolders();
    copyFiles();
    writeManifest();
    await zipBuild();
    cleanup();
    console.log('Finished with no issues. The zip is in the ./builds folder');
}

function ensureFolders() {
    fs.ensureDirSync(BUILD_PATH);
    fs.ensureDirSync(BUILDS_PATH);
}

// cp all needed files into 1 build folder
function copyFiles() {
    let folders = ["img", "dist", "lib"];
    let files = ["index.html", "options.html", "src/scss/index.css"];
    let toCopy = folders.concat(files);

    toCopy.forEach(place => {
        let origin = `./${place}`;
        let dest = `${BUILD_PATH}/${place}`;
        fs.copySync(origin, dest);
    });
}

// edit manifest if need be here
function writeManifest() {
    fs.writeJsonSync('./build/manifest.json', manifest);
}

// zip project
function zipBuild() {
    return new Promise((resolve, reject) => {
        const version = getVersionNumber();
        zipFolder(BUILD_PATH, `${BUILDS_PATH}/daydash-${version}.zip`, err => {
            err ? reject() : resolve();
        });
    });
}

function getVersionNumber() {
    return manifest.version;
}

function cleanup() {
    fs.removeSync(BUILD_PATH);
}