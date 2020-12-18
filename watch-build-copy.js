#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers')
const path = require('path');
const { exec } = require('child_process');
const _throttle = require('lodash/throttle');
const chokidar = require('chokidar');

const curDir = process.cwd();

const argv = yargs(hideBin(process.argv))
    .command('* <watch> <build> <dist> <target>', 'watch build copy', yargs => {
        yargs
            .positional('watch', {
                describe: 'directory to watch',
                type: 'string'
            })
            .positional('build', {
                describe: 'command to build',
                type: 'string'
            })
            .positional('dist', {
                describe: 'dist directory',
                type: 'string'
            })
            .positional('target', {
                describe: 'target directory',
                type: 'string'
            })
            .option('timeout', {
                alias: 't',
                describe: 'the throttle timeout in ms for the build command',
                default: 1000
            })
    })
    .help()
    .argv;

const watchPath = path.join(curDir, argv.watch);

if (!fs.existsSync(watchPath)) {
    console.error(`Watch path "${watchPath}" does not exist.`);
    process.exit(1);
}

const distPath = path.join(curDir, argv.dist);

if (!fs.existsSync(distPath)) {
    console.error(`Dist path "${distPath}" does not exist.`);
    process.exit(1);
}

const targetPath = path.join(curDir, argv.target);

if (!fs.existsSync(targetPath)) {
    console.error(`Target path "${targetPath}" does not exist.`);
    process.exit(1);
}

const buildAndCopy = _throttle(() => {
    console.log('build');

    exec(argv.build,
        function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            if (!error) {
                console.log('copy');
                fs.copy(distPath, targetPath)
                    .then(function () {
                        console.log('done');
                    });
            }
        }
    );
}, argv.timeout, { trailing: false });

buildAndCopy();

chokidar.watch(watchPath)
    .on('add', buildAndCopy)
    .on('change', buildAndCopy)
    .on('unlink', buildAndCopy);
