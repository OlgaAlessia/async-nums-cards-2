// ****************************
// Promises
// ****************************

let NUMBER_API_URL = "http://numbersapi.com";


// 1. get a fact about your favorite number.
async function part1(){
    const results1 = document.getElementById("results1");
    const favNumber = 8;

    let resp = await axios.get(`${NUMBER_API_URL}/${favNumber}?json`);
    console.log(resp)

    results1.innerHTML = resp.data.text;

}

// 2. get data on multiple numbers in a single request.
async function part2(){
    const results2 = document.getElementById("results2");
    const favNumbers = [10, 15, 17];
    let resp = await axios.get(`${NUMBER_API_URL}/${favNumbers}?json`);
    let result = ""
    for (const key in resp.data){
        result = result + resp.data[key] + "<br>"
    }
    results2.innerHTML = result;
}

// 3. get 4 facts on your favorite number. 
async function part3(){
    const results3 = document.getElementById("results3");
    const favNumber3 = 40;

    let fourFavPromises = await Promise.all([
        axios.get(`${NUMBER_API_URL}/${favNumber3}?json`),
        axios.get(`${NUMBER_API_URL}/${favNumber3}?json`),
        axios.get(`${NUMBER_API_URL}/${favNumber3}?json`),
        axios.get(`${NUMBER_API_URL}/${favNumber3}?json`)
    ])

    let result = ""
    for (let i = 0; i < fourFavPromises.length; i++) {
        result = result + fourFavPromises[i].data.text + "<br>"
    }
    results3.innerHTML = result;
}