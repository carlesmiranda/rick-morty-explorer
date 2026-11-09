const charactersList = document.createElement('ul');
const statusApp = document.createElement('p');
const API_URL = 'https://rickandmortyapi.com/api/character'


function createStructure() {
  const app = document.querySelector('.app');
  const header = document.createElement('header');
  const title = document.createElement('h1');  
  const labelForm = document.createElement('label'); 
  const buscarBtn = document.createElement('button');
  const form = document.createElement('form');
  const buscador = document.createElement('input');

  const labelFilter = document.createElement('label');
  const select = document.createElement('select');
  
  const options = [
    {
      value: '',
      label: 'Todos'
    },
    {
      value: 'alive',
      label: 'Vivos'
    },
    {
      value: 'dead',
      label: 'Muertos'
    },
    {
      value: 'unknown',
      label: 'Desconocido'
    },
  ];

  title.textContent = 'Rick and Morty Explorer';
  statusApp.classList.add('mensaje');
  statusApp.setAttribute('aria-live', 'polite');
  charactersList.classList.add('lista-personajes');
  buscador.setAttribute('type', 'search');
  buscador.setAttribute('id', 'buscador');
  labelForm.setAttribute('for', 'buscador');
  labelForm.textContent = 'Busca un personaje';
  buscarBtn.setAttribute('type', 'submit');
  buscarBtn.textContent = 'Buscar';

  labelFilter.setAttribute('for', 'filter');
  labelFilter.textContent = 'Estado'
  select.setAttribute('id', 'filter');

  options.forEach(o => {
    const optionElement = document.createElement('option');
    optionElement.value = o.value;
    optionElement.textContent = o.label;
    select.append(optionElement);
  });

  app.append(header, form ,statusApp, charactersList);
  header.append(title);
  form.append(labelForm, buscador, labelFilter, select, buscarBtn);
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const characterSearch = buscador.value.trim();
    const estado = select.value;
    getData(characterSearch, estado);
  } )
}

async function getData(name = '', status= '') {
  try {      
    statusApp.textContent = 'Cargando...';

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);

    const query = params.toString();
    const url = query ? `${API_URL}?${query}` : `${API_URL}`;    
    
    const res = await fetch(url);

    if (res.status === 404) {
      charactersList.replaceChildren();    
      statusApp.textContent = 'No se han encontrado personajes'
      return;
    }

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const data = await res.json();    
    
    const characters = data.results;
    const charactersData = transformData(characters);

    drawCharacters(charactersData);
    statusApp.textContent = '';

  } catch (error) {
    console.error('Error: ', error);
    statusApp.textContent = 'No se han podido cargar los personajes';
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
