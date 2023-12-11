import dummyData from './dummy.json' assert { type: 'json' };

export default function dataFetch() {
  console.log(dummyData);
  const getDataFromFireBase = async () => {
    try {
      const data = await fetch(
        'https://minigameheaven-73ea2-default-rtdb.asia-southeast1.firebasedatabase.app/userData.json'
      );
      console.log(data.json());
      return data;
    } catch (error) {
      console.log(error);
    }
  };
}
