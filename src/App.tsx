import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  return (
    <div>
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
