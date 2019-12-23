// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportModdleexam = require('../../../app/middleware/moddleexam');

declare module 'egg' {
  interface IMiddleware {
    moddleexam: typeof ExportModdleexam;
  }
}
