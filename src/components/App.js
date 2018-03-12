import React from "react"
import Header from "./Header"
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from "./Fish";
import base from "../base";

import sampleFishes from "../sample-fishes";

class App extends React.Component
{
    state = {
        fishes: {},
        order: {}
    };

    componentDidMount()
    {
        console.log("mounted");
        const { params } = this.props.match;

        this.ref = base.syncState(`${params.storeId}/fishes`,
            {
                context: this,
                state: "fishes"
            }
        );

        // Reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef)
        {
            this.setState({ order: JSON.parse(localStorageRef) });
        }
    }

    componentDidUpdate()
    {
        const { params } = this.props.match;
        localStorage.setItem(params.storeId, JSON.stringify(this.state.order));

        console.log("component update");
    }

    componentWillUnmount()
    {
        console.log("unmounted");
        base.removeBinding(this.ref);

    }

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

    updateFish = (key, updatedFish) =>
    {
        // Take a copy of the cur state
        const fishes = { ...this.state.fishes };

        // Update the state
        fishes[key] = updatedFish;

        // Set to real state
        this.setState({fishes: fishes});
    };

    deleteFish = (key) =>
    {
        // Take a copy of the cur state
        const fishes = { ...this.state.fishes };

        // Update the state
        fishes[key] = null;

        this.setState({fishes: fishes});
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

    deleteFromOrder = (key) =>
    {
        // Take copy of state
        const order = {...this.state.order};

        delete order[key];

        // Call setState to update state object
        this.setState({order: order});

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
            <Order fishes={this.state.fishes} order={this.state.order} deleteFromOrder={this.deleteFromOrder}/>
            <Inventory addFish={this.addFish}
                       updateFish={this.updateFish}
                       deleteFish={this.deleteFish}
                       loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes}/>
          </div>
        );
    }
}

export default App;