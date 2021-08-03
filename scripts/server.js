const { spawn } = require('child_process');
const path = require('path');
const process = require('process');
const pwd = process.cwd();
const { argv, argv0 } = process;
const argParamList = argv.filter(item => item !== argv0);
if (argParamList.length === 0) {
  console.log('no more process argv, please check and try again');
  process.exit();
}
const runScriptList = argParamList.slice(1).map(item => {
  if (item.indexOf(pwd) >= 0) {
    return item;
  }
  return path.resolve(pwd, item);
});
runScriptList.forEach(script =>{
  runScript(script);
});
function runScript(script) {
  let ls = spawn(`${argv0}`, [script]);
  ls.stdout.on('data', (data) =>{
    console.log(data.toString());
  })
  ls.stdout.on('close', () =>{
    ls.kill(ls.pid);
    process.exit();
  })
  ls.stderr.on('data', (data) =>{
    console.error(data.toString());
  })
  ls.stdout.on('error', (err) =>{
    console.error(err);
    ls.kill(ls.pid);
    process.exit();
  })
  ls.stderr.on('close', () =>{
    ls.kill(ls.pid);
    process.exit();
  });
}