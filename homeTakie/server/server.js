const express=require('express')
const http=require('http')
const { Server } = require('socket.io')
const app=express()
const cors=require('cors')
app.use(cors({origin: ['http://localhost:5173']}))
const mongoose=require('mongoose')
// mongoose.connect('mongodb://localhost/homeTakie').then(()=>console.log('connected to db'))
mongoose.connect('mongodb+srv://pratham:kePtac-hocsy5-memqih@mydatabase.l2rhznt.mongodb.net/homeTakie')
const message=require('./model/messageSchema')
const userSchema = require('./model/userSchema')
app.use(express.json())

app.get('/',async (req,res)=>{
    console.log('getting messages')
    const data=await message.find()
    res.send(data)
})

app.post('/login',async (req,res)=>{
    const username= req.body?.username;
    const pass=req.body?.password;

    if((!username) || (!pass)){
        res.json({message: 'invalid input'})
    }

    const data=await userSchema.findOne({username, pass})
    console.log(data)
    if(data){
        res.json({message: 'user authenticated'})
    }
    else{
        res.json({message: 'invalid user'})
    }
})

const server=http.createServer(app)

const io=new Server(server,{
    cors:{origin: ['http://localhost:5173']},
})

io.on('connection',(socket)=>{
    console.log('new user connected '+socket.id)
    socket.on('message',async (data)=>{
        const tempMessage=new message({message: data.message})
        await tempMessage.save()
        socket.broadcast.emit('receive',data)
    })
})


server.listen('3000',()=> console.log('server is running on port 3000'))