// Text to speech
var textToSpeech = window.speechSynthesis;

function textSpeech() {
    var text = document.getElementById("txt");
    var startButton = document.getElementById("btn1");
    var stopButton = document.getElementById("btn2");
    var reButton = document.getElementById("btn3");

    var voiceTypes = document.querySelector("option");

    function checkText() {
        if(!text.value) {
            alert("Enter some text");
        }
    }

    function checkVoice() {
        if(voiceTypes.getAttribute("alert") === voice.value) {
            alert("Select type of voice");
            return true;
        }
    }

    function check() {
        if(checkVoice()) return;
        checkText();
    }

    var startUsed = false;
    var stopUsed = false;

    startButton.addEventListener("click", function() {
        if(text.value) startUsed = true;
        var arr = [];
        arr[0] = textToSpeech.getVoices()[0];
        arr[0].value = "Female";
        arr[1] = textToSpeech.getVoices()[4];
        arr[1].value = "Male";
        arr[2] = textToSpeech.getVoices()[8];
        arr[2].value = "Indian Voice Female";

        check();

        arr.forEach((voi) => {
            if(voi.value === voice.value) {
                var shouldSpeak = new SpeechSynthesisUtterance(text.value+"harsha");
                shouldSpeak.lang = voi.name;
                shouldSpeak.voice = voi;
            }
        })
    });

    stopButton.addEventListener("click", function() {
        check();
        stopUsed=true;
        if(!startUsed && text.value) {
            alert("You can stop only when you start");
            return;
        }
        textToSpeech.pause();
    });

    reButton.addEventListener("click", function() {
        check();
        if(!startUsed && text.value) {
            alert("Press start button");
            return;
        }
        if(!stopUsed && text.value && startUsed) {
            alert("You can resume only when you stop");
            return;
        }
        textToSpeech.resume();
    }); 
}


// speech to text
function speechToText() {
    var speech = window.webkitSpeechRecognition;
    var recog = new speech();

    var listen = document.getElementById("startListen");
    var notify = document.getElementById("notifier");
    var pause = document.getElementById("paused");

    recog.continuous= true;


    recog.onresult = function(event) {
        var content = '';
        var present = event.resultIndex;
        notify.innerHTML = "Recording voice...";

        var trans = event.results[present][0].transcript;


        var mobileRepeatBug = (present == 1 && trans == event.results[0][0].transcript);

        if(!mobileRepeatBug) {
            content += trans;
            document.getElementById("addNotes").innerHTML += content;
        }
         
    } 

    pause.addEventListener("click", function() {
        recog.onspeechend = function() {
            recog.stop();
            notify.innerHTML = "Speech Recognition is stopped, press start to continue.";
        }
        recog.onspeechend();
    });

    recog.onstart = function() {
        notify.innerHTML = "Speek something.";
    }

    recog.onspeechend = function() {
        notify.innerHTML = "Speech ends.";
    }

    recog.onerror = function(event) {
        if(event.error==="no-speech") {
            notify.innerHTML = "No speech detected.";
        }
    }

    listen.addEventListener("click", () => recog.start());
}

// Repeat your words

