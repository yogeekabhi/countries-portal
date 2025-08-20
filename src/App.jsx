import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import Dashboard from './pages/Dashboard';

function App() {
	return (
		<Router>
			<Routes>
				{/* Default route redirects to login */}
				<Route path='/' element={<Navigate to='/login' />} />

				{/* Login Page */}
				<Route path='/login' element={<SignInPage />} />

				{/* Dashboard Page */}
				<Route path='/dashboard' element={<Dashboard />} />

				{/* Catch-all route (404) */}
				<Route path='*' element={<h2>Page Not Found</h2>} />
			</Routes>
		</Router>
	);
}

export default App;
