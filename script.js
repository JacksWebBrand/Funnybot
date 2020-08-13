const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Button toggle
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing the joke text to the voiceRSS api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '187c37c75f084ec083f68bbf022bd03a', // you should always store api keys on the back end where it matters!
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
});
}

// Get jokes from joke api
async function getJokes() {        
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Dark,Pun';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (err) {
        console.log('ERROR caught in getJokes, ', err)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);