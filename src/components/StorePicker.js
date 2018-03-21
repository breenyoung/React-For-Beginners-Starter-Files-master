import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { getFunName } from "../helpers";

class StorePicker extends React.Component
{
    static propTypes = {
        history: PropTypes.object
    };

    myInput = React.createRef();

    // Need to do this as a prop so we get 'this' context as our own methods don't get bound
    goToStore = (event) =>
    {
        event.preventDefault();

        // Get the input value
        const storeName = this.myInput.value.value;

        // Use Router component (it's a parent up the component chain) to switch to another page
        this.props.history.push(`/store/${storeName}`);
    };

    render()
    {
        return (
            <Fragment>
                <form className="store-selector" onSubmit={this.goToStore}>
                    <h2>Please enter a Store</h2>
                    <input type="text"
                           ref={this.myInput}
                           required
                           placeholder="Store Name"
                           defaultValue={getFunName()}/>
                    <button type="submit">Visit Store</button>
                </form>
            </Fragment>
        );
    }
}

export default StorePicker;