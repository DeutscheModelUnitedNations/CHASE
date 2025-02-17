const vscode = require("vscode");

module.exports.macroCommands = {
  OpenI18n: {
    no: 1,
    func: async () => {
      openI18nFile("/workspaces/munify/chase/frontend/i18n/en/index.ts");
      setTimeout(async () => {
        await vscode.commands.executeCommand(
          "workbench.action.moveEditorToNextGroup",
        );
      }, 500);
      setTimeout(() => {
        openI18nFile("/workspaces/munify/chase/frontend/i18n/de/index.ts");
      }, 500);
    },
  },
};

async function openI18nFile(filename) {
  const document = await vscode.workspace.openTextDocument(filename);
  await vscode.window.showTextDocument(document);
  await vscode.commands.executeCommand("workbench.action.files.save");
}
