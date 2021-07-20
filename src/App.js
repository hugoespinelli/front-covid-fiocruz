import './App.css';
import { SnackbarProvider } from 'notistack';

import SearchSamples from './pages/search_samples';

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <SearchSamples />
      </SnackbarProvider>
    </div>
  );
}

export default App;
