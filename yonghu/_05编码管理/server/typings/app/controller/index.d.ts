// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp = require('../../../app/controller/app');
import ExportExam = require('../../../app/controller/exam');
import ExportLogin = require('../../../app/controller/login');

declare module 'egg' {
  interface IController {
    app: ExportApp;
    exam: ExportExam;
    login: ExportLogin;
  }
}
