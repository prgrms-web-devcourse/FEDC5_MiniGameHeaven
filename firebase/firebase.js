import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import {
  getDatabase,
  ref,
  set,
  update,
  get,
  remove,
  child,
  onChildAdded,
} from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { firebaseConfig } from '../env.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const dbRef = ref(getDatabase());

// update(ref(db, 'gameData'), {
//   game55: {
//     name: 'lpupggdate',
//     score: '100',
//   },
// });

// set(ref(db, 'gameData'), {
//   game433: {
//     name: 'yooaa',
//     score: '121',
//   },
// });

//database : 수정할 데이터베이스경로
//newDatat : 수정할 데이터 내용
export const addNewData = (database, newData) => {
  set(ref(db, database), newData);
  console.log('add후 : ');
  getData('usersData');
};

export const updateData = (database, newData) => {
  update(ref(db, database), newData);
  console.log(' updateData 후 : ');
  getData('winnerData');
};
export const deleteData = database => {
  remove(ref(db, database));
  console.log(' deleteData 후 : ');
  getData('usersData');
};
export const getData = database => {
  get(child(dbRef, database))
    .then(snapshot => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch(error => {
      console.error(error);
    });
};
