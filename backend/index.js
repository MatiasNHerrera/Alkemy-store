const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 
const dbConfig = {
    host: 'localhost',
    user: 'desarrollo',
    password: 'desarrollo',
    database: 'alkemy_store'
}

const con = mysql.createConnection(dbConfig);

con.connect( error => {

    if(error){
        res.send('Error al conectar');
    }
    else
        console.log("Sql connected...");
})

app.post('/register', (req, res) => {
        
        con.query(`INSERT INTO users (email, password, user_type) values ('${req.body.email}', '${req.body.password}', '${req.body.user_type}')`, (data) => {
            res.send(data)
        })
})

app.post('/login', (req, res) => {

        con.query(`SELECT * FROM users WHERE email='${req.body.email}' AND password='${req.body.password}'`, (error, results) => {

            if(error)
                res.send(error)
            else
                res.send(results);
        })
})

var storage = multer.diskStorage(
    {
        
        destination: '../frontend/public/uploads',
        filename: function ( req, file, cb ) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb( null, Date.now()+".jpg");
        }
    }
);

const upload = multer({ storage: storage });

app.post('/create/app',  upload.single('file'), (req, res) => {

    const { 
        file,
        body
    } = req


    const { id, name, category, price } = JSON.parse(body.form);

    let ext = new String(file.originalname).split('.')[1];

    if( ext != 'jpg' && ext != 'jpeg' && ext != 'png'){
        res.status(404).send('Extension de imagen no valida');
    }
    else{

        let date = new Date();
        let createDate = `${date.getFullYear()}-${date.getUTCMonth() === 12 ? 1 : date.getUTCMonth() + 1}-${date.getUTCDay()}`
        con.query(`INSERT INTO applications (id_user, name, category, price, image, create_date) values (${id}, '${name}', '${category}', ${price}, '${file.filename}', '${createDate}')`)
        res.send('Aplicacion agregada con exito!');
    }

})


app.get('/apps/:id', (req, res) => {

    let id = req.params.id;

    con.query(`SELECT * FROM applications WHERE id_user=${id} ORDER BY name ASC`, (error, results) => {

        if(error)
            res.send(error)
        else
            res.send(results);
    })
})

app.get('/category/:id', (req, res) => {

    con.query(`SELECT DISTINCT category FROM applications WHERE id_user=${req.params.id}`, (error, results) => {

        if(error)
            res.send(error)
        else
            res.send(results);
    })
})

app.get('/category/all', (req, res) => {

    con.query(`SELECT DISTINCT category FROM applications`, (error, results) => {

        if(error)
            res.send(error)
        else
            res.send(results);
    })
})

app.get('/app/:id', (req, res) => {

    let id = req.params.id;

    con.query(`SELECT * FROM applications WHERE id_application=${id}`, (error, results) => {

        if(error)
            res.send(error)
        else
            res.send(results);
    })
})

app.put('/modify/:id', upload.single('file'), (req, res) => {

    const { 
        file,
        body
    } = req

    let query = '';

    if(file != undefined)
        query = `UPDATE applications SET price=${req.body.price}, image='${file.filename}' WHERE id_application=${ req.params.id };`
    else
        query = `UPDATE applications SET price=${req.body.price} WHERE id_application=${ req.params.id };`


    con.query(query, (error, results) => {

        if(error)
            res.send(error)
        else
            res.send(results);
    })
})

app.delete('/delete/:id', (req, res) => {

    con.query(`DELETE FROM applications WHERE id_application=${ req.params.id }`, (error, results) => {

        if(error)
            res.send(error)
        else
            res.send(results);
    })

})


app.listen(8000);