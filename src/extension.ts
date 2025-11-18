import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  // vscode.window.showInformationMessage('Trans highlighter is active');

  // console.log('Trans highlighter is active (check console)');

  const transFlagTextDecoration = vscode.window.createTextEditorDecorationType({
    fontWeight: 'bold',
    textDecoration: `none; 
      background: linear-gradient(to bottom, #5BCEFA 0%, #5BCEFA 30%, #F5A9B8 30%, #F5A9B8 45%, #FFFFFF 45%, #FFFFFF 55%, #F5A9B8 55%, #F5A9B8 70%, #5BCEFA 70%, #5BCEFA 100%);
      -webkit-background-clip: text;
      color: transparent;`
  });

  function updateDecorations(editor: vscode.TextEditor) {
    if (!editor) {return;};

    const text = editor.document.getText();
    const regEx = /\b\w*trans\w*\b/gi;
    const decorations: vscode.DecorationOptions[] = [];

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

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(editor => {
      if (editor) {updateDecorations(editor);};
    }),
    vscode.workspace.onDidChangeTextDocument(event => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateDecorations(editor);
      }
    })
  );
}

export function deactivate() {}
