const express = require('express');
const app = express();
const port = 3000;
const config = require('./knexfile').development;
const db = require('knex')(config);
const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({extended: false}));


let bcrypt = require('./helpers/bcrypt');
let check = require('./helpers/check');

app.get('/', (req, res) => {
    db('products').select('*').then(e => {
        res.json(e)
    });
});

app.post('/users', async (req,res) => {

    const password = await bcrypt(req.body.password);

    db('users').insert({
        name: req.body.name,
        email: req.body.email,
        password
    }).then(e => {
        db('users').where('id',e).then(e => res.json(e));
    });

})

app.post('/login', async (req,res) => {
    const {email,password} = req.body;

    const hash = await db('users').where('email',email).then(e => e);

    if(await check(password,hash[0].password)) {
       const token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: hash
       }, 'eb13fb26f22f8340087c300ea9e9956c');
        db('sessions').insert({
            user_id: hash[0].id,
            name: hash[0].name,
            token
        }).then(e => {});
       res.status(200).json({
           token,
           user: hash[0]
       });

    } else {
        res.status(401).json({
            message: "Credenciais do usuário não confere"
        })
    }

});

app.get('/me', async (req,res) => {
    const token = req.headers.authorization.replace('Bearer ',''); 
    res.json(...jwt.verify(token, 'eb13fb26f22f8340087c300ea9e9956c').data)
})

app.post('/logout', async (req,res) => {
   const token = req.headers.authorization.replace('Bearer ',''); 
   await db('sessions').where('token',token).del();
})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
