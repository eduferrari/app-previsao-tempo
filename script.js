const apiKey = 'e4a3e72915c3a4863dd968655c7bf312';

let inputCidade = document.querySelector('.txt-cidade');
let buttonBuscar = document.querySelector('.btn-buscar');

document.addEventListener('DOMContentLoaded', () => {
    buscarDadosTempo('Francisco Beltrão');
})

inputCidade.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        if (!inputCidade.value) return false;

        buscarDadosTempo(inputCidade.value);
    }
});

buttonBuscar.addEventListener('click', (event) => {
    event.preventDefault();

    if (!inputCidade.value) return false;

    buscarDadosTempo(inputCidade.value);
});

const buscarDadosTempo = async (cidade) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&lang=pt_br&units=metric`;

    const dados = await fetch(url).then(data => data.json());

    if (dados.cod === "404") cidadeNaoEncontrada();

    mostarDadosTempo(dados);
}

const mostarDadosTempo = (dados) => {
    document.querySelector(".info-tempo-cidade").innerHTML = `<h2>Tempo em ${dados.name}</h2>
                                                              <h3>Agora ${Math.floor(dados.main.temp)}°</h3>
                                                              <p>Minima ${Math.floor(dados.main.temp_min)}°</p>
                                                              <p>Máxima ${Math.floor(dados.main.temp_max)}°</p>`;

    document.querySelector(".info-condicao-tempo").innerHTML = `<img src="https://openweathermap.org/img/wn/${dados.weather[0].icon}.png" alt="${dados.weather[0].description}" />
                                                                <p>${dados.weather[0].description}</p>`;

    document.querySelector(".info-umidade").innerHTML = `<p>Umidade: ${dados.main.humidity}%</p>`;
}

const cidadeNaoEncontrada = () => {
    document.querySelector(".info-tempo-cidade").innerHTML = `<h2>Cidade não encontrada</h2>`;
    document.querySelector(".info-condicao-tempo").innerHTML = '';
    document.querySelector(".info-umidade").innerHTML = '';
    return false;
}