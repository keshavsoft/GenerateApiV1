import { spawn } from "child_process";
import path from "path";

const transcribeAudio = ({ context, audioFile, onText }) => {

    const whisperPath = path.join(context.extensionPath, "helpers", "Release", "whisper-cli.exe");
    const modelPath = path.join(context.extensionPath, "helpers", "models", "ggml-tiny.en.bin");

    const whisper = spawn(whisperPath, [
        "-m", modelPath,
        "-f", audioFile,
        "-l", "en",
        "--no-timestamps"
    ]);

    let text = "";

    whisper.stdout.on("data", (data) => {
        text += data.toString();
    });

    whisper.on("close", () => {
        onText(text.trim());
    });
};

export { transcribeAudio };