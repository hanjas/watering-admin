import { useEffect, useState } from 'react';
import './App.css';
import Main from './components/Main';

function FlashScreen() {
  return (
    <div className="flex justify-center items-center h-screen">
      Admin App
    </div>
  )
}

function App() {

  const [flashScreen, setFlashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setFlashScreen(false);
    }, 1000);
  }, []);

  if (flashScreen)  return <FlashScreen />

  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
