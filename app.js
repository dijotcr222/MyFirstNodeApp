const express = require('express')
const app = express()
var sql = require('mssql')
var util = require('util');
var bodyParser = require('body-parser')



// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

var connection = {
    server: 'dchat.database.windows.net',
    user: 'dijotcr222',
    password: 'D1j0=0kRia123',
    database: 'MYChatTest',
    options: {
	       encrypt: true
	  }
};

sql.connect(connection, function (err) {
  if(err){
    console.log(err);
    console.log("Error in connection");
  }else{
    console.log("DB Connected");
  }
})




app.post('/senddata', function (req, res) {
    var data = {
      "chatid" : 6,
      "Conversation" : 4,
      "chat": "'Hi its worling'",
      "response": "'this is response'"
    }
    var conn = new sql.Connection(connection);
    var reqs = new sql.Request(conn);

    conn.connect(function(err){
      if(err){
        res.send({"code": 401, "message":err},401);
      }else{
        var SqlSt = "INSERT into ChatTable (ChatID, Conversation, Chat, response) VALUES";
        SqlSt += util.format("(%d,%d,%s,%s)", data.chatid,data.Conversation,data.chat,data.response );
        reqs.query(SqlSt, function(err, data){
            if(err){
              console.log(err);
              res.send(401, {"Message" : "Some Issue in saving data"})
            }else{
              res.send(200, {"Message" : "Data Saved"});
            }
        });
      }
    });

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
