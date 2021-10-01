const API_KEY = "acf746ea033e5d0888fc1cbd6d8db285";
const API_KEY_MAPS = "AIzaSyAdBnboH4EknMNF824PB31P130nYRbYQEM";
const URL = "https://api.openweathermap.org/data/2.5/";
const URL_MAPS = "https://www.google.com/maps/embed/v1/";


const button = document.getElementById('enviar')
const inputValor = document.getElementById('busqueda');

const ultimaCiudadBuscada = JSON.parse(localStorage.getItem("ciudad"));

    console.log(ultimaCiudadBuscada);

if(ultimaCiudadBuscada == null){
    byDefault();
}else{
    buscarCiudad(ultimaCiudadBuscada);
}


button.addEventListener('click', ()=>{

    buscarCiudad(inputValor.value);
})

function byDefault(){
    buscarCiudad('Buenos Aires');
}

function buscarCiudad(ciudad){

        //console.log('ciudad:', ciudad);

     fetch(`${URL}weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`)
         .then(response => {

             //console.log(response);
             return response.json();

         }).then(responseJson => {

             clima(responseJson);
             guardarLocal(responseJson);
             console.log(responseJson.coord.lat, responseJson.coord.lon)
             initMap(responseJson.coord.lat, responseJson.coord.lon);

         }).catch(error => {

            console.log('Ha surgido un error: ', error);
     });
}

