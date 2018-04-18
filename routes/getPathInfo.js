var express = require('express');
var router = express.Router();
var fs = require('fs');

function getCredentials()
{
  var password;
  var username;
  var homeDir;

  if(process.env.HOMEPATH) homeDir = process.env.HOMEDRIVE + process.env.HOMEPATH;
  else homeDir = process.env.HOME;

  var lines = fs.readFileSync(homeDir + "/.dgd/pw").toString().replace(/\r/g,"").split('\n');

  for(var i = 0;i < lines.length;i++)
  {
    var lineComponent = lines[i].split(' ');

    if(lineComponent[0].split('@')[1] == 'localhost')
    {
      username = lineComponent[0].split('@')[0];
      password = lineComponent[1];
    }
  }
  return { username:username, password:password};
}

router.get('/',function(req,res,next)
{
  res.render('getPathInfo', { title: 'File Browser', username:credentials.username, password:credentials.password });
});

var credentials = getCredentials();

module.exports = router;
