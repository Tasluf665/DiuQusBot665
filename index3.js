require("dotenv").config();
const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const allQuestion = require("./questions.json");
const fs = require("fs");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text.includes("/start")) {
    bot.sendMessage(chatId, "Welcome to the DIU Questions Bank");
  } else if (msg.text.includes("/cse")) {
    let courseCode = msg.text.replace("/", "");
    let targetQuestions = allQuestion[courseCode];

    let arrayOfQus = [];
    targetQuestions.questions.forEach((element) => {
      let stream = fs.createReadStream(element.url);
      let fileOptions = {
        filename: element.qusName,
      };
      arrayOfQus.push({
        stream,
        fileOptions,
      });
    });

    let x = async (element) => {
      await bot
        .sendDocument(chatId, element.stream, {}, element.fileOptions)
        .catch((e) => console.log(e));
    };
    arrayOfQus.forEach(async (element) => {
      await x(element);
    });
  } else {
  }
});

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
