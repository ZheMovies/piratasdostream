const apiKey = '6fef90efb83322056c9bf84cdde87872'; 

const mediaList = [
    { type: 'movie', id: 89623, link: "https://t.me/c/1792165409/50010/50017" },
    { type: 'movie', id: 912649, link: "https://t.me/c/1792165409/50010/50017" },
    { type: 'movie', id: 858414, link: "https://t.me/c/1792165409/50010/50017" },
    { type: 'movie', id: 1362670, link: "https://t.me/c/1792165409/50010/50016" },
    { type: 'movie', id: 1022789, link: "https://t.me/c/1792165409/50010/50015" },
    { type: 'movie', id: 550, link: "https://t.me/c/1792165409/50010/50013" },
    { type: 'tv', id: 1399, link: "https://t.me/seu_link_aqui" },
    { type: 'tv', id: 1379, link: "https://t.me/seu_link_aqui" },
    { type: 'tv', id: 93405, link: "https://t.me/seu_link_aqui" }
];

// Função para buscar dados da API TMDB
async function fetchMediaData(type, id) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da mídia:', error);
        return null;
    }
}

// Função para adicionar os cards de mídia à página
async function addMedia(mediaArray) {
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = '';

    for (let i = 0; i < mediaArray.length; i++) {
        const media = mediaArray[i];
        const data = await fetchMediaData(media.type, media.id);
        if (!data || data.status_code) continue;

        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');
        mediaItem.innerHTML = `
            <h3>${data.title || data.name}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title || data.name}">
            <button onclick="location.href='detalhes.html?id=${media.id}&type=${media.type}&link=${encodeURIComponent(media.link)}'">Acessar</button>
        `;
        mediaContainer.appendChild(mediaItem);
    }
}

// Função de pesquisa
function setupSearch() {
    document.getElementById("searchButton").addEventListener("click", function() {
        const searchQuery = document.getElementById("search").value.toLowerCase();
        const mediaItems = document.querySelectorAll(".media-item");

        mediaItems.forEach(function(item) {
            const title = item.querySelector("h3").innerText.toLowerCase();
            item.style.display = title.includes(searchQuery) ? "block" : "none";
        });
    });
}

// Função para mostrar a caixa de sugestões
function showSuggestionBox() {
    const suggestionBox = document.getElementById("suggestion-box");
    suggestionBox.classList.remove("hidden");

    document.getElementById("yes-suggestion").addEventListener("click", function() {
        suggestionBox.classList.add("hidden");
        suggestRandomMedia();
    });

    document.getElementById("no-suggestion").addEventListener("click", function() {
        suggestionBox.classList.add("hidden");
        addMedia(mediaList);
    });
}

// Função para sugerir 5 ou 6 mídias aleatórias do script
function suggestRandomMedia() {
    const shuffled = mediaList.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 6);
    addMedia(selected);
}

// Inicializa a página
document.addEventListener("DOMContentLoaded", function() {
    showSuggestionBox();
    setupSearch();
});