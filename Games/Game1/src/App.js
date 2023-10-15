import Header from './Header.js';

const $ = document;
export default function App({ $target }) {
  console.log(`hello game1`);
  new Header({ $target });
}
