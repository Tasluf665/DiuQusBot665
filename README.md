# DiuQusBot665

<b>Descrition</b><br>
This is a telegram bot for Daffodil Internation University students. This bot will provide all the previous questions to the students. This bot is non profitable and free to use for personal use.

<br>
<b>How to use it?</b><br>
1. Go to the telegram<br>
2. Search for @diuQuestionsBank_bot or visit https://t.me/diuQuestionsBank_bot<br>
3. Start the bot<br>
4. To get any question use predefined commands. Example: To get CSE112 Computer Fundamentals Mid term question type /cse112_mid<br>
<br>
<img src="https://github.com/Tasluf665/DiuQusBot665/blob/master/Project%20Images/Screenshot%20from%202022-12-26%2012-52-03.png">
<img src="https://github.com/Tasluf665/DiuQusBot665/blob/master/Project%20Images/Screenshot%20from%202022-12-26%2012-53-25.png">

<br>
<b>How to add new question?</b><br>
1. Make a pdf of the question. No other format will be allowed.<br>
2. Rename the question into CourseCode_Term_ExamType_Shift_CourseTitle.pdf this format. Example: CSE112_Fall2022_Mid_Day_Computer Fundamentals.pdf<br>
3. Upload the question into https://drive.google.com/drive/folders/1cbXs6sTvK6gmxko5Wu7MtzM7JtvCwhRQ?usp=sharing this drive link.<br>
4. Add the new question into questions.json file. This file is located into the master branch<br>
5. Send pull request for the update.<br>
<br>
<br>
<h2>Requirement</h2><br>
1. Nodejs<br>
2. Telegram account<br>
3. Server for Hosting.<br>
<br>
<h2>Dependence</h2><br>
1. Express<br>
2. node-telegram-bot-api<br>
3. dotenv<br>
<br>

<h2>Project workflow description</h2><br>
<b>Create the bot</b><br> 
1. Go the telegram<br>
2. Search for BotFather<br>
3. /start<br>
4. /newbot - create a new bot<br>
5. Choose a name for the bot. Example: DIU Questions Bank<br>
6. Choose a username for the bot. Example: diuQuestionsBank_bot<br>
7. Copy the token to access the HTTP API. Example: 59726595.............<br>
8. /setcommands<br>
9. Select the @diuQuestionsBank_bot<br>
10. Send the command description. <br>
Example:<br> 
help - Help<br>
add_question - Request to add a question<br>
cse112_mid - Computer Fundamentals<br>
cse112_final - Computer Fundamentals<br>
cse421_final - Computer Graphics<br>

<br><b>Create the server</b><br> 
``` 
npm init -y
```
``` 
npm i node-telegram-bot-api express dotenv
```
Create .env file and paste the token from BotFather.
```
TELEGRAM_BOT_TOKEN=59726595.............
PORT=3007
NTBA_FIX_319=1
```
Create the .gitignore file
```
/node_modules
.env
```
Create the server
```nodejs
require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
```

Create the questions.json file
```nodejs
{
  "cse421_final": {
    "name": "Computer Graphics",
    "questions": [
      {
        "qusName": "CSE421_Summer2022_Final_Day_Computer Graphics.pdf",
        "semester": "Summer",
        "year": "2022",
        "shift": "Day",
        "type": "final",
        "driveLink": "https://drive.google.com/file/d/1y356EB5RSGos6qsT8fX78i16Mix-_hjU/view"
      }
    ]
  }
}
```
Create the telegram bot
```nodejs
require("dotenv").config();
const express = require("express");
const app = express();
const TelegramBot = require("node-telegram-bot-api");
const allQuestion = require("./questions.json");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
```
Define diffrenet routes
```nodejs
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome to the DIU Questions Bank");
});
```
```nodejs
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Use your course code and enter the qus type. Ex: /cse112_mid to get the questions"
  );
});
```
```nodejs
bot.onText(/\/add_question/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Send your question into this email: tasluf665@gmail.com"
  );
});
```
```nodejs
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
```
```nodejs
bot.on("message", (msg) => {
  if (msg.text[0] !== "/") {
    bot.sendMessage(
      msg.chat.id,
      "I don't understand. Please use / commands only.😑"
    );
  }
});

```
Finally run the project<br>
```nodejs
node index.js
```













