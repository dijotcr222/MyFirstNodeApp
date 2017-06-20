var restify = require('restify');
var builder = require('botbuilder');
var http = require('http');

var local = true;

//For HTTPS
var https_options = {};
if (!local) {
    var fs = require('fs');
    https_options = {
        key: fs.readFileSync('/etc/letsencrypt/live/your.domain/privkey.pem'),
        certificate: fs.readFileSync('/etc/letsencrypt/live/your.domain/fullchain.pem'),
    };
}

    var Connection = require('tedious').Connection;
    var Request = require('tedious').Request;
    // Create connection to database
  var config = {
  userName: 'dijo123', // update me
  password: 'dijo123', // update me
  server: 'demodijo.database.windows.net', // update me
  options: {
      database: 'myFirstSql' //update me
  }
}
var connection = new Connection(config);
// Setup Restify Server
var server = restify.createServer(https_options);
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', '138.197.0.221', server.url);
} );

// Create chat bot
var connector = new builder.ChatConnector({
                                          appId: 'b7d4b9a2-a9fc-4c9c-a017-3bf24fa60a4a',
                                          appPassword: 'YAFAHQ8AzGAaRyk2JLKHp1t'
                                          });
var bot = new builder.UniversalBot(connector, {persistConversationData: true});

server.post('/api/messages', connector.listen());

bot.dialog('/', function (session, args) {

    if (!session.userData.greeting) {

        session.send("Hi DIJO.  We think that you’d best suit a KiwiSaver Balanced fund but it’s possible you’d prefer an alternative fund.  What would you like to do?");
        session.userData.greeting = true;

    } else if (!session.userData.name) {

        console.log("Begin");
        getName(session);

    } else if (!session.userData.email) {

        console.log("Name is: " + session.userData.name);
        getEmail(session);

    } else if (!session.userData.password) {

        console.log("Name is: " + session.userData.name);
        getPassword(session);

    }else if (!session.userData.five) {

        console.log("five: " + session.userData.five);

        getFive(session);

    }
    else if (!session.userData.six) {

        console.log("six: " + session.userData.six);

        getSix(session);

    }
     else if (!session.userData.seven) {

        console.log("seven: " + session.userData.seven);

        getSeven(session);

    }
    else if (!session.userData.eight) {

        console.log("eight: " + session.userData.eight);

        getEight(session);

    }
     else {

        session.userData = null;
    }

    session.endDialog();
} );


function getName(session) {

    name = session.message.text;
    session.userData.name = name;
    session.send("lowering your risk profile and preparing for retirement.");

}

function getEmail(session) {
      var re = "";
         email = session.message.text;
         session.userData.email = email;
         session.send("DISPLAY GRAPH. Let's say 7%.");
}

function getPassword(session) {
           password = session.message.text;
           session.userData.password = password;
           session.send("In terms of Kiwisaver funds, the conservative funds offer a slightly lower risk with slightly lower reward.");

}

function getFive(session) {
        five = session.message.text;
        session.userData.five = five;
        session.send("No, there isn't.");

}

function getSix(session) {
        six = session.message.text;
        session.userData.six = six;
        session.send("account unless you've met certain criteria (retirement age 65, purchasing a first home or financial hardship).");

}

function getSeven(session) {
        seven = session.message.text;
        session.userData.seven = seven;
        session.send("There is no minimum floor for investment. You can allocate a tiny portion of your balance to a fund or you can allocate the entire balance to a fund.");

}

function getEight(session) {
        eight = session.message.text;
        session.userData.eight = eight;
        session.send("yourself up. Or 3) You can just keep your account in NZ.");

}

function sendData(data, cb) {
  
  /* try {
    $conn = new PDO("sqlsrv:server = tcp:demodijo.database.windows.net,1433; Database = TestDemo", "demo123", "{dijo123}");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "demo123@demodijo", "pwd" => "{dijo123}", "Database" => "TestDemo", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:demodijo.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);*/



   /* http.get("http://local.dev/github/aplostestbot/saveData.php?name=" + data.name + "&email=" + data.email + "&password=" + data.password, function (res) {
​        var msg = '';
​        res.on("data", function (chunk) {
​            msg += chunk;
​        });

​        res.on('end', function () {
​            cb(msg);
​        });

​    }).on('error', function (e) {
​        console.log("Got error: " + e.message);
​    });*/
}
