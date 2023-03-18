import Button from "./components/Button";

function App() {
  return (
    <div>
      <Button color="primary" onClick={() => console.log("Clicked")}>
        Submit
      </Button>
    </div>
  );
}

export default App;
