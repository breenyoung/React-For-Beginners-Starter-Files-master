import React from "react"
import Header from "./Header"
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";

import sampleFishes from "../sample-fishes";

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

    loadSampleFishes = () => {
        this.setState({ fishes: sampleFishes });
    };

    addToOrder = (key) => {

        // Take copy of state
        const order = {...this.state.order}; // ES6 object spread

        // Add to order or update the quantity of existing item
        order[key] = order[key] + 1 || 1; // Either add one if it exists or set it to 1 on add

        // Call setState to update state object
        this.setState({order});

    };

    render()
    {
        return (
          <div className="catch-of-the-day">
            <div className="menu">
                <Header tagline="Fresh Seafood Market" />
                <ul className="fishes">
                    {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} index={key}/>)}
                </ul>
            </div>
            <Order fishes={this.state.fishes} order={this.state.order}/>
            <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes}/>
          </div>
        );
    }
}

export default App;