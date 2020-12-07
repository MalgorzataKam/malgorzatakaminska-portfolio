let col = document.querySelectorAll('.col');
let len = col.length;

async function init() {
    // added proxy to get around CORS issues for local development  
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://malgorzatakaminska.github.io/banner.json "

    fetch(proxyurl+url)
    .then(response => response.json())
    .then(contents => getRandom(contents.offers))
    .then(setInterval(nextOffer,2000))
    .catch((error) => console.log(error))

    function getRandom (offer) {
        // get random offers to initially populate the squares (no repeats)
        const num = offer.length;
        for (var a = [...Array(num).keys()], i = len; i--; ) {
            let image = document.createElement("img");
            let paragraph = document.createElement("p");
            let random = a.splice(Math.floor(Math.random() * (i + num - len+1)), 1)[0];
            let currOff = offer[random]; 
            image.src = currOff.imgURL;
            if (currOff.currency ==='PLN') {
                curr = 'zł';
            } else {
                curr = currOff.currency;
            }
            price = parseFloat(currOff.price).toFixed(2);
            paragraph.textContent = price + ' ' + curr;
            col[i].appendChild(image);
            col[i].appendChild(paragraph);
        }
    }
    let count = 0;
    function nextOffer() {
        // jumping border animation
        if (count !== 0) {
            col[count-1].classList.remove("highlighted");
        }
        if (count === len) {
            count = 0;
        }
        col[count].classList.add("highlighted");
        count ++;
    }
}

init();