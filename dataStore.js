import dummyData from './dummy.json' assert { type: 'json' };

// export default function dataFetch() {
//   // console.log(dummyData);
//   const getDataFromFireBase = async () => {
//     console.log(`run`);
//     try {
//       const data = await fetch(
//         'https://minigameheaven-73ea2-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json'
//       );
//       console.log(data.json());
//       return data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

const getDataFromFireBase = async () => {
  const BASE_URL =
    'https://minigameheaven-73ea2-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json';
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getDataFromFireBase;
