import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyForm from './components/forms';
import ValidationForm from "./components/validationForm";
import Counter1 from "./components/Counter1";
import Counter2 from "./components/Counter2";

function App() {
	return (
		<div className="App">
			{/* <ValidationForm /> */}
			{/* <MyForm /> */}
			<Counter1 />
			<Counter2 />
		</div>
	);
}

export default App;
