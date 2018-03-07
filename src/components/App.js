import React from "react"
import Header from "./Header"
import Inventory from "./Inventory";
import Order from "./Order";

class App extends React.Component
{
    state = {
        fishes: {},
        order: {}

    };

    addFish = (fish) =>
    {
        // Take copy of existing state first
        const fishes = {...this.state.fishes}; // ... is ES6 object spread

        // Add new fish to the var
        fishes[`fish${Date.now()}`] = fish;

        // Push the copy of state into the real state
        this.setState({fishes: fishes });

        console.log("add fish");
    };

    render()
    {
        return (
          <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" />
            </div>
            <Order/>
            <Inventory addFish={this.addFish}/>
          </div>
        );
    }
}

export default App;