function clima(datos){
    const h2 = document.querySelector('#weather h2');
    const pDescrip = document.querySelector('#temp div:last-of-type p:last-of-type');
    const img = document.querySelector('#temp div img');
    const tempe = document.querySelector('#temp div:last-of-type p:first-of-type');
    const divVideo = document.querySelector('#weather');
    const allspan = document.querySelectorAll('#data ul li > span:last-of-type');
    const allicons = document.querySelectorAll('#data ul li > span:first-of-type');
    console.log(datos);

    if(document.querySelector('#weather video')){
        divVideo.removeChild(document.querySelector('#weather video'));
    }


    let horaUtc= new Date().getUTCHours();
    console.log('horaUtc',horaUtc);

    let pasarSec = datos.timezone/3600;

    var horaActual = horaUtc + pasarSec;

    console.log(horaActual);

    if(horaActual > 24){
        let horaResta = horaActual - 24;
        horaActual = 0 + horaResta;
        console.log(horaActual);
    }else if(horaActual < 0){
        let hora = 24 + horaActual;
        horaActual = hora;
        console.log(horaActual);
    }else{
        console.log('sin modificar:', horaActual);
    }

    h2.innerHTML = `${datos.name} - ${datos.sys.country}`;
    pDescrip.innerHTML = datos.weather[0].description;

    if(horaActual >= 6 && horaActual <= 19){
        if(datos.weather[0].id === 800){
            img.src='img/soleado.png';
            img.alt='Pleno sol';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/sunny.mp4";
            source.type="video/mp4";

            video.appendChild(source);

        }else if(datos.weather[0].id > 800 && datos.weather[0].id < 805){
            img.src='img/nublado.png';
            img.alt='Sol cubierto por nubes de lluvia';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/dia-nublado.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else if( datos.weather[0].id === 511 ||datos.weather[0].id >= 600 && datos.weather[0].id <= 602 || datos.weather[0].id >= 611 && datos.weather[0].id <= 613 || datos.weather[0].id === 615 || datos.weather[0].id === 616 || datos.weather[0].id >= 620 && datos.weather[0].id <= 622){
            img.src='img/nieve.png';
            img.alt='Nube con copos de nieve';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/nieve-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else if(datos.weather[0].id >= 300 && datos.weather[0].id <= 302 || datos.weather[0].id >= 310 && datos.weather[0].id <= 314 || datos.weather[0].id === 321 || datos.weather[0].id >= 500 && datos.weather[0].id <= 504 || datos.weather[0].id >= 520 && datos.weather[0].id <= 522 || datos.weather[0].id === 531){
            img.src='img/lluvia.png';
            img.alt='Nube de lluvia';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/lluvia-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else if(datos.weather[0].id >= 200 && datos.weather[0].id <= 202 || datos.weather[0].id >= 210 && datos.weather[0].id <= 212 || datos.weather[0].id === 221 || datos.weather[0].id >= 230 && datos.weather[0].id <= 232){
            img.src='img/tormenta.png';
            img.alt='Nube de tormenta';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/lluvia-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else if(datos.weather[0].id === 781){
            img.src='img/tornado.png';
            img.alt='Tornado';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/lluvia-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else{
            img.src='img/niebla.png';
            img.alt='Sol cubierto por nubes oscuras';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/dia-niebla.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }
    }else{
        if(datos.weather[0].id === 800){
            img.src='img/noche_despejada.png';
            img.alt='Luna con estrellas despejadas';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/moon.mp4";
            source.type="video/mp4";
            video.appendChild(source);


        }else if(datos.weather[0].id > 800 && datos.weather[0].id < 805){
            img.src='img/noche-nublado.png';
            img.alt='Luna cubierta por nubes de lluvia';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/nublado.mp4";
            source.type="video/mp4";

            video.appendChild(source);


        }else if( datos.weather[0].id === 511 ||datos.weather[0].id >= 600 && datos.weather[0].id <= 602 || datos.weather[0].id >= 611 && datos.weather[0].id <= 613 || datos.weather[0].id === 615 || datos.weather[0].id === 616 || datos.weather[0].id >= 620 && datos.weather[0].id <= 622){
            img.src='img/nieve.png';
            img.alt='Nube con copos de nieve';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/nieve-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);


        }else if(datos.weather[0].id >= 300 && datos.weather[0].id <= 302 || datos.weather[0].id >= 310 && datos.weather[0].id <= 314 || datos.weather[0].id === 321 || datos.weather[0].id >= 500 && datos.weather[0].id <= 504 || datos.weather[0].id >= 520 && datos.weather[0].id <= 522 || datos.weather[0].id === 531){
            img.src='img/lluvia.png';
            img.alt='Nube de lluvia';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/nublado.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else if(datos.weather[0].id >= 200 && datos.weather[0].id <= 202 || datos.weather[0].id >= 210 && datos.weather[0].id <= 212 || datos.weather[0].id === 221 || datos.weather[0].id >= 230 && datos.weather[0].id <= 232){
            img.src='img/tormenta.png';
            img.alt='Nube de tormenta';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/lluvia-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else if(datos.weather[0].id === 781){
            img.src='img/tornado.png';
            img.alt='Tornado';
            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/lluvia-2.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }else{

            img.src='img/noche-niebla.png';
            img.alt='Luna cubierta por nubes oscuras';

            let video = document.createElement('video');
            video.autoplay = true;
            video.muted = true;
            video.loop = true;
            divVideo.appendChild(video);

            let source = document.createElement('source');
            source.src="img/luna-niebla.mp4";
            source.type="video/mp4";
            video.appendChild(source);

        }
    }

    tempe.innerHTML = `${datos.main.temp}°C` ;

    allspan[0].innerHTML = `${datos.main.temp_max}° C`;
    allspan[1].innerHTML = `${datos.main.temp_min}° C`;
    allspan[2].innerHTML = `${datos.main.temp_min}° C`;
    allspan[3].innerHTML = `${datos.main.humidity}%`;
    allspan[4].innerHTML = `${datos.main.pressure} hPa`;
    allspan[5].innerHTML = `${datos.wind.speed}m/s`;
}

function guardarLocal(datos){
    localStorage.setItem('ciudad', JSON.stringify(datos.name));
}


function initMap(latitud, longitud) {
    
    console.log(latitud, longitud);

    let divMapa = document.getElementById('map');
    let mapa = document.createElement('iframe');           
    divMapa.appendChild(mapa);
    mapa.src=`${URL_MAPS}view?key=${API_KEY_MAPS}&center=${latitud},${longitud}&zoom=10`;

}