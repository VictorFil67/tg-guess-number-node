import TelegramBot from "node-telegram-bot-api";
import express from "express";
import cors from "cors";
import "dotenv/config";

const { TOKEN, PORT = 5000 } = process.env;
const webAppUrl = "https://victorfil67.github.io/tg-guess-number-react/";

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(express.json());
app.use(cors());

let randomNumber;

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;
//   const number = Number(text);
//   const from = msg.from.first_name;
//   console.log(msg);

//   if (text === "/start") {
//     randomNumber = Math.floor(Math.random() * 10);
//   }
//   if (number < randomNumber) {
//     bot.sendMessage(
//       chatId,
//       `You lost. Your ${number} is less then ${randomNumber}`
//     );
//   } else if (number === randomNumber) {
//     bot.sendMessage(
//       chatId,
//       `You won. Your  ${number} is equal ${randomNumber}`
//     );
//   } else if (number > randomNumber) {
//     bot.sendMessage(
//       chatId,
//       `You lost. Your  ${number} is more then ${randomNumber}`
//     );
//   } else {
//     bot.sendMessage(chatId, `Please enter the number!`);
//   }
//   console.log(randomNumber);
// });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Отправка сообщения с кнопкой для открытия игры
  bot.sendMessage(chatId, "Натисніть кнопку, щоб грати в гру 'Вгадай число'", {
    reply_markup: {
      inline_keyboard: [[{ text: "Грати", web_app: { url: webAppUrl } }]],
    },
  });
});

// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
