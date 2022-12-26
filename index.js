require("dotenv").config();
const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const allQuestion = require("./questions.json");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the DIU Questions Bank");
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Use your course code and enter the qus type. Ex: /cse112_mid to get the questions"
  );
});

bot.onText(/\/add_question/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Go to GitHub: https://github.com/Tasluf665/DiuQusBot665\nOr Send your question into this email: tasluf665@gmail.com"
  );
});

bot.onText(/\//, (msg) => {
  if (
    msg.text === "/start" ||
    msg.text === "/add_question" ||
    msg.text === "/help"
  ) {
  } else {
    let courseCode = msg.text.replace("/", "");
    let targetQuestions = allQuestion[courseCode];

    if (targetQuestions) {
      let arrayOfQus = "";
      targetQuestions.questions.forEach((element, index) => {
        arrayOfQus =
          arrayOfQus +
          `${index + 1}. ${element.qusName} \n ${element.driveLink}\n`;
      });

      bot.sendMessage(msg.chat.id, arrayOfQus);
    } else {
      bot.sendMessage(msg.chat.id, "Sorry no question is found...😞");
    }
  }
});

bot.on("message", (msg) => {
  if (msg.text[0] !== "/") {
    bot.sendMessage(
      msg.chat.id,
      "I don't understand. Please use / commands only.😑"
    );
  }
});

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
