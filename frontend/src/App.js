import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<HomePage/>} />
				<Route path="/search" element={<SearchPage/>} />
			</Routes>
		</Router>
	);
}

export default App;
