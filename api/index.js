const express = require('express');

const app = express();

const predictions = [
  'Несомненно, всё получится.',
  'Звёзды говорят: да.',
  'Впереди приятный сюрприз.',
  'Смело двигайся к цели.',
  'Похоже, удача на твоей стороне.',
  'Скорее да, чем нет.',
  'Ответ пока неясен — спроси позже.',
  'Сейчас лучше подождать.',
  'Всё зависит от твоего следующего шага.',
  'Не торопись с выводами.',
  'Сегодня обстоятельства не в твою пользу.',
  'Пожалуй, это не лучшая идея.',
  'Шар советует выбрать другой путь.',
  'Не рассчитывай на это.',
];

app.use(express.json());

app.post('/api/predict', (req, res) => {
  const question = req.body && req.body.question;

  if (typeof question !== 'string' || question.trim() === '') {
    return res.status(400).json({ error: 'Введите вопрос.' });
  }

  const answer = predictions[Math.floor(Math.random() * predictions.length)];
  return res.json({ question: question.trim(), answer });
});

module.exports = app;
