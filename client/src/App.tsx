import { Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { ThemeProvider } from "./components/theme-provider";
import './App.css';

function App() {
  return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</ThemeProvider>
		</>
	);
}

export default App
