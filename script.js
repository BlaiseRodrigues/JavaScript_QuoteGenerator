const quoteConatiner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
loader.hidden = true;
// loading animation
function loading() {
    loader.hidden = false;
    quoteConatiner.hidden = true;
}

// Hide loading 
function complete() {
    if(!loader.hidden) {
        quoteConatiner.hidden = false;
        loader.hidden = true;
    }
}

// Get Quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank add Unknown
        if (data.quoteAuthor == ''){
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }
        // Reduce font size
        if (data.quoteText.lenght>50) {
            quiteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // stop loader once content is loaded
        complete();

    } catch (error) {
        getQuote();
    }
}

// Tweet quote
function tweetQuote() {s
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();