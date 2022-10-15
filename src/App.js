import './App.css';
import Layout from "./features/Layout";
import { ThemeProvider } from "styled-components";
import { lightTheme } from './theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Layout />
      </ThemeProvider>
    </div>
  );
}

export default App;
