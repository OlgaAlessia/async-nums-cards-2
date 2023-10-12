let CARDS_API_URL = "https://deckofcardsapi.com/api/deck";


async function part1(){
// 1. request a single card from a newly shuffled deck

    let respDeck = await axios.get(`${CARDS_API_URL}/new/shuffle/?deck_count=1`);
    let resp = await axios.get(`${CARDS_API_URL}/${respDeck.data.deck_id}/draw/?count=1`);

    console.log(" The card draw is: ")
    console.log(`${resp.data.cards[0].value} OF ${resp.data.cards[0].suit}`);
}

async function part2(){
// 2. Get 2 from a newly shuffled deck. 

let respDeck = await axios.get(`${CARDS_API_URL}/new/shuffle/?deck_count=1`);

    let cardsPromises = await Promise.all([
        axios.get(`${CARDS_API_URL}/${respDeck.data.deck_id}/draw/?count=1`),
        axios.get(`${CARDS_API_URL}/${respDeck.data.deck_id}/draw/?count=1`)
    ]);
    console.log(" The 2 cards draw are: ")
    console.log(`${cardsPromises[0].data.cards[0].value} OF ${cardsPromises[0].data.cards[0].suit}`)
    console.log(`${cardsPromises[1].data.cards[0].value} OF ${cardsPromises[1].data.cards[0].suit}`)

}

// 3. get 4 facts on your favorite number. 
const cards = document.getElementById("cards");

const deck = {
    async init() {
        let resp = await axios.get(`${CARDS_API_URL}/new/shuffle/`)
        this.deckId = resp.data.deck_id;
        $("#btnCard").removeClass("disabled");
    },
    async drawCard(){
        let response = await axios.get(`${CARDS_API_URL}/${this.deckId}/draw/?count=1`)
        let alt = `${response.data.cards[0].value} OF ${response.data.cards[0].suit}`
        createImage(response.data.cards[0].image, alt)
        if ( response.data.remaining == 0 ){
            $("#btnCard").hide();
        }
    }
}

deck.init();

$(document).on("click", "#btnCard", giveCard);


function giveCard(){
    deck.drawCard()
}

function createImage(url, alt){
    const image = document.createElement("img");
    image.setAttribute("src", url);
    image.setAttribute("alt", alt);

    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 30 - 15;
    let randomY = Math.random() * 30 - 15;
    image.style.transform = 'translateX('+randomX+'px) rotate(' + angle + 'deg) translateY('+randomY+'px)';

    cards.appendChild(image);
}