const charactersList = document.createElement('ul');
const statusApp = document.createElement('p');

function createStructure() {
  const app = document.querySelector('.app');
  const header = document.createElement('header');
  const title = document.createElement('h1');  

  title.textContent = 'Rick and Morty Explorer';
  statusApp.classList.add('mensaje');
  statusApp.setAttribute('aria-live', 'polite');
  charactersList.classList.add('lista-personajes');

  app.append(header, statusApp, charactersList);
  header.append(title);  
}

async function getData() {
  try {    
    statusApp.textContent = 'Cargando...';
    const res = await fetch('https://rickandmortyapi.com/api/character');
    const data = await res.json();    
    
    const characters = data.results;
    const charactersData = transformData(characters);

    drawCharacters(charactersData);
    statusApp.textContent = '';

  } catch (error) {
    console.error(error);
  }
}

function transformData(results) {
  const resultsData = results.map((r) => ({
        id: r.id,
        name: r.name,
        image: r.image,
        species: r.species,
        status: r.status
  }))

  return resultsData;
}


function createCard(characterData) {  
  //Crear
  const card = document.createElement('li');
  const name = document.createElement('h2');
  const status = document.createElement('p');
  const species = document.createElement('p');
  const img = document.createElement('img');

  //Rellenar
  card.classList.add('card');
  img.src = characterData.image;
  img.alt = characterData.name;
  name.textContent = characterData.name;
  status.textContent = `Status: ${characterData.status}`;
  species.textContent = `Species: ${characterData.species}`;

  //Meter los hijos dentro del contenedor
  card.append(img, name, status, species);
  
  return card;  
}

function drawCharacters(characters) {
  charactersList.replaceChildren();
  characters.forEach(c => {
    charactersList.append(createCard(c));    
  });
}

createStructure();
getData();
