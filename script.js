const apiKey = '6fef90efb83322056c9bf84cdde87872'; // Sua chave API TMDB
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

// Função para buscar os dados da API TMDB
async function fetchMediaData(type, id) {
    try {
        const response = await fetch(https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=pt-BR);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da mídia:', error);
        return null;
    }
}

// Função para filtrar por gênero
async function filterByGenre(genreId) {
    const filteredMedia = [];
    for (let i = 0; i < mediaList.length; i++) {
        const media = mediaList[i];
        const data = await fetchMediaData(media.type, media.id);
        if (!data || data.status_code) continue;

        const genreIds = media.type === 'movie' ? data.genres.map(genre => genre.id) : data.genres_ids;
        if (genreIds.includes(genreId)) {
            filteredMedia.push(media);
        }
    }
    updateMediaDisplay(filteredMedia);
}

// Função para atualizar a exibição dos cards
async function updateMediaDisplay(filteredMedia) {
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.innerHTML = ''; // Limpar o conteúdo atual

    for (let i = 0; i < filteredMedia.length; i++) {
        const media = filteredMedia[i];
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

// Função para carregar a mídia quando a página for carregada
document.addEventListener("DOMContentLoaded", () => {
    addMedia();
});

// Função para adicionar os cards de mídia à página
async function addMedia() {
    const mediaContainer = document.getElementById('media-container');
    const startIndex = 0; // Paginando para mostrar 20 postagens por vez
    const endIndex = 20; // 20 postagens por página

    for (let i = startIndex; i < endIndex && i < mediaList.length; i++) {
        const media = mediaList[i];
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

// Toggle para abrir e fechar o menu de categorias
const menuToggle = document.getElementById('menu-toggle');
const categoryMenu = document.getElementById('category-menu');
const arrow = document.querySelector('.arrow');

menuToggle.addEventListener('click', () => {
    if (categoryMenu.style.display === 'block') {
        categoryMenu.style.display = 'none';
        arrow.innerHTML = '&#8594;'; // Setinha para direita
    } else {
        categoryMenu.style.display = 'block';
        arrow.innerHTML = '&#8595;'; // Setinha para baixo
    }
});

// Função de pesquisa
function setupSearch() {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function() {
        const searchQuery = document.getElementById("search").value.toLowerCase();
        const mediaItems = document.querySelectorAll(".media-item");

        mediaItems.forEach(function(item) {
            const title = item.querySelector("h3").innerText.toLowerCase();

            if (title.includes(searchQuery)) {
                item.style.display = "block"; // Mostrar o item que corresponde à pesquisa
            } else {
                item.style.display = "none"; // Esconder o item que não corresponde à pesquisa
            }
        });
    });
}
