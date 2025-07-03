window.addEventListener("DOMContentLoaded", () => {
  const speechOutput = document.getElementById("speechOutput");
  const theRecordButton = document.querySelector(".theRecordBtn");
  const recordEndButton = document.querySelector(".recordEndButton");
  const recordStartButton = document.querySelector(".recordButton");
  const theSearch = document.querySelector(".searchBtn");

  let isRecording = false;
  let finalTranscript = "";
  const LANG = "en-US";

  const speechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition;

  if (typeof speechRecognition !== "undefined") {
    const recognition = new speechRecognition();
    recognition.lang = LANG;
    recognition.continuous = true;
    recognition.interimResults = true;

    const onResult = (event) => {
      let tempRes = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + "";
        } else {
          tempRes += transcript;
        }
      }
      speechOutput.value = finalTranscript + tempRes;
    };

    const onClick = (event) => {
      if (isRecording) {
        recognition.stop();
        recordStartButton.style.display = "block";
        recordEndButton.style.display = "none";
      } else {
        recognition.start();
        recordStartButton.style.display = "none";
        recordEndButton.style.display = "block";
      }
      isRecording = !isRecording;
    };

    recognition.addEventListener("result", onResult);
    theRecordButton.addEventListener("click", onClick);
    theSearch.addEventListener("click", () => {});
  }
});
