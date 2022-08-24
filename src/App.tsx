import React, { useEffect } from 'react';

function App() {

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);

  useEffect(() => {
  window.addEventListener("beforeinstallprompt", (event) => {
    // Prevent the mini-infobar from appearing on mobile.
    event.preventDefault();
    console.log("👍", "beforeinstallprompt", event);
    // Stash the event so it can be triggered later.
    (window as any).deferredPrompt = event;
    // Remove the 'hidden' class from the install button container.
    setIsReadyForInstall(true);
  });
  }, []);
 
  const downloadApp = async () =>{
    console.log("👍", "butInstall-clicked");
    const promptEvent = (window as any).deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    (window as any).deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  return (
    <div className="App">
      <span>hola</span>
      {isReadyForInstall && <button onClick={downloadApp}>descargar</button>}
    </div>
  );
}

export default App;
