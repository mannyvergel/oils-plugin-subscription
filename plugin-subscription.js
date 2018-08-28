const fs = require('fs');
const path = require('path');

module.exports = async function(pluginConf, web, done) {
  loadModels(pluginConf);

  web.subs = require('./web.subs.js')();

  done();
}


function loadModels(pluginConf) {
  let modelsDir = path.join(pluginConf.pluginPath, 'models');
  let arrFiles = fs.readdirSync(path.join(web.conf.baseDir, modelsDir));
  //console.log('!', arrFiles)
  for (let i=0; i<arrFiles.length; i++) {
    if (web.stringUtils.endsWith(arrFiles[i], '.js')) {
      //console.log('!!!!', arrFiles[i])
      web.includeModel(path.join(modelsDir, arrFiles[i]));
    }
    
  }
}