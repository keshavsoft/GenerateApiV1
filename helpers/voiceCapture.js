import { spawn } from "child_process";
import path from "path";
import * as vscode from "vscode";

const device =
    "Microphone Array (Intel® Smart Sound Technology for Digital Microphones)";

const StartVoiceCapture = (context) => {
    const audioFile = path.join(context.extensionPath, "voice.wav");

    const soxPath = path.join(
        context.extensionPath,
        "helpers",
        "sox",
        "sox.exe"
    );

    const sox = spawn(soxPath, [
        "-t", "waveaudio",
        device,
        "-r", "16000",
        "-c", "1",
        audioFile
    ]);

    // const sox1 = spawn("sox", [
    //     "-t", "waveaudio",
    //     device,
    //     "-r", "16000",
    //     "-c", "1",
    //     audioFile
    // ]);

    sox.on("error", (err) => {
        console.log("SOX ERROR:", err);
    });

    setTimeout(() => {

        sox.kill("SIGINT");

        const whisperPath = path.join(
            context.extensionPath,
            "helpers",
            "Release",
            "whisper-cli.exe"
        );

        const modelPath = path.join(
            context.extensionPath,
            "helpers",
            "models",
            "ggml-tiny.en.bin"
        );

        const whisper = spawn(
            whisperPath,
            [
                "-m", modelPath,
                "-f", audioFile,
                "--no-timestamps"
            ]
        );

        whisper.on("error", (err) => {
            console.log("WHISPER ERROR:", err);
        });

        let text = "";

        whisper.stdout.on("data", (data) => {
            text += data.toString();
        });

        whisper.on("close", () => {

            const finalText = text.trim();

            console.log("TEXT:", finalText);

            vscode.window.showInformationMessage(finalText);

        });

    }, 3000);

};

export { StartVoiceCapture };