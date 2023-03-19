import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button/Button";
import ListGroup from "./components/ListGroup";
import Like from "./components/Like";
import "./App.css";
import produce from "immer";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ExpandableText from "./components/ExpandableText";

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

  const [games, setGame] = useState({
    id: 1,
    player: {
      name: "john",
    },
  });

  const handleUpdateGames = () => {
    setGame({ ...games, player: { ...games.player, name: "Bob" } });
    console.log(games.player.name);
  };

  const [cart, setCart] = useState({
    discount: 0.1,
    items: [
      { id: 1, title: "Product 1", quantity: 1 },
      { id: 2, title: "Product 2", quantity: 5 },
    ],
  });

  const handleUpdateCart = () => {
    setCart({
      ...cart,
      items: cart.items.map((item) =>
        item.id === 1 ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  };
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
      {games.player.name}
      <button onClick={handleUpdateGames}>Update Game </button> <br />
      {cart.items.map((item) => (
        <li key={item.id}>
          {item.title} - {item.quantity}
        </li>
      ))}
      <button onClick={handleUpdateCart}>Update Cart </button> <br />
      <ExpandableText>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </ExpandableText>
    </div>
  );
}

export default App;
