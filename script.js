
// fetch (url)
//     .then(x =>
//         x.json()
//     )
//     .then(x =>{
//         if (x.error) {
//             throw x.error
//         }
//         x.pokemon_entries.forEach(function(obj){
//             createHTML(obj.pokemon_species.name)
//     })
//     console.log(x)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// const bulbasaurUrl = "https://pokeapi.co/api/v2/pokemon/1/"
// checking what we get in an individual pokemon object
// fetch(bulbasaurUrl)
// .then(x =>
//     x.json()
// )
// .then(x =>{
//     if (x.error) {
//         throw x.error
//     }
// console.log(x)
// })
// .catch(err => {
//     console.log(err)
// })


// my app


function displayError(text){
    const section = document.querySelector("#card-container")
    const errorMessage = document.createElement("h1")
    errorMessage.textContent = text

    section.appendChild(errorMessage);
}

function createDiv(text){
    const newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.id = text + "-card";
    return newDiv;
}

function createInfoDiv(text){
    const newDiv = document.createElement("div");
    newDiv.className = "card";
    newDiv.id = text + "info-card";
    return newDiv;
}

function createH1(text){
    const newH1 = document.createElement("h1");
    newH1.textContent = text;
    newH1.className = "name";
    newH1.id = text + "-name";
    return newH1;
}

function createImg(text, imageUrl){
    const newImg = document.createElement("img");
    newImg.src = (imageUrl);
    newImg.id = text + "-image"
    return newImg;
}

function createId(idNum){
    const newP = document.createElement("p");
    newP.textContent = "#" + idNum;
    newP.id = idNum;
    return newP;
}

function createP(infoType, text, pokeName){
    const newP = document.createElement("p");
    newP.textContent = infoType + ": " + text;
    newP.id = pokeName + infoType + "-" + text;
    return newP;
}

function createType(infoType, pokeType1, pokeType2, pokeName){
    const newP = document.createElement("p");

    if (pokeType2 !== undefined){
       newP.textContent = infoType + ": " + pokeType1 + ", " + pokeType2; 
    }else newP.textContent = infoType + ": " + pokeType1;

    newP.id = pokeName + "-type";
    return newP;
}

// function writeToPage(text) {
//         const message = document.getElementById("message");
//         message.id = text;
//         message.innerHTML = text;
//         return;
//       }



function createCard(pokeName, imageURL, idNum, pokeWeight, pokeHeight, pokeType1, pokeType2){

    const container = document.querySelector("#card-container");
    const card = createDiv(pokeName);
    const name = createH1(pokeName);
    const image = createImg(pokeName, imageURL);
    const iD = createId(idNum);
    
    const weight = createP("Weight", pokeWeight, pokeName);
    const height = createP("Height", pokeHeight, pokeName);
    const type = createType("Type(s)", pokeType1, pokeType2, pokeName);
    

    weight.className = "invisible";
    height.className = "invisible";
    type.className = "invisible";
    

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(iD);
    card.appendChild(weight);
    card.appendChild(height);
    card.appendChild(type);
    
   
    container.appendChild(card);

    return card;
}
    

for (i = 1; i < 10 ; i++){
    const pokemonUrlGeneric = "https://pokeapi.co/api/v2/pokemon/" 
    fetch(pokemonUrlGeneric + i + "/")
        .then(x => 
            x.json()
        )
        .then(x => {
            if (x.error) {
                throw x.error
            }
            
            var card;
            var secondType = x.types[1];
            if (secondType !== undefined){
               card = createCard(x.name, x.sprites["front_default"], x.id, x.weight, x.height, x.types[0].type.name, x.types[1].type.name) 
            } else{
                card = createCard(x.name, x.sprites["front_default"], x.id, x.weight, x.height, x.types[0].type.name) 
            }

            card.onclick = function(){
                document.getElementById(x.name + "-image").classList.toggle("invisible");
                document.getElementById(x.name + "Weight" + "-" + x.weight).classList.toggle("invisible");
                document.getElementById(x.name + "Height" + "-" + x.height).classList.toggle("invisible");
                document.getElementById(x.name + "-type").classList.toggle("invisible");
                document.getElementById(x.name + "-card").classList.toggle("clicked");

            }
        })
        .catch(err => {
            displayError(err);
            
        })
        
}

//if I want to do a sort button, could try to alphabetize by grabbing first character of the name with x.charAt(0), sort()
//sort() default is alphabetical and ascending 
