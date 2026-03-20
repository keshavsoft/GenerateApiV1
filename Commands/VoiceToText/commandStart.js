import * as vscode from "vscode";
import { recordAudio } from "./recordAudio.js";
import { transcribeAudio } from "./transcribeAudio.js";

const StartFunc = (context) => {
    vscode.window.showInformationMessage("🎤 Recording started...");

    recordAudio({
        context,
        onFinish: (audioFile) => {

            vscode.window.showInformationMessage("🔎 Converting voice to text...");

            transcribeAudio({
                context,
                audioFile,
                onText: (text) => {

                    vscode.window.showInformationMessage(text);
                }
            });
        }
    });
};

export { StartFunc };