import { spawn } from "child_process";
import path from "path";

const recordAudio = ({ context, onFinish }) => {

    const audioFile = path.join(context.extensionPath, "voice.wav");
    const soxPath = path.join(context.extensionPath, "helpers", "sox", "sox.exe");

    const sox = spawn(soxPath, [
        "-t", "waveaudio", "default",
        "-r", "16000",
        "-c", "1",
        "-b", "16",
        "-e", "signed-integer",
        audioFile,
        "trim", "0", "3"
    ]);

    sox.on("close", () => {
        onFinish(audioFile);
    });
};

export { recordAudio };