import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MyForm from './components/forms';
import ValidationForm from "./components/validationForm";

function App() {
	return (
		<div className="App">
			<ValidationForm />
			{/* <MyForm /> */}
		</div>
	);
}

export default App;
