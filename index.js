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
  } else if (msg.text.includes("/")) {
    let courseCode = msg.text.replace("/", "");
    let targetQuestions = allQuestion[courseCode];
    console.log(targetQuestions);

    if (targetQuestions) {
      let arrayOfQus = "";
      targetQuestions.questions.forEach((element, index) => {
        arrayOfQus =
          arrayOfQus +
          `${index + 1}. ${element.qusName} \n ${element.driveLink}\n`;
      });

      bot.sendMessage(chatId, arrayOfQus);
    } else {
      bot.sendMessage(chatId, "Sorry no question is found...😞");
    }
  } else {
    bot.sendMessage(
      chatId,
      "I don't understand. Please use / commands only.😑"
    );
  }
});

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
