// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportApp = require('../../../app/service/app');
import ExportExam = require('../../../app/service/exam');
import ExportLogin = require('../../../app/service/login');

declare module 'egg' {
  interface IService {
    app: ExportApp;
    exam: ExportExam;
    login: ExportLogin;
  }
}
