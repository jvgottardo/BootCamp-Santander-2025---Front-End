let limit = 10;       // Quantos pokemons por página
let offset = 0;       // Página inicial
let totalCount = 0;   // Total de pokemons na API
let searchTerm = ""; // Guardará o termo de pesquisa

async function getPokemons() {
  let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

   if (searchTerm) {
    // Busca direta pelo nome do Pokémon
    url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    try {
      const response = await fetch(url);
      const pokemon = await response.json();
      showPokemons([pokemon]);
      totalCount = 1;
      updatePagination();
      return;
    } catch (err) {
      alert("Pokémon não encontrado!");
      return;
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  
  totalCount = data.count;

  const promises = data.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url);
    return await res.json();
  });

  const pokemons = await Promise.all(promises);
  showPokemons(pokemons);
   updatePagination();
}

function showPokemons(pokemons) {
  const list = document.getElementById("pokedex");
  list.innerHTML = "";

  pokemons.forEach(pokemon => {
    const card = document.createElement("li");
    card.classList.add("card");
    pokemon.types.forEach(t => card.classList.add(t.type.name));

    card.innerHTML = `
      <div class="container-name-type">
        <h3>${pokemon.name.toUpperCase()}</h3>
        <div class="types">
          ${pokemon.types.map(t => `<p class="type-pokemon ${t.type.name}">${t.type.name}</p>`).join("")}
        </div>
      </div>
      <div class="container-img-id">
        <p class="id-pokemon"><strong>#${pokemon.id}</strong></p>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      </div>
    `;
        card.addEventListener("click", () => {
      window.location.href = `pokemon.html?name=${pokemon.name}`;
    });

    list.appendChild(card);
  });
}

function updatePagination() {
  const pageInfo = document.getElementById("page-info");
  pageInfo.textContent = `Mostrando ${offset + 1} - ${Math.min(offset + limit, totalCount)} de ${totalCount}`;

  document.getElementById("prev").disabled = offset === 0;
  document.getElementById("next").disabled = offset + limit >= totalCount;
}

document.getElementById("prev").addEventListener("click", () => {
  if (offset > 0) {
    offset -= limit;
    getPokemons();
  }
});

document.getElementById("next").addEventListener("click", () => {
  if (offset + limit < totalCount) {
    offset += limit;
    getPokemons();
  }
});

// Botão de pesquisa
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("search");
  searchTerm = input.value.trim();
  offset = 0; // reset paginação
  getPokemons();
});

// Pesquisa ao apertar Enter
document.getElementById("search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("search-btn").click();
  }
});


getPokemons();
