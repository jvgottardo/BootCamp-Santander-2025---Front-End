async function getPokemon() {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  if (!name) return;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const pokemon = await response.json();
    showPokemonDetails(pokemon);
  } catch (err) {
    document.getElementById("pokemon-details").innerHTML = "<p>Pokémon não encontrado!</p>";
  }
}

function showPokemonDetails(pokemon) {
  const container = document.getElementById("pokemon-details");
  container.innerHTML = `
    <h1>${pokemon.name.toUpperCase()} (#${pokemon.id})</h1>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><strong>Tipos:</strong> ${pokemon.types.map(t => t.type.name).join(", ")}</p>
    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
    <p><strong>Habilidades:</strong> ${pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
    <p><strong>Stats:</strong></p>
    <ul>
      ${pokemon.stats.map(s => `<li>${s.stat.name}: ${s.base_stat}</li>`).join("")}
    </ul>
  `;
}

// Carrega os detalhes ao abrir a página
getPokemon();
