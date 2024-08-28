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

let games = {};

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  bot.sendMessage(chatId, "Натисніть кнопку, щоб грати в гру 'Вгадай число'", {
    reply_markup: {
      inline_keyboard: [[{ text: "Грати", web_app: { url: webAppUrl } }]],
    },
  });
});

app.post("/guess", (req, res) => {
  const { chatId, guess } = req.body;

  if (!games[chatId]) {
    return res.status(400).json({
      message:
        "Гра не знайдена. Використовуйте команду /start, щоб почати нову гру.",
    });
  }

  const game = games[chatId];
  game.attempts += 1;

  if (guess < game.number) {
    res.json({ result: "Загадане число більше" });
  } else if (guess > game.number) {
    res.json({ result: "Загадане число менше" });
  } else {
    res.json({ result: "Число вгадано!", attempts: game.attempts });
    delete games[chatId];
    console.log(chatId);
  }
});

app.post("/start_game", (req, res) => {
  const chatId = req.body.chatId;

  const randomNumber = Math.floor(Math.random() * 100) + 1;
  games[chatId] = { number: randomNumber, attempts: 0 };

  res.json({ message: "Нова гра розпочата!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
