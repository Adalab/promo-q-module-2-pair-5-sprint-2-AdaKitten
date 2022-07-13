"use strict";

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector(".js-new-form");
const listElement = document.querySelector(".js-list");
const searchButton = document.querySelector(".js-button-search");
const buttonAdd = document.querySelector(".js-btn-add");
const buttonCancelForm = document.querySelector(".js-btn-cancel");
const inputDesc = document.querySelector(".js-input-desc");
const inputPhoto = document.querySelector(".js-input-photo");
const inputName = document.querySelector(".js-input-name");
const inputRace = document.querySelector(".js-input-race");
const linkNewFormElememt = document.querySelector(".js-button-new-form");
const labelMesageError = document.querySelector(".js-label-error");
const inputSearchDesc = document.querySelector(".js_in_search_desc");
const inputSearchRace = document.querySelector(".js_in_search_race");

let kittenDataList = [];

//Funciones
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.url}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  return kitten;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = "";
  for (const kittenItem of kittenDataList) {
    listElement.innerHTML += renderKitten(kittenItem);
  }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove("collapsed");
}
function hideNewCatForm() {
  newFormElement.classList.add("collapsed");
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  labelMesageError.innerHTML = "";
  if (newFormElement.classList.contains("collapsed")) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}
//Crear función que nos recoja los datos en un objeto.
function getNewKittenData(valueName, valueDesc, valuePhoto, valueRace) {
  const newKittenDataObject = {
    name: "",
    desc: "",
    url: "",
    race: "",
  };
  newKittenDataObject.name = valueName;
  newKittenDataObject.desc = valueDesc;
  newKittenDataObject.url = valuePhoto;
  newKittenDataObject.race = valueRace;
  kittenDataList.push(newKittenDataObject);
  console.log(newKittenDataObject);
  saveLocalStorage();
}

//Adicionar nuevo gatito

function addNewKitten(event) {
  event.preventDefault();
  const valueDesc = inputDesc.value;
  const valuePhoto = inputPhoto.value;
  const valueName = inputName.value;
  const valueRace = inputRace.value;
  if (valueDesc === "" && valuePhoto === "" && valueName === "") {
    labelMesageError.innerHTML = "Debe rellenar todos los valores";
  } else {
    if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
      labelMesageError.innerHTML = "";

      getNewKittenData(valueName, valueDesc, valuePhoto, valueRace);
      labelMesageError.innerHTML = "¡Mola! ¡Un nuevo gatito en Adalab!";
      renderKittenList(kittenDataList);
      cleanNewKitten(event);
    }
  }
}
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add("collapsed");
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}

//Limpiar la entrada del gatito
function cleanNewKitten(event) {
  event.preventDefault();
  inputDesc.value = "";
  inputPhoto.value = "";
  inputName.value = "";
  inputRace.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = inputSearchDesc.value;
  const raceSearchText = inputSearchRace.value;
  const filteredKittens = kittenDataList

    .filter((kittenItem) => {
      const kittenItemDesc = kittenItem.desc.includes(descrSearchText);
      console.log(descrSearchText);
      return kittenItemDesc;
    })
    .filter((kittenItem) => {
      const kittenItemRace = kittenItem.race.includes(raceSearchText);
      console.log(raceSearchText);
      return kittenItemRace;
    });

  console.log(filteredKittens);

  listElement.innerHTML = "";

  filteredKittens.forEach(
    (kittenItem) => (listElement.innerHTML += renderKitten(kittenItem))
  );
}

//Mostrar el litado de gatitos en el HTML
/* renderKittenList(kittenDataList); */

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);

//Petición al servidor
const GITHUB_USER = "rocioflo";
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;

if (kittenListStored) {
  renderKittenList(kittenListStored);
} else {
  fetch(SERVER_URL, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      kittenDataList = data.results;
      renderKittenList(kittenDataList);
      console.log(kittenDataList);
      saveLocalStorage();
    });
}
console.log(kittenDataList);

// guardar en localStorage

function saveLocalStorage() {
  localStorage.setItem("kittenlist", JSON.stringify(kittenDataList));
}

const kittenListStored = JSON.parse(localStorage.getItem("kittenList"));
console.log(kittenListStored);