function repeater() {
    const start = document.getElementById("mic");
    var speech = window.webkitSpeechRecognition;
    var recog = new speech();

    const notify = document.getElementById("news");
    const div = document.getElementById("divider");
    const stop = document.getElementById("stop");

    recog.continuous= true;

    
    var content = '';
    var enter = false;
    
    recog.onresult = function(event) {
        div.className = "listener";
        var present = event.resultIndex;
        notify.innerHTML = "Listening...";

        var trans = event.results[present][0].transcript;


        var mobileRepeatBug = (present == 1 && trans == event.results[0][0].transcript);

        if(!mobileRepeatBug) {
            content += trans;
        }
    }

    if(!enter) {
        stop.addEventListener("click", function() {
            enter=true;
            recog.onspeechend = function() {
                div.className = "stop";
                recog.stop();
                notify.innerHTML = "Speech Recognition is stopped.";
                setTimeout(function() {
                    notify.innerHTML = "Press on the Mic to start again.";
                }, 5000);
            }
            recog.onspeechend();
            audioSound();
            content = '';
        });
    }
    
    recog.onstart = function() {
        notify.innerHTML = "Speek something.";
    }

    recog.onspeechend = function() {
        div.className = "stop";
        notify.innerHTML = "Speech ends, press on the Mic to start again.";
        if(content) audioSound();
        content = '';
    }

    recog.onerror = function(event) {
        if(event.error==="no-speech") {
            notify.innerHTML = "No speech detected, Press on the Mic to start again.";
        }
    }

    function audioSound() {

        function checkText() {
            if(!content) {
                alert("No voice has detected from user, speak loud.");
            }
        }
    
        function check() {
            checkText();
        }
  
        check();

        var arr = [];
        
        arr[0] = textToSpeech.getVoices()[0];
        arr[0].value = "Female";
        arr[1] = textToSpeech.getVoices()[4];
        arr[1].value = "Male";
        arr[2] = textToSpeech.getVoices()[8];
        arr[2].value = "Indian Voice Female";

        var selector = document.getElementById("voice");
        selector.id = content;
        notify.innerHTML = "To listen your speech select type of voices.";
        var con = selector.id;
        selector.addEventListener("change", function() {
            arr.forEach((voi) => {
                if(voi.value === this.value) {
                    var shouldSpeak = new SpeechSynthesisUtterance(con);
                    shouldSpeak.lang = voi.name;
                    shouldSpeak.voice = voi;
                    textToSpeech.speak(shouldSpeak);
                }
            });
        });
    }

    start.addEventListener("click", () => recog.start());
}

// play

function play() {
    var speech = window.webkitSpeechRecognition;
    var recog = new speech();

    var notify = document.getElementById("notifyPlay");

    recog.continuous= true;


    recog.onresult = function(event) {
        var content = '';
        var present = event.resultIndex;
        notify.innerHTML = "Recording voice..."; 

        var trans = event.results[present][0].transcript;

        var mobileRepeatBug = (present == 1 && trans == event.results[0][0].transcript);

        if(!mobileRepeatBug) {
            content = trans;
            
            var colors = ["red", "blue", "green", "yellow", "pink", "grey", "gold", "aqua", "purple", "black", "white", "lime", "brown", "navy", "orange", "skyblue"], count = 0;
            colors.forEach((color) => {
                if(!content.includes(color)) {
                    count++;
                }
            });

            var arr = content.split(" on "),color,pos;

            if(arr.length==2) {
                color = arr[0], pos = arr[1]; 
            }

            setTimeout(function() {
                notify.innerHTML = content;
                try {
                    var position = document.getElementById(pos);
                    position.className = color;
                    if(count==16) {
                        notProper();
                    }
                }
                catch {
                    notProper();
                }
            }, 1500);
        } 

        function notProper() {
            if(content.substring(1).split(" ").length==1) {
                notify.innerHTML += " word is Inappropriate.";
            }
            else {
                notify.innerHTML += " words are Inappropriate.";
            }
        }
         
    }

    recog.onstart = function() {
        notify.innerHTML = "Speek the words specified in instructions.";
    }

    recog.onspeechend = function() {
        notify.innerHTML = "Speech ends.";
    }

    recog.onerror = function(event) {
        if(event.error==="no-speech") {
            notify.innerHTML = "No speech detected.";
        }
    }

    recog.start();
}

// instructions

function instruct() {
    var speech = window.webkitSpeechRecognition;
    var recog = new speech();

    recog.continuous= true;

    recog.onresult = function(event) {
        var content = '';
        var present = event.resultIndex;

        var trans = event.results[present][0].transcript;

        var mobileRepeatBug = (present == 1 && trans == event.results[0][0].transcript);

        if(!mobileRepeatBug) {
            content = trans;
            if(content[0] === " ") content = content.substring(1);
            if(content == "scroll down" || content == "move down") {
                scrollBy(0, 100);
            }
            else if(content == "scroll up" || content == "move up") {
                scrollBy(0, -100);
            }
            else if(content == "get back") {
                window.location.href = "file:///C:/Users/HARSHA%20VARMA/Documents/visual%20studio/z%20to%20m/recognitionApp/play.html?";
            }
        }
         
    } 
    
    recog.start();
}