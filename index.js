import dotenv from 'dotenv';
import TelegramBot from "node-telegram-bot-api";
// import axios from "axios";
import express from "express";

const app = express();
dotenv.config();

const port = 3000;
app.listen(port, () => {
    // res.Send("Working!");
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/" , (req,res)=>{
    res.send("working!!!");
})

// const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN ; 
const bot = new TelegramBot(token , {polling : true});
// const chatId = msg.chat.id;


bot.on('message', async (msg) => {
    // sendMessage : method to send the message .
    var Hi = "hi";
    if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id, `Hello dear ${msg.from.first_name}.How can i help you.Currently I have limited features so i may be not of that great help`);
    };

    var bye = "bye";
    if (msg.text.toString().toLowerCase().includes(bye)) {
        bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }

    var status = "check status";
    if (msg.text.toString().toLowerCase().indexOf(status) === 0) {
    bot.sendMessage(msg.chat.id , "The feature is currently not working. Please try after few hours.");
    }

  
})

// onText : method to perform a specific function if the message contains the mentioned text , takes 2 parameters : required text  and a callback function.
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id,"Welcome to the first bot created by Harsh Jawajiwar.\nType '/sendpic' to get a random photo from internet" , {
       "reply_markup" : { 
        "keyboard" : [["Hi" , "Check Status"] , ["/sendpic"] , ["bye"]]
       } 
    });
});


bot.onText(/\/sendpic/, (msg) => {
    bot.sendPhoto(msg.chat.id,"https://source.unsplash.com/random" ,{caption : "Here we go ! \nThis is a caption for the image "} );
});

