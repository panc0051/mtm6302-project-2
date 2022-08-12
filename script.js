
//When APOD search form is submitted, an asynchronous request was made to the APOD API	5
// The APOD image, title, date, and explanation were displayed using the data from the APOD API	5
// When clicking the APOD image, a high definition version of the image was displayed on the page	5
// When clicking on the "save" button the APOD data was saved to local storage	5
// When clicking on the "save" button the APOD image, title, and date were displayed in the favourites section	5
// When clicking on the "delete" button the APOD image, title, and date were removed from the favourites section	5
// When clicking on the "delete" button the APOD data was removed from local storage	5
// When the page loads any saved APOD images were displayed in the favourites section	5
// The UI is responsive and well designed

// local storage is used to store the APOD data
// 
// const data =
// {
//     "date": "2022-03-27",
//     "explanation": "Why would the surface of Titan light up with a blinding flash? The reason: a sunglint from liquid seas.  Saturn's moon Titan has numerous smooth lakes of methane that, when the angle is right, reflect sunlight as if they were mirrors.  Pictured here in false-color, the robotic Cassini spacecraft that orbited Saturn from 2004 to 2017 imaged the cloud-covered Titan in 2014 in different bands of cloud-piercing infrared light.  This specular reflection was so bright it saturated one of Cassini's infrared cameras. Although the sunglint was annoying -- it was also useful.  The reflecting regions confirm that northern Titan houses a wide and complex array of seas with a geometry that indicates periods of significant evaporation.  During its numerous passes of our Solar System's most mysterious moon, Cassini has revealed Titan to be a world with active weather -- including times when it rains a liquefied version of natural gas.",
//     "hdurl": "https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_2002.jpg",
//     "media_type": "image",
//     "service_version": "v1",
//     "title": "Titan Seas Reflect Sunlight",
//     "url": "https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_960.jpg"
// }

// retrieve the html elements
const $form = document.getElementById("form");
const $date = document.getElementById("date");
const $recent = document.getElementById("recent");

//create a data array to store the data from the api
//arrays of object, each object is a new search

let data = [
    {
        "date": "2022-03-27",
        "explanation": "Why would the surface of Titan light up with a blinding flash? The reason: a sunglint from liquid seas.  Saturn's moon Titan has numerous smooth lakes of methane that, when the angle is right, reflect sunlight as if they were mirrors.  Pictured here in false-color, the robotic Cassini spacecraft that orbited Saturn from 2004 to 2017 imaged the cloud-covered Titan in 2014 in different bands of cloud-piercing infrared light.  This specular reflection was so bright it saturated one of Cassini's infrared cameras. Although the sunglint was annoying -- it was also useful.  The reflecting regions confirm that northern Titan houses a wide and complex array of seas with a geometry that indicates periods of significant evaporation.  During its numerous passes of our Solar System's most mysterious moon, Cassini has revealed Titan to be a world with active weather -- including times when it rains a liquefied version of natural gas.",
        "hdurl": "https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_2002.jpg",
        "media_type": "image",
        "service_version": "v1",
        "title": "Titan Seas Reflect Sunlight",
        "url": "https://apod.nasa.gov/apod/image/2203/TitanGlint_cassini_960.jpg"
    }
];

//build recent 
//build out recent searches
function buildRecent() {
    const html = [];

    //use for loop to get each object in the data array
    //create template for each object in the data array
    for (let i = 0; i < data.length; i++) {
        //to get each data object in the array
        const { date, explanation, title, url } = data[i];
        //create a template for each object in the array
        html.push(`
            <div class="card">
                <img src="${url}" alt="${title}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${explanation}</p>
                    <a href="#" class="btn btn-primary">Save</a>
                    <a href="#" class="btn btn-close" data-index="${i}"></a>
                </div>
            </div>
        `);
    }


    // output the data to the html
    $recent.innerHTML = html.join("");

}

// Add event listener to the form
//will make fatch request to the api
$form.addEventListener("submit",
    async function (e) {
        e.preventDefault();
        // making aysnc request using fetch will return a promise
        //two ways for waiting: .then() , async and await

        //make fetch request to get the data from the api
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=UadZQfGdY8AwbbSEetI02kdfgrg9N7wKD3Di9gYY' + '&date=' + $date.value);

        //use the response to get JSON data
        const json = await response.json();

        // console.log(json);

        //add new json data to the data array
        data.push(json);

        //store data in local storage
        localStorage.setItem("data", JSON.stringify(data));

        buildRecent();


    })
//add event listener to the recent searches for the delete button
$recent.addEventListener("click", function (e) {
    //check if close button was clicked
    if (e.target.classList.contains("btn-close")) {
        //get the index from custom attribute
        const index = e.target.dataset.index;
        //remove the object from the data array
        data.splice(index, 1);

        //update the local storage
        localStorage.setItem("data", JSON.stringify(data));

        //rebuild the recent searches
        buildRecent();
    }
})

//check if local storage has data
const ls = localStorage.getItem("data");

//if local storage has data, use JSON.parse to convert the data to an array of objects
if (ls) {
    data = JSON.parse(ls);

    buildRecent();
}