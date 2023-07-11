const dotenv = require('dotenv');
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require('express');


const app = express();
require('dotenv').config();

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



// bot.on("message" , async(msg)=>{
//      const chatId = msg.chat.id;
//      const userInput = msg.text;

//      try{
//         const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=4e6b91716ecd578a25e6824cc084fea2`);
//         const data = response.data;
//         const weather = data.weather[0].description;
//         const temperature = data.main.temp -273.15;
//         const city = data.name;
//         const humidity = data.main.humidity;
//         const pressure = data.main.pressure;
//         const windSpeed = data.wind.speed;
//         const message =  `The weather in ${city} is ${weather} with a temperature of ${temperature.toFixed(2)}°C.\nThe humidity is ${humidity}%,\n the pressure is ${pressure}hPa,\n and the wind speed is ${windSpeed}m/s.`;
//     bot.sendMessage(chatId , message);
// }catch(error){
//     bot.sendMessage(chatId , "city does not exist");
// }
// });


// const chatId = msg.chat.id;
// bot.on('message', async (msg) => {

    // sendMessage : method to send the message .

//     var Hi = "hi";
//     if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
//     bot.sendMessage(msg.chat.id, `Hello dear ${msg.from.first_name}.How can i help you.Currently I have limited features so i may be not of that great help`);
//     };

//     var bye = "bye";
//     if (msg.text.toString().toLowerCase().includes(bye)) {
//         bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
//     }

//     var status = "check status";
//     if (msg.text.toString().toLowerCase().indexOf(status) === 0) {
//     bot.sendMessage(msg.chat.id , "The feature is currently not working. Please try after few hours.");
//     }
// })

// onText : method to perform a specific function if the message contains the mentioned text , takes 2 parameters : required text  and a callback function.
// bot.onText(/\/start/, (msg) => {
//     bot.sendMessage(msg.chat.id,"Welcome to the first bot created by Harsh Jawajiwar.\nType '/sendpic' to get a random photo from internet" , {
//        "reply_markup" : { 
//         "keyboard" : [["Hi" , "Check Status"] , ["/sendpic"] , ["bye"]]
//        } 
//     });
// });


// bot.onText(/\/sendpic/, (msg) => {
//     bot.sendPhoto(msg.chat.id,"https://source.unsplash.com/random" ,{caption : "Here we go ! \nThis is a caption for the image "} );
// });



// 
// Main code starts here : 

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `Welcome at <b>WeatherBot</b>, thank you for using my service
      
  Available commands:
  
  <b>/weather City_Name</b>  :  shows weather for selected city\n\nReplace <b>City_Name</b> with city of your choice`, {
        parse_mode: "HTML"
      }
    );
  });


  bot.onText(/\/weather/,async (msg, match) => {
    const chatId = msg.chat.id;
    const city = match.input.split(' ')[1];
  
    if (city === undefined) {
      bot.sendMessage(
        chatId,
        `Please Enter correct city name\n OR \n Enter the command as <b>/weather City_Name</b>.\n Replace <b>City_Name</b> with city of your choice`, {
            parse_mode: "HTML"
          }
      );
      return;
    }
    // const chatId = msg.chat.id;
    // const userInput = msg.text;
    try{
       const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e6b91716ecd578a25e6824cc084fea2`);
       const data = response.data;
       const weather = data.weather[0].description;
       const temperature = data.main.temp -273.15;
       const City = data.name;
       const humidity = data.main.humidity;
       const pressure = data.main.pressure;
       const windSpeed = data.wind.speed;
       const message =  `The weather in ${City} is ${weather} with a temperature of ${temperature.toFixed(2)}°C.\nThe humidity is ${humidity}%,\n the pressure is ${pressure}hPa,\n and the wind speed is ${windSpeed}m/s.`;
   bot.sendMessage(chatId , message);
}catch(error){
   bot.sendMessage(chatId , "city does not exist");
  }});