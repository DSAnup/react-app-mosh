import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import Like from "./components/Like";
import "./App.css";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {
  let items = ["New York", "Singapore", "Dhaka"];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const [drink, setDrink] = useState({
    title: "Americano",
    price: 5,
  });

  const [customer, setCustomer] = useState({
    name: "john",
    address: {
      city: "San Francisco",
      zipcode: 94111,
    },
  });

  const handleClick = () => {
    setDrink({ ...drink, price: 8 });
    setCustomer({
      ...customer,
      address: { ...customer.address, zipcode: 94588 },
    });
  };

  const [tags, setTags] = useState(["happy", "cheerful"]);
  const handleAddTags = () => {
    // Add
    setTags([...tags, "Existing"]);
  };

  const handleUpdateTags = () => {
    //Update
    setTags(tags.map((tag) => (tag === "happy" ? "happiness" : tag)));
  };

  const handleRemoveTags = () => {
    //Remove
    setTags(tags.filter((tag) => tag !== "happiness"));
  };

  const [bugs, setBugs] = useState([
    { id: 1, title: "Bug 1", fixed: false },
    { id: 2, title: "Bug 2", fixed: false },
  ]);

  const handleUpdateBugs = () => {
    // setBugs(
    //   bugs.map((bug) =>
    //     bug.id === 1 ? { ...bug, fixed: true, title: "Buging" } : bug
    //   )
    // );

    setBugs(
      produce((draft) => {
        const bug = draft.find((bug) => bug.id === 1);
        if (bug) bug.fixed = true;
      })
    );
  };

  const [alertVisible, setAlertVisibility] = useState(false);

  const [cartItems, setcartItems] = useState(["Product1", "Product2"]);

  return (
    <div>
      <NavBar cartItemsCount={cartItems.length} />
      <br />
      <Cart cartItems={cartItems} onClear={() => setcartItems([])} />
      <Like onClick={() => console.log("Clicked")} />
      <br />
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
      <br />
      <p>{drink.price}</p>
      <p>{customer.address.zipcode}</p>
      <button onClick={handleClick}>Change Price & Customer</button>
      <br />
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
      <button onClick={handleAddTags}>Add Tags </button> <br />
      <button onClick={handleUpdateTags}>Update Tags </button> <br />
      <button onClick={handleRemoveTags}>Remove Tags </button> <br />
      {bugs.map((bug) => (
        <li key={bug.id}>
          {bug.title} {bug.fixed ? "Fixed" : "New"}
        </li>
      ))}
      <button onClick={handleUpdateBugs}>Update Bugs </button> <br />
    </div>
  );
}

export default App;
