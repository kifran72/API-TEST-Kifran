let express = require('express');
let generator = require('generate-password');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let twig = require("twig");
// let mongoose = require('mongoose');
let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api"
});

// ROUTE
app.set('views', 'public');
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('twig options', {
    strict_variables: false,
});

app.use('/vendor', express.static('public/vendor'));
app.use('/dist', express.static('public/dist'));
app.use('/less', express.static('public/less'));
app.use('/js', express.static('public/js'));

app.get('/', function (req, res) {
    res.render('index', {
        message: "Bienvenue a la racine !!"
    });
});


// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/try', function (err) {
//     if (err) { throw err; 
//         console.log("Connected!");

//     }
// });

// let usersSchema = new mongoose.Schema({
//     username: String,
//     nbr_ticket: Number,
//     img: String,
//     password: String
// });

// let usersModel = mongoose.model('users', usersSchema);



app.post('/createUser', function (req, res) {
    // let final = new usersSchema(req.body.username);
    // final.save()
    // .then(item => {
    //     res.send("item saved to database");
    //     })
    //     .catch(err => {
    //     res.status(400).send("unable to save to database");
    //     });
    //    });
    let id = req.body.id;
    let username = req.body.username;
    let nbr_tickets = req.body.nbr_tickets;
    let account_type = req.body.account_type;
    let img_url = req.body.img_url;


    let password = generator.generate({
        length: 10,
        numbers: true

    });
    let search = 'SELECT username FROM users WHERE username = ?';
    con.query(search, [username], function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        if (result.length == 0) {
            let sql = 'INSERT INTO users(id, username, password, nbr_tickets, account_type, img_url) VALUES(?,?,?,?,?,?)';
            con.query(sql, [id, username, password, nbr_tickets, account_type, img_url], function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        } else {
            console.log("Utilisateur déjà existant en BDD.");
        }



    })
});

app.listen(3000);



