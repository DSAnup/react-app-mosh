import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import "./App.css";

function App() {
  let items = ["New York", "Singapore", "Dhaka"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [alertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      {alertVisible && (
        <Alert onClose={() => setAlertVisibility(false)}>My Button</Alert>
      )}
      <Button color="primary" onClick={() => setAlertVisibility(true)}>
        Submit
      </Button>
    </div>
  );
}

export default App;
