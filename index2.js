require("dotenv").config();
const express = require("express");
const app = express();
const { Telegraf } = require("telegraf");
const allQuestion = require("./questions.json");
const fs = require("fs");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
bot.launch();

bot.on("text", async (ctx) => {
  const chatId = ctx.message.chat.id;

  if (ctx.message.text.includes("/start")) {
    ctx.reply("Welcome to the DIU Questions Bank");
  } else {
    let courseCode = ctx.message.text.replace("/", "");
    let targetQuestions = allQuestion[courseCode];

    targetQuestions.questions.forEach(async (element) => {
      let stream = await fs.createReadStream(element.url);

      await ctx.sendDocument({
        source: stream,
        filename: element.qusName,
      });

      // await ctx.telegram.sendMessage(chatId, "Hello");
    });
  }
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;

//   if (msg.text.includes("/start")) {
//     bot.sendMessage(chatId, "Welcome to the DIU Questions Bank");
//   } else if (msg.text.includes("/cse")) {
//     let courseCode = msg.text.replace("/", "");
//     let targetQuestions = allQuestion[courseCode];

//     targetQuestions.questions.forEach((element) => {
//       let stream = fs.createReadStream(element.url);
//       let fileOptions = {
//         filename: element.qusName,
//       };
//       console.log(element.url);
//       bot.sendDocument(chatId, stream, {}, fileOptions);
//     });
//   } else {
//   }
// });

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
