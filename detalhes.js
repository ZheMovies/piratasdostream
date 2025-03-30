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

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.innerHTML = `<p>Você está acessando o ${type === 'movie' ? 'filme' : 'série'}: <strong>ID ${id}</strong></p>`;
    document.body.appendChild(messageBox);

    setTimeout(() => {
      messageBox.remove();
      // window.location.href = link;
    }, 3000);

    document.getElementById("assistir").onclick = function () {
      const iframe = document.createElement("iframe");
      iframe.src = link;
      iframe.width = "100%";
      iframe.height = "500";
      iframe.frameBorder = "0";
      iframe.allowFullScreen = true;
      iframe.style.aspectRatio = "16/9";
      iframe.style.borderRadius = "10px";
      iframe.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
      iframe.style.padding = "10px";
      document.body.appendChild(iframe);
    };
  } catch (error) {
    console.error("Erro ao buscar detalhes da mídia:", error);
    document.body.innerHTML = "<h1>Erro ao carregar a mídia</h1>";
  }
});
