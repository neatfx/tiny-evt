import { db } from './db'

const lineByLine = require('n-readlines');

var duplicates=0, addedRecords=0, splitter;
const liner = new lineByLine('./data.txt');
let line, lineNumber = 0;

db.transaction('rw', db.friends, async () => {
  while (line = liner.next()) {
      splitter = line.toString().split('<|>');
      await db.friends.add({
      name: splitter[0],
      quality: splitter[1],
      issue: splitter[2]
    }).then(function(){
      addedRecords++
      lineNumber++;
    }).catch(function (e) {
      console.log(e.message);
      duplicates++;
      lineNumber++;
    });
  }
}).then(function(){
  //use when you are using a web worker
  postMessage("Duplicates " + duplicates.toString() + " Added " + addedRecords.toString());
}).catch(error => {
  console.error(error);
});