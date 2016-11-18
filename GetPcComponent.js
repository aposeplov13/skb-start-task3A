//V113 itog
import _ from 'lodash';

export default function GetPcComponent(pc, response) {
   if (response == 'volumes') {
       return GetHddVolumes(pc);
   } else {
       return GetComponent(pc, response);;
       
   }
}

function GetComponent(pc, newpath) {
  let path = newpath; // получаем путь запроса. console.log('zapros-' + path);
  path = path.replace(/.*task3A\//i,""); //убираем ссылку task3a
  path = path.split(/\//); // создаем переменую путь для поиска в обьекта по вложенным параметрам. console.log('path: ' + path); 
  path = _.compact(path); // убираем пустые элементы на случай после split (hdd/). console.log('new path2: ' + path);
  let newpc = _.get(pc, path);// получаем с помощью lodash вложеный обьект. console.log('newpc: '+ newpc);
  
  if (newpc === undefined) { // проверка на ошибки res.send("Not Found" , 404);
     return false;
  }

  if ((pc.hasOwnProperty(path) == false) && (path[path.length - 1] == 'length')){ // проверка на hdd.length. Решение с помощью проверки есть ли свойство и проверки на последнего элемента пути
   // на наличие спец. симлова length. console.log('Not Found');
     return false;
  } else {  // Передача параметров по основным запросам пользователя, после получения элементов используя метод lodash (_.get)console.log('else ' + newpc);
     return newpc;
    }
}

function GetHddVolumes(pc) {
  let newpc = {}; //создаем пустой обьект
  pc.hdd.map( (element) => { //Проходимся по массиву и заносим данные в обьект. Первые проходы по Else
    if (newpc[element.volume]) {
       newpc[element.volume] += element.size;
    } else {
           newpc[element.volume] = element.size;
      } 
  });
    for (let i in newpc) { //дописываем симлов B к размеру дисков(байт)
          newpc[i] += 'B';
    }
     return newpc;
}