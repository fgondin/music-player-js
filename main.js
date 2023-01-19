let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
//document.querySelector retorna o primeiro elemento dentro do documento.
//Documento representa a página da web. Acessando qualquer elemento no html, nós sempre acessamos o objeto documento.
//Nesta sessão, estamos colocando todos os elementos da página HTML em variáveis.

let playpause_btn = ducoment.querySelector(".playpause-track");
let next_btn = document.querySelector (".next-track");
let prev_btn = document.querySelector (".prev-track");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let current_time = document.querySelector("current-time");
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
        image: "image URL",
        path: "path URL"
    },
    {
        name: "Anthem of The Lonely",
        Artist: "Nine Lashes",
        image: "Image URL",
        path: "path URL"
    },
    {
        name: "Don't Stop Me Now",
        artist: "Queen",
        image: "image URL",
        path: "path URL"
    }
];