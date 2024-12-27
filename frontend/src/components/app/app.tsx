import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '..'
import { Home, Login, Register } from '../../pages'

const route = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/login',
				element: <Login />,
			},
		],
	},
])
function App() {
	return (
		<>
			<RouterProvider router={route} />
		</>
	)
}

export default App
