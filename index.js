const { Client, GatewayIntentBits } = require("discord.js")
const express = require("express")

const app = express()

const client = new Client({
 intents:[
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent
 ]
})

const codigos = {}

client.once("ready",()=>{
 console.log("BOT ONLINE")
})

client.on("messageCreate",(message)=>{

 if(message.author.bot) return

 if(message.content.startsWith("!verificar")){

  const codigo = message.content.split(" ")[1]

  if(!codigo){
   message.reply("Envie o código correto.")
   return
  }

  codigos[codigo] = message.author.id

  message.reply("✅ Verificado! Volte ao jogo.")
 }

})

app.get("/check",(req,res)=>{

 const codigo = req.query.code

 if(codigos[codigo]){
  res.json({verified:true})
  delete codigos[codigo]
 }else{
  res.json({verified:false})
 }

})

app.listen(3000,()=>{
 console.log("API ONLINE")
})

client.login(process.env.TOKEN)
