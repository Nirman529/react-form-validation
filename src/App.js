import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyForm from './components/forms';
import ValidationForm from "./components/validationForm";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";

function App() {
	return (
		<div className="App row m-0">
			{/* <ValidationForm /> */}
			{/* <MyForm /> */}

			<div className="col">
				<Counter1 />
			</div>
			<div className="col">
				<Counter2 />
			</div>
		</div>
	);
}

export default App;
