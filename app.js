const express = require ('express');
const app = express();
const path = require ('path')

const usermodel = require('./Models/user')


app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));



app.get('/',(req,res)=>{
    res.render("index");
})

app.get('/read', async (req,res)=> {
   let alluser = await usermodel.find()
   res.render("read", {users: alluser});
})

app.get('/delete/:id', async (req,res)=> {
   let alluser = await usermodel.findOneAndDelete({_id: req.params.id});
   res.redirect("/read");
})

app.post('/create', async (req,res)=>{
   let {name, email, image} = req.body;

  await  usermodel.create({
    name,
    email,
    image,
   });
    res.redirect('/read');
})

app.listen(3000);