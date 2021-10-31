const API_KEY = "acf746ea033e5d0888fc1cbd6d8db285";
const API_KEY_MAPS = "AIzaSyAdBnboH4EknMNF824PB31P130nYRbYQEM";
const URL = "https://api.openweathermap.org/data/2.5/";
const URL_MAPS = "https://www.google.com/maps/embed/v1/";


const button = document.getElementById('enviar')
const inputValor = document.getElementById('busqueda');
const h2 = document.querySelector('#weather h2');
const pDescrip = document.querySelector('#temp div:last-of-type p:last-of-type');
const img = document.querySelector('#temp div img');
const tempe = document.querySelector('#temp div:last-of-type p:first-of-type');
const divVideo = document.querySelector('#weather');
const allspan = document.querySelectorAll('#data ul li > span:last-of-type');

const ultimaCiudadBuscada = JSON.parse(localStorage.getItem("ciudad"));

    console.log(ultimaCiudadBuscada);


    buscarCiudad(ultimaCiudadBuscada);


button.addEventListener('click', ()=>{

    buscarCiudad(inputValor.value);
})

/**
 * Recibe la ciudad ingresada por el usuario y trae los datos de la API
 * @param ciudad
 */
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

/**
 * Setea los datos devueltos por la API dentro del HTML
 * @param datos
 */
function clima(datos){

    console.log(datos);

    if(document.querySelector('#weather video')){
        divVideo.removeChild(document.querySelector('#weather video'));
    }

    let horaActual = getHour(datos.timezone);


    h2.innerHTML = `${datos.name} - ${datos.sys.country}`;
    pDescrip.innerHTML = datos.weather[0].description;

    getImgAndVideo(horaActual, datos.weather);

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

/**
 * Obtiene la zona horario de la ciudad elegida
 *
 * @param timeZone
 * @returns {number}
 */
function getHour(timeZone){
    let horaUtc= new Date().getUTCHours();

    let pasarSec = timeZone/3600;

    var horaActual = horaUtc + pasarSec;


    if(horaActual > 24){

        horaActual = horaActual - 24;
        return horaActual;

    }else if(horaActual < 0){

        horaActual = 24 + horaActual;

        return horaActual;
    }

    return horaActual;
}

/**
 * Genera la imagen y el video en base al id del clima devuelto por la API y el horario.
 * @param horaActual
 * @param datosWeater
 */
function getImgAndVideo(horaActual, datosWeater){
    if(horaActual >= 6 && horaActual <= 19){

        if(datosWeater[0].id === 800){
            generateImgAndVideo('img/soleado.png', 'Pleno sol', 'img/sunny.mp4');

        }else if(datosWeater[0].id > 800 && datosWeater[0].id < 805){
            generateImgAndVideo('img/nublado.png', 'Sol cubierto por nubes de lluvia', 'img/dia-nublado.mp4');


        }else if( datosWeater[0].id === 511 ||datosWeater[0].id >= 600 && datosWeater[0].id <= 602 || datosWeater[0].id >= 611 && datosWeater[0].id <= 613 || datosWeater[0].id === 615 || datosWeater[0].id === 616 || datosWeater[0].id >= 620 && datosWeater[0].id <= 622){
            generateImgAndVideo('img/nieve.png', 'Nube con copos de nieve', 'img/nieve-2.mp4');


        }else if(datosWeater[0].id >= 300 && datosWeater[0].id <= 302 || datosWeater[0].id >= 310 && datosWeater[0].id <= 314 || datosWeater[0].id === 321 || datosWeater[0].id >= 500 && datosWeater[0].id <= 504 || datosWeater[0].id >= 520 && datosWeater[0].id <= 522 || datosWeater[0].id === 531){

            generateImgAndVideo('img/lluvia.png', 'Nube de lluvia', 'img/lluvia-2.mp4');

        }else if(datosWeater[0].id >= 200 && datosWeater[0].id <= 202 || datosWeater[0].id >= 210 && datosWeater[0].id <= 212 || datosWeater[0].id === 221 || datosWeater[0].id >= 230 && datosWeater[0].id <= 232){

            generateImgAndVideo('img/tormenta.png', 'Nube de tormenta', 'img/lluvia-2.mp4');

        }else if(datosWeater[0].id === 781){

            generateImgAndVideo('img/tornado.png', 'Tornado', 'img/lluvia-2.mp4');

        }else{

            generateImgAndVideo('img/niebla.png', 'Sol cubierto por nubes oscuras', 'img/dia-niebla.mp4');

        }
    }else{
        if(datosWeater[0].id === 800){

            generateImgAndVideo('img/noche_despejada.png', 'Luna con estrellas despejadas', 'img/moon.mp4');


        }else if(datosWeater[0].id > 800 && datosWeater[0].id < 805){

            generateImgAndVideo('img/noche-nublado.png', 'Luna cubierta por nubes de lluvia', 'img/nublado.mp4');


        }else if( datosWeater[0].id === 511 ||datosWeater[0].id >= 600 && datosWeater[0].id <= 602 || datosWeater[0].id >= 611 && datosWeater[0].id <= 613 || datosWeater[0].id === 615 || datosWeater[0].id === 616 || datosWeater[0].id >= 620 && datosWeater[0].id <= 622){

            generateImgAndVideo('img/nieve.png', 'Nube con copos de nieve', 'img/nieve-2.mp4');


        }else if(datosWeater[0].id >= 300 && datosWeater[0].id <= 302 || datosWeater[0].id >= 310 && datosWeater[0].id <= 314 || datosWeater[0].id === 321 || datosWeater[0].id >= 500 && datosWeater[0].id <= 504 || datosWeater[0].id >= 520 && datosWeater[0].id <= 522 || datosWeater[0].id === 531){

            generateImgAndVideo('img/lluvia.png', 'Nube de lluvia', 'img/nublado.mp4');


        }else if(datosWeater[0].id >= 200 && datosWeater[0].id <= 202 || datosWeater[0].id >= 210 && datosWeater[0].id <= 212 || datosWeater[0].id === 221 || datosWeater[0].id >= 230 && datosWeater[0].id <= 232){

            generateImgAndVideo('img/tormenta.png', 'Nube de tormenta', 'img/lluvia-2.mp4');


        }else if(datosWeater[0].id === 781){

            generateImgAndVideo('img/tornado.png', 'Tornado', 'img/lluvia-2.mp4');


        }else{

            generateImgAndVideo('noche-niebla.png', 'Luna cubierta por nubes oscuras', 'img/luna-niebla.mp4');

        }
    }
}

/**
 * Setea la imagen y el video del clima según los parámetros proporcionados
 *
 * @param imgString
 * @param altString
 * @param videoString
 */
function generateImgAndVideo(imgString, altString, videoString){
    img.src= imgString;
    img.alt= altString;

    let video = document.createElement('video');
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    divVideo.appendChild(video);

    let source = document.createElement('source');
    source.src= videoString;
    source.type="video/mp4";

    video.appendChild(source);
}

/**
 * Genera y setea el mapa.
 * @param latitud
 * @param longitud
 */
function initMap(latitud, longitud) {
    
    console.log(latitud, longitud);

    if(document.querySelector('#map iframe')){
        const divMapa = document.getElementById('map');
        const iframe = document.querySelector('#map iframe');
        divMapa.removeChild(iframe);
    }
    let divMapa = document.getElementById('map');
    let mapa = document.createElement('iframe');


    divMapa.appendChild(mapa);
    mapa.src=`${URL_MAPS}view?key=${API_KEY_MAPS}&center=${latitud},${longitud}&zoom=10&maptype=satellite`;

}