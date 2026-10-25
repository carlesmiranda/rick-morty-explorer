import './style.css'

async function getData() {
  try {
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();

    console.log(data);
    
  } catch (error) {
    console.error(error);
  }
}


getData();