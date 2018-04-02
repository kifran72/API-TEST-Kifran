
module.exports = function (app, session, passport, generator, con) {

    // Default route, si session.connected est false alors rediriger vers la page login.html sinon rediriger vers index.html
    app.get('/', function (req, res) {
        if (!req.session.connected) return res.render('users/login', {
            message: 'Bienvenue'
        });
        return res.render('index', {
            message: 'Bienvenue',
            account_type: req.session.account_type
        });
    });


    // Création de la route "/login" pour récuperer ses informations, test si session.connected == true alors redirige vers la racine ('/')
    app.get('/login', function (req, res) {
        if (req.session.connected) return res.redirect('/');

        return res.render('users/login', {
            message: 'Bienvenue'
        });

    });

    // Creation de la route '/login' pour envoyer des information sur cette route, récuperation des info du formulaire login.html et 
    // recherche dans la base de donnée si il existe pour permettre la connexion
    // Atribution de session.connected et session.account_type pour permettre de envoyer le client au bonne endroit 
    app.post('/login', function (req, res) {
        let username = req.body.username;
        let password = req.body.password;

        let search = 'SELECT * FROM users WHERE username = ? AND password = ?';
        con.query(search, [username, password], function (err, result, fields) {
            if (err) throw err;
            if (result.length != 0) {
                req.session.connected = true;
                req.session.username = username;
                req.session.account_type = result[0].role;

                return res.send({
                    username: username,
                    success: true,
                })
            }
            return res.send({
                success: false
            })
        })
    });

    // déconnexion
    app.get('/logout', function (req, res) {
        if (!req.session.connected) return res.render('users/login', {
            message: 'Bienvenue'
        });
        req.session.destroy(function (err) {
            if (err) throw err;
            return res.render('users/login', {
                message: 'Bienvenue'
            });

        })
    });

    // Récuperation des données de l'API traiter par la page gestionUser.html et test dans la base si il existe sinon inscription et generation de mot de passe aléatoirement
    app.post('/createUser', function (req, res) {
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
                    return res.send({
                        id: id,
                        success: true,
                        message: "Utilisateur crée !"
                    });
                });
            } else {
                console.log("Utilisateur déjà existant en BDD.");
                return res.send({
                    id: id,
                    success: false,
                    message: "Utilisateur déjà existant en BDD."
                });
            }
        })
    });
}
