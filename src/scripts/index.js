const btn = document.querySelector('.talk');
const content = document.querySelector('#user');
var isChromium = window.chrome;
var winNav = window.navigator;
var vendorName = winNav.vendor;
var isOpera = typeof window.opr !== "undefined";
var isIEedge = winNav.userAgent.indexOf("Edge") > -1;
var isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome) {
	// is Google Chrome on IOS
} else if (
	isChromium !== null &&
	typeof isChromium !== "undefined" &&
	vendorName === "Google Inc." &&
	isOpera === false &&
	isIEedge === false
) {
	// is Google Chrome
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
	const recognition = new SpeechRecognition();

	recognition.onstart = function () {
		console.log('voice is activated, you can speak to microphone');
		;
	}

	recognition.onresult = function (event) {
		const current = event.resultIndex;
		const transcript = event.results[current][0].transcript;
		content.textContent = transcript;
		output(transcript);
	};

	//Add the listener to the button
	btn.addEventListener('click', () => {
		recognition.start();
	});



} else {
	// not Google Chrome 
	btn.style.display = "none";
}




const trigger = [
	["hi", "hey", "hello"],
	["how are you", "how is life", "how are things"],
	["what are you doing", "what is going on"],
	["how old are you"],
	["who are you", "are you human", "are you bot", "are you human or bot"],
	["who created you", "who made you"],
	["your name please", "your name", "may i know your name", "what is your name"],
	["i love you"],
	["happy", "good"],
	["bad", "bored", "tired"],
	["help me", "tell me story", "tell me joke"],
	["ah", "yes", "ok", "okay", "nice", "thanks", "thank you"],
	["bye", "good bye", "goodbye", "see you later"]
];
const reply = [
	["Hi! Hope you are having a good day.", "Hey", "Hello"],
	["Fine", "Pretty well", "Fantastic"],
	["Nothing much", "About to go to sleep", "Can you guest?", "I don't know actually"],
	["I am 1 day old"],
	["I'm Ro. Nice to meet you."],
	["Nilarjun Das", "My God Nilarjun Das"],
	["I am Ro", "My name is Ro."],
	["I love you too", "Me too"],
	["Have you ever felt bad?", "Glad to hear it"],
	["Why?", "Why? You shouldn't!", "Try watching TV"],
	["I will", "What about?"],
	["Hmm", "You are welcome"],
	["Bye", "Goodbye", "See you later"]
];

let key;
let input;

const defualtReply = ["Haha...", "Eh..."];
document.querySelector("#input").addEventListener("keypress", function (e) {
	key = e.which || e.keyCode;
	if (key === 13) { //Enter button
		input = document.getElementById("input").value;
		document.getElementById("user").innerHTML = input;
		output(input);
	}
});

let product;

const output = (input) => {
	try {
		product = input + "=" + eval(input);
	} catch (e) {
		text = (input.toLowerCase()).replace(/[^\w\s\d]/gi, ""); //remove all chars except words, space and 
		text = text.replace(/ a /g, " ").replace(/i feel /g, "").replace(/whats/g, "what is").replace(/please /g, "").replace(/ please/g, "");
		if (compare(trigger, reply, text)) {
			product = compare(trigger, reply, text);
		} else {
			product = defualtReply[Math.floor(Math.random() * defualtReply.length)];
		}
	}
	document.getElementById("chatbot").innerHTML = product;
	readOutLoud(product);
	document.getElementById("input").value = ""; //clear input value
}
const compare = (arr, array, string) => {
	var item;
	for (var x = 0; x < arr.length; x++) {
		for (var y = 0; y < array.length; y++) {
			if (arr[x][y] == string) {
				items = array[x];
				item = items[Math.floor(Math.random() * items.length)];
			}
		}
	}
	return item;
}

const speech = new SpeechSynthesisUtterance();

const readOutLoud = (message) => {
	speech.volume = 1;
	speech.rate = 1;
	speech.pitch = 10;
	speech.text = message;
	window.speechSynthesis.speak(speech);
}

function speakVoice() {
	const voices = this.getVoices();
	speech.voice = voices[1];
};

speechSynthesis.addEventListener('voiceschanged', speakVoice);