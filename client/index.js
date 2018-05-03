const mapboxgl = require("mapbox-gl");
const buildMarker = require("./marker.js");

mapboxgl.accessToken = "pk.eyJ1IjoicHRlcnJ5bCIsImEiOiJjamdvNG9vdWExYmdlMnhybTk0bXkwODFwIn0.AbUpojBeB3WzX6j9dwQpCQ";

const fullstackCoords = [-74.009, 40.705] // NY
// const fullstackCoords = [-87.6320523, 41.8881084] // CHI

const map = new mapboxgl.Map({
  container: "map",
  center: fullstackCoords, // FullStack coordinates
  zoom: 12, // starting zoom
  style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
});

console.log('something');

const marker = buildMarker("activities", fullstackCoords);
marker.addTo(map);

const activityRequest = new Request('http://localhost:3000/api');

async function fetchAllActivities() {
  let activityArray = await fetch(activityRequest).then(e => e.json());
  return activityArray;
}

let optionarr = [
  document.querySelector("#hotels-choices"),
  document.querySelector("#restaurants-choices"),
  document.querySelector("#activities-choices")
];
// console.dir(optionarr);
(async () => {
  let activityArray = await fetchAllActivities();
  console.dir(activityArray);
  let index = 0;
  activityArray.forEach(arr => {
    arr.forEach(e => {
      let option = document.createElement('option');
      option.innerHTML = `${e.name}`;
      option.value = e.name;
      option.loc = e.place.location;
      optionarr[index].appendChild(option);
      optionarr[index].currentSelection = optionarr[index].value;
      optionarr[index].currentLoc = option.loc;
    })
    index++;
  })
})()

let addButtons = [...document.querySelectorAll(".options-btn")];

let listGroup = [...document.querySelectorAll(".list-group")];

function selector() {
  for (let i = 0; i < optionarr.length; i++) {
    optionarr[i].addEventListener("change", (ev) => {
      optionarr[i].currentSelection = ev.target.value;
      optionarr[i].currentLoc = ev.target[ev.target.options.selectedIndex].loc;
      console.dir(optionarr[i].currentLoc);
    })
  }
}

selector();

function buttonClickMaker() {
  for (let i = 0; i < addButtons.length; i++) {
    addButtons[i].addEventListener('click', (event) => {
      let selected = document.createElement("li")
      selected.innerHTML = optionarr[i].currentSelection;
      listGroup[i].appendChild(selected);
      console.dir(optionarr[i].currentLoc);
      buildMarker(`${selected.innerHTML}`, optionarr[i].currentLoc).addTo(map);
    })
  }
}

buttonClickMaker();

