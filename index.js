//require('babel-polyfill')
import express from 'express';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';
import cors from 'cors';

import GetPcComponent from './GetPcComponent';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {}; // получаем обьект по ссылке pcUrl для обработки.
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Что-то пошло не так:', err);
  });

app.get('/task3A/', async (req, res) => {
  return await res.json(pc);
});

app.get('/task3A/volumes/', async (req, res) => {
  const response = 'volumes';
  return await res.json(GetPcComponent(pc,response))
});

app.get(/.+/, async (req, res) => {
  const response = req.path;
  let answer = GetPcComponent(pc, response);
  if (answer !== false) return await res.json(answer); //если НЕ ошибка - отслыаем ответ
  res.send("Not Found" , 404); //если вернулась ошибка, возвращаем Not Found и статус 404
});

app.listen(3000, () => {
  console.log('Your app listening3000! V113 itog');
});