const { app, BrowserWindow } = require('electron');
const path = require('path');

app.disableHardwareAcceleration(); // Menos consumo de GPU
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors'); // Evita processos extras do Chromium

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    title: "Chess.com Desktop",
    backgroundColor: '#000000', // Evita tela branca ao carregar
    icon: path.join(__dirname, 'icon.ico'), // <- ícone da janela
    autoHideMenuBar: true, // Remove menu
    webPreferences: {
      partition: 'persist:chesscom', // Perfil persistente pra manter login
      sandbox: true, // Segurança e leveza
      devTools: false, // Desativa ferramentas de dev
      nodeIntegration: false, // Menos processos
      contextIsolation: true, // Isolamento seguro
    }
  });

  win.loadURL('https://www.chess.com');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
