/*
Os elementos que precisam ser alterados dinamicamente precisam ser selecionados usando o querySelector().
Para que posssam ser acessados e modificados, eles recebem nomes de variáveis.
Outras variáveis que serão acessadas ao longo do programa também são definidas.
*/


let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
//document.querySelector retorna o primeiro elemento dentro do documento.
//Documento representa a página da web. Acessando qualquer elemento no html, nós sempre acessamos o objeto documento.
//Nesta sessão, estamos colocando todos os elementos da página HTML em variáveis.

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector (".next-track");
let prev_btn = document.querySelector (".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;
//Variáveis globais, as quais podem ser acessadas em qualquer parte do programa.

let curr_track = document.createElement('audio');
//Cria um elemento não reconhecido pelo script, o qual no caso é o áudio.

let track_list = [
    {
        name: "Crazy",
        artist: "Aerosmith",
        image: "img/get-a-grip.jpg",
        path: "music/crazy.mp3"
    },
    {
        name: "Anthem of The Lonely",
        artist: "Nine Lashes",
        image: "img/world-we-view.jpg",
        path: "music/anthem-of-the-lonely.mp3"
    },
    {
        name: "Don't Stop Me Now",
        artist: "Queen",
        image: "img/dont-stop-me-now.jpg",
        path: "music/dont-stop-me-now.mp3"
    },
];

function loadTrack(track_index){
    clearInterval(updateTimer);
    resetValues();
    //Limpa o timer da última música.

    curr_track.src = track_list[track_index].path;
    curr_track.load();
    //Carrega uma nova faixa.

    track_art.style.backgroundImage = 
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        " PLAYING " + (track_index + 1) + " OF " + track_list.length;
    //Atualiza os detalhes para a nova música que vai entrar.

    updateTimer = setInterval(seekUpdate, 1000);
    //Seta um intervalo de 1000 milisegundos.

    curr_track.addEventListener("ended", nextTrack);
    //Começa uma nova música se a atual terminar.

    random_bg_color();
    //Seleciona aleatóriamente uma nova cor de fundo de tela.
}

function random_bg_color(){
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    //Seleciona um número entre 64 e 256. Valores abaixo de 64 são cores escuras e isso torna menos interessante.

    let bgColor = `rgb(${red}, ${green}, ${blue})`;
    
    document.body.style.background = bgColor;
}

function resetValues(){
    current_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack(){
    if(!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack(){
    curr_track.play();
    isPlaying = true;

    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack(){
    curr_track.pause();
    isPlaying = false;

    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {

    if (track_index < track_list.length - 1)
    track_index += 1;
    else track_index = 0;

    //Caso a playlist chegue ao final, o botão next vai a fazer repetir.
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {

    if (track_index > 0)
    track_index -= 1;
    else track_index = track_list.length - 1;

    //Volta para a última música caso a que esteja tocando seja a primeira.
    loadTrack(track_index);
    playTrack();
}

function seekTo(){
    seekto = curr_track.duration * (seek_slider.value / 100);
    /*Calcula a posição do cursor de mídia pela porcentagem do navegador de
    mídia e busca a duração relativa da faixa.*/
    curr_track.currentTime = seekto;
    //Seta a posição atual da faixa para a posição do cursor de mídia.
}

function setVolume(){
    curr_track.volume = volume_slider.value / 100;
    //seta o volume de acordo com a porcentagem do navegador de volume.
}

function seekUpdate(){
    let seekPosition = 0;
    
    if (!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        //Checa se a duração de faixa é um número legível.

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        //Calcula o o tempo restante e a duração total.

        if (currentSeconds < 10) { currentSeconds = `0 ${currentSeconds} `};
        if (durationSeconds < 10) { durationSeconds = `0 ${durationSeconds} `};
        if (currentMinutes < 10) { currentMinutes = `0 ${currentMinutes} `};
        if (durationMinutes < 10) { durationMinutes = `0 ${durationMinutes} `};

        current_time.textContent = `${currentMinutes} : ${currentSeconds}`;
        total_duration.textContent = `${durationMinutes} : ${durationSeconds}`;
    }  
}

loadTrack(track_index);