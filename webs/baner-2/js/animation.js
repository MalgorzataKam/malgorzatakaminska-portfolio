let textCont = document.querySelector('.text-container');
let imgCont = document.querySelector('.img-container');
// used to manipulate next-prev slides
let counti = 0;
let countp = 0;
const len = 3; // how many images we want to display
let stop = 'false'; // to enable stopping the automatic slider

function closeBaner() {
    document.querySelector('.baner').style.display = 'none';
}

const imgs = imgCont.childNodes;
const paras = textCont.childNodes;

function goToNext() {
    showNext();
    stop = 'true';
}

function backToPrev() {
    imgs[counti].classList.add('hidden');
    paras[countp].classList.add('hidden');
    paras[countp +1].classList.add('hidden');
    if (counti === 0) {
        counti = len-1;
        countp = len*2-2;
    } else {counti--; countp -= 2}
    imgs[counti].classList.remove('hidden');
    paras[countp].classList.remove('hidden');
    paras[countp+1].classList.remove('hidden');
    stop = 'true';
}

function showNext() {
    imgs[counti].classList.add('hidden');
    paras[countp].classList.add('hidden');
    paras[countp +1].classList.add('hidden');
    if (counti === len-1) {
        counti = 0;
        countp = 0;
    } else {counti++; countp += 2}
    imgs[counti].classList.remove('hidden');
    paras[countp].classList.remove('hidden');
    paras[countp+1].classList.remove('hidden');
}

async function init () {
    // added proxy to get around CORS issues for local development
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://rekrutacjartb.pl/developer/banner.json"
    
    var nextSlide = setInterval(nextOfferAuto,2000);
    fetch(proxyurl+url)
    .then(response => response.json())
    .then(contents => getRandom(contents.offers))
    .then(nextSlide)
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

    function getRandom (offer) {
        // get 3 random offers to populate the slider
        const num = offer.length;
        for (var a = [...Array(num).keys()], i = len; i--; ) {
            let image = document.createElement("img");
            let par1 = document.createElement("p");
            let par2 = document.createElement("p");
            let random = a.splice(Math.floor(Math.random() * (len + 1)), 1)[0];
            let currOff = offer[random]; 
            image.src = currOff.imgURL;
            if (i !== len-1) {
                image.className = 'hidden';
                par1.className = 'hidden';
                par2.className = 'hidden';
            }
            if (currOff.currency ==='PLN') {
                curr = 'zł';
            } else {
                curr = currOff.currency;
            }
            price = parseFloat(currOff.price).toFixed(2);
            par1.textContent = currOff.name;
            par2.textContent = price + ' ' + curr;
            imgCont.appendChild(image);
            textCont.appendChild(par1);
            textCont.appendChild(par2);
            par1.classList.add('p1');
            par2.classList.add('p2');
        }
    }

    function nextOfferAuto() {
        if (stop === 'true') {
            clearInterval(nextSlide);
            return;
        }
        showNext();
    }
}

init();