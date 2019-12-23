/* eslint valid-jsdoc: "off" */

'use strict';

// exports.middleware = ['moddleexam'];
exports.mysql = {
    client: {
        host: '169.254.166.51',
        port: '3306',
        user: 'root',
        password: 'root1234',
        database: 'exammodule',
    },
    app: true,
    agent: false,
};
exports.security = {
    csrf: {
        enable: false,
    },
    domainWhiteList: ['http://localhost:3000'],
};
exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};
exports.jwt = { secret: '123456' };
exports.keys = '1111';
