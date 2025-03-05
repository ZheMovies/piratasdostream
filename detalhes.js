document.addEventListener("DOMContentLoaded", async function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");
    const link = params.get("link");
    const apiKey = '6fef90efb83322056c9bf84cdde87872';

    if (!id || !type) {
        document.body.innerHTML = "<h1>Mídia não encontrada</h1>";
        return;
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=pt-BR`);
        const data = await response.json();

        document.getElementById("background").style.backgroundImage = `url(https://image.tmdb.org/t/p/w1280${data.backdrop_path})`;
        document.getElementById("poster").src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        document.getElementById("titulo").innerText = data.title || data.name;
        document.getElementById("nota").innerText = `⭐ Nota: ${data.vote_average ? data.vote_average.toFixed(1) : 'N/A'}`;
        document.getElementById("genero").innerText = `🎭 Gênero: ${data.genres.map(g => g.name).join(', ')}`;
        document.getElementById("data-lancamento").innerText = `📅 Lançamento: ${data.release_date || data.first_air_date || 'Não disponível'}`;
        document.getElementById("duracao").innerText = `⏳ Duração: ${data.runtime ? data.runtime + ' minutos' : 'Não disponível'}`;
        document.getElementById("descricao").innerText = data.overview;

        // Exibir a mensagem com o ID do filme ou série
        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');
        messageBox.innerHTML = `<p>Você está acessando o ${type === 'movie' ? 'filme' : 'série'}: <strong>ID ${id}</strong></p>`;

        // Adiciona a mensagem à página
        document.body.appendChild(messageBox);

        // Exibir a mensagem por 3 segundos e então redirecionar
        setTimeout(() => {
            messageBox.remove();
            window.location.href = link; // Redireciona para o link do filme/série
        }, 3000); // 3 segundos

        // Botão de assistir (se necessário)
        document.getElementById("assistir").onclick = function () {
            window.location.href = link;
        };

    } catch (error) {
        console.error("Erro ao buscar detalhes da mídia:", error);
        document.body.innerHTML = "<h1>Erro ao carregar a mídia</h1>";
    }
});