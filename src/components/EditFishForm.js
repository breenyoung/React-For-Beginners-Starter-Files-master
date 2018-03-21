import React from "react";
import PropTypes from "prop-types";

class EditFishForm extends React.Component
{
    nameRef = React.createRef();
    priceRef = React.createRef();
    statusRef = React.createRef();
    descRef = React.createRef();
    imageRef = React.createRef();

    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            price: PropTypes.number,
            desc: PropTypes.string,
            status: PropTypes.string
        }),
        index: PropTypes.string,
        updateFish: PropTypes.func
    };

    handleChange = (event) =>
    {
        console.log(event.currentTarget);

        // Update fish

        // Get copy of current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };

        console.log(updatedFish);
        this.props.updateFish(this.props.index, updatedFish);
    };

    editFish = (event) =>
    {
        event.preventDefault();

        const fish = {
            name: this.nameRef.value.value,
            price: parseFloat(this.priceRef.value.value),
            status: this.statusRef.value.value,
            desc: this.descRef.value.value,
            image: this.imageRef.value.value,
        }

        console.log(fish);
        this.props.addFish(fish);

        // Clear form after add
        event.currentTarget.reset();

    };

    render()
    {
        return (
            <form className="fish-edit">
                <input type="text" name="name" onChange={this.handleChange} value={this.props.fish.name} placeholder="Name"/>
                <input type="text" name="price" onChange={this.handleChange} value={this.props.fish.price} placeholder="Price"/>
                <select name="status" onChange={this.handleChange} value={this.props.fish.status}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea name="desc" onChange={this.handleChange} placeholder="Desc" value={this.props.fish.desc}/>
                <input type="text" name="image" onChange={this.handleChange} value={this.props.fish.image} placeholder="Image"/>
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </form>
        );
    }

}

export default EditFishForm;