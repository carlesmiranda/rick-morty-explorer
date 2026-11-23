import './style.css';

const charactersList = document.createElement('ul');
const statusApp = document.createElement('p');
const summary = document.createElement('p');
const API_URL = 'https://rickandmortyapi.com/api/character'


function createStructure() {
  const app = document.querySelector('.app');
  const header = document.createElement('header');
  const title = document.createElement('h1');  
  const labelForm = document.createElement('label'); 
  const searchBtn = document.createElement('button');
  const form = document.createElement('form');
  const searchInput = document.createElement('input');

  const labelFilter = document.createElement('label');
  const select = document.createElement('select');
  
  const options = [
    {
      value: '',
      label: 'All'
    },
    {
      value: 'alive',
      label: 'Alive'
    },
    {
      value: 'dead',
      label: 'Dead'
    },
    {
      value: 'unknown',
      label: 'Unknown'
    },
  ];

  title.textContent = 'Rick and Morty Explorer';
  statusApp.classList.add('message');
  statusApp.setAttribute('aria-live', 'polite');
  summary.classList.add('summary');
  charactersList.classList.add('characters-list');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('id', 'searchInput');
  labelForm.setAttribute('for', 'searchInput');
  labelForm.textContent = 'Search a character';
  searchBtn.setAttribute('type', 'submit');
  searchBtn.textContent = 'Search';

  labelFilter.setAttribute('for', 'filter');
  labelFilter.textContent = 'Status'
  select.setAttribute('id', 'filter');

  options.forEach(o => {
    const optionElement = document.createElement('option');
    optionElement.value = o.value;
    optionElement.textContent = o.label;
    select.append(optionElement);
  });

  app.append(header, form ,statusApp, summary ,charactersList);
  header.append(title);
  form.append(labelForm, searchInput, labelFilter, select, searchBtn);
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const characterSearch = searchInput.value.trim();
    const status = select.value;
    getData(characterSearch, status);
  } )
}

async function getData(name = '', status= '') {
  try {      
    statusApp.textContent = 'Loading...';
    summary.textContent = '';

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);

    const query = params.toString();
    const url = query ? `${API_URL}?${query}` : API_URL;    
    
    const res = await fetch(url);

    if (res.status === 404) {
      charactersList.replaceChildren();    
      statusApp.textContent = 'No characters found';      
      return;
    }

    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    
    const data = await res.json();    
    
    const characters = data.results;
    const charactersData = transformData(characters);

    drawCharacters(charactersData);
    const counterByStatus = countByStatus(charactersData);
    displaySummary(counterByStatus);

    statusApp.textContent = '';
    

  } catch (error) {
    console.error('Error: ', error);
    statusApp.textContent = 'Could not load characters';
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
  //Create elements
  const card = document.createElement('li');
  const name = document.createElement('h2');
  const status = document.createElement('p');
  const species = document.createElement('p');
  const img = document.createElement('img');

  //Add classes and content
  card.classList.add('card');
  img.src = characterData.image;
  img.alt = characterData.name;
  name.textContent = characterData.name;
  status.textContent = `Status: ${characterData.status}`;
  species.textContent = `Species: ${characterData.species}`;

  //Append elements to card
  card.append(img, name, status, species);
  
  return card;  
}

function drawCharacters(characters) {
  charactersList.replaceChildren();
  characters.forEach(c => {
    charactersList.append(createCard(c));    
  });
}

function countByStatus(characters) {
  return characters.reduce((acc, c) => {
    acc[c.status] = (acc[c.status] || 0) + 1;
    return acc;
  }, {});  
}

function displaySummary(count) {
  summary.textContent = `On this page: ${count.Alive || 0} alive · ${count.Dead || 0} dead · ${count.unknown || 0} unknown`
}

createStructure();
getData();
