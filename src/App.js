import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyForm from './components/forms';
import { useEffect, useRef } from "react";

function App() {
	const count = useRef(0)
	useEffect(() => {
		count.current = count.current + 1;
	})
	return (
		<>
			<div className="App row m-0">
				{/* <ValidationForm /> */}
				<MyForm />

			</div>
		</>
	);
}

export default App;
