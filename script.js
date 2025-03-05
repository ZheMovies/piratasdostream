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
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao buscar dados da mídia:', error);
        return null;
    }
}

// Função para adicionar os cards de mídia à página
async function addMedia() {
    const mediaContainer = document.getElementById('media-container');
    
    for (let media of mediaList) {
        const data = await fetchMediaData(media.type, media.id);
        if (!data || data.status_code) continue;

        const mediaItem = document.createElement('div');
        mediaItem.classList.add('media-item');
        mediaItem.innerHTML = `
            <h3>${data.title || data.name}</h3>
            <img src="https://image.tmdb.org/t/p/w500${data.poster_path}" alt="${data.title || data.name}">
            <button onclick="showAccessMessage('${media.type}', ${media.id}, '${media.link}')">Acessar</button>
        `;
        mediaContainer.appendChild(mediaItem);
    }

    setupSearch();
}

// Função de pesquisa
function setupSearch() {
    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function() {
        const searchQuery = document.getElementById("search").value.toLowerCase();
        const mediaItems = document.querySelectorAll(".media-item");

        mediaItems.forEach(function(item) {
            const title = item.querySelector("h3").innerText.toLowerCase();

            if (title.includes(searchQuery)) {
                item.style.display = "block"; 
            } else {
                item.style.display = "none"; 
            }
        });
    });
}

// Função para exibir mensagem temporária ao clicar no botão "Acessar"
function showAccessMessage(type, id, link) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('access-message');
    messageBox.innerText = type === 'movie' ? 
        `Você está acessando o filme. ID: ${id}` : 
        `Você está acessando a série. ID: ${id}`;

    document.body.appendChild(messageBox);

    setTimeout(() => {
        messageBox.remove();
        window.location.href = link;
    }, 2000);
}

// Função para carregar a mídia quando a página for carregada
document.addEventListener("DOMContentLoaded", addMedia);