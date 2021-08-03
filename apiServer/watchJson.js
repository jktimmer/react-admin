const fs = require('fs');
const { resolve } = require('path');
const watchFileName = resolve(__dirname, './base.json');
// const baseData = require(watchFileName);

class WatchJson {
  constructor(filepath) {
    this.filepath = filepath;
    this.baseData = require(filepath);
    this.watchFunc();
  }
  watchFunc() {
    fs.watch(this.filepath, this.watchCallBackFunc.bind(this));
  }
  watchCallBackFunc(event, filename){
    this.baseData = null;
    if (event === 'rename') {
      this.baseData = {};
      return;
    }
    fs.readFile(watchFileName, { encoding: 'utf8' } ,(err, data) =>{
      if (err) throw err;
      try {
        this.baseData = JSON.parse(data);
      } catch (e) {
        this.baseData = {};
        console.log('baseData to json error',err.message);
      }
    });
  }
}

// function 
// fs.watch(watchFileName,watchFunc);
const jsonObj = new WatchJson(watchFileName);

module.exports = jsonObj;
// const handler = {
//   set: function(obj, prop, value) {
//     console.log(obj, prop, value);
//     return true;
//   }
// };
// const proxy = new Proxy(baseData, handler);
// console.log(proxy);
// function unWatch() {
//   fs.unwatchFile(watchFileName);
// }
// process.on('exit', ()=>{
//   console.log('exit');
//   unWatch();
// });
// process.on('uncaughtException', ()=>{
//   console.log('exit exception');
//   unWatch();
// });