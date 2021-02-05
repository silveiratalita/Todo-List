import axios from 'axios';

async function getCatFacts() {
  const res = await axios.get(
    `https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=3`
  );
  return res.data.map(e => e.text);
}

export default getCatFacts;
