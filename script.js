let speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.getElementById('voiceSelect');
const listenBtn  = document.getElementById('listenBtn');
const textInput  = document.getElementById('textInput');

window.speechSynthesis.onvoiceschanged = () => {
  voices = window.speechSynthesis.getVoices();
  speech.voice = voices[0];
  voices.forEach((voice, i) => {
    voiceSelect.options[i] = new Option(voice.name, i);
  });
};

voiceSelect.addEventListener('change', () => {
  speech.voice = voices[voiceSelect.value];
});

listenBtn.addEventListener('click', () => {
  const text = textInput.value.trim();
  if (!text) return;

  window.speechSynthesis.cancel();
  speech.text = text;

  speech.onstart = () => { listenBtn.disabled = true; };
  speech.onend   = () => { listenBtn.disabled = false; };

  window.speechSynthesis.speak(speech);
});
