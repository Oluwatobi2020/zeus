import { useEffect, useRef, useState } from "react";

import { AudioLines, Mic } from "lucide-react";
import toast from "react-hot-toast";

function MicroPhone({ updateMessage, setInterimMessage }) {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const handleStartRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Speech Recognition is not supported.", {
        id: "speech-error",
      });
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalText = "";
        let tempInterim = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalText += transcript + " ";
          } else {
            tempInterim += transcript;
          }
        }

        if (finalText.trim()) {
          updateMessage(finalText.trim());
        }

        setInterimMessage(tempInterim);
      };

      recognition.onerror = () => {
        toast.error("Speech recognition error.");
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
        setInterimMessage("");
      };

      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch {
      toast.error("Could not start recognition.");
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setInterimMessage("");
    }
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  return (
    <>
      {isRecording ? (
        <button onClick={handleStopRecording} type="button" className=" mr-2 text-black dark:text-white">
          <AudioLines size={20} />
        </button>
      ) : (
        <button
          onClick={handleStartRecording}
          type="button"
          className="mr-2 text-black dark:text-white"
        >
          <Mic size={20} />
        </button>
      )}
    </>
  );
}

export default MicroPhone;
