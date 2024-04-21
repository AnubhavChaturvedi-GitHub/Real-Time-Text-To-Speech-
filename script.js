const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
let synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        let option = document.createElement('option');
        option.textContent = voice.name + ' (' + voice.lang + ')';
        option.setAttribute('value', voice.name);
        voiceSelect.appendChild(option);
    });
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}

textInput.addEventListener('input', () => {
    let text = textInput.value;
    let selectedVoice = voiceSelect.selectedOptions[0].getAttribute('value');
    let utterance = new SpeechSynthesisUtterance(text);

    // Find the selected voice
    voices.forEach(voice => {
        if (voice.name === selectedVoice) {
            utterance.voice = voice;
        }
    });

    // Speak the text
    synth.cancel(); // Cancel any ongoing speech
    synth.speak(utterance);
});