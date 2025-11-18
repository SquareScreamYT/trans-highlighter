"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    // vscode.window.showInformationMessage('Trans highlighter is active');
    // console.log('Trans highlighter is active (check console)');
    const transFlagTextDecoration = vscode.window.createTextEditorDecorationType({
        fontWeight: 'bold',
        textDecoration: `none; 
      background: linear-gradient(to bottom, #5BCEFA 0%, #5BCEFA 30%, #F5A9B8 30%, #F5A9B8 45%, #FFFFFF 45%, #FFFFFF 55%, #F5A9B8 55%, #F5A9B8 70%, #5BCEFA 70%, #5BCEFA 100%);
      -webkit-background-clip: text;
      color: transparent;`
    });
    function updateDecorations(editor) {
        if (!editor) {
            return;
        }
        ;
        const text = editor.document.getText();
        const regEx = /\b\w*trans\w*\b/gi;
        const decorations = [];
        let match;
        while ((match = regEx.exec(text))) {
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);
            decorations.push({ range: new vscode.Range(startPos, endPos) });
        }
        editor.setDecorations(transFlagTextDecoration, decorations);
    }
    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            updateDecorations(editor);
        }
        ;
    }), vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            updateDecorations(editor);
        }
    }));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map