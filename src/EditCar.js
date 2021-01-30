import React from 'react';
import axios from 'axios';
class EditCar extends React.Component {
    state = {
        model: this.props.car.model,
        price: this.props.car.price,
        rating: this.props.car.rating,
        type: this.props.car.type,
        image: this.props.car.image,
        company_id: this.props.car.company_id,
      }

      handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        })
      }
    
      updateCar = (event) => {
        event.preventDefault()
        event.target.reset()
        const id = event.target.id
        console.log(id)
        axios.put('https://vroomies.herokuapp.com/companies/' + id, this.state).then((response) => {
        })
      }

    render() {
        return (
            <div>
        <div className="company" >
          <h4>Model: {this.state.model}</h4>
          <h5>Price:$ {this.state.price}</h5>
          <h5>Rating: {this.state.rating}</h5>
          <h5>Type: {this.state.type}</h5>
          <h5>Image: {this.state.image}</h5>
          <h5>Company Id: {this.state.company_id}</h5>
          <details>
            <summary>Customize This Car</summary>
            <form id={this.props.car.id} onSubmit={this.updateCar}>
              <label htmlFor="model">Model:</label>
              <input type="text" id="model" onChange={this.handleChange} />
              <br />
              <label htmlFor="price">Price:$</label>
              <input type="text" id="price" onChange={this.handleChange} />
              <br />
              <label htmlFor="rating">Rating:</label>
              <input type="text" id="rating" onChange={this.handleChange} />
              <br />
              <label htmlFor="type">Type:</label>
              <input type="text" id="type" onChange={this.handleChange} />
              <br />
              <label htmlFor="image">Image:</label>
              <input type="text" id="image" onChange={this.handleChange} />
              <br />
              <label htmlFor="company_id">Company Id:</label>
              <input type="text" id="company_id" onChange={this.handleChange} />
              <br />
              <input type="submit" value="Submit Your Specs" />
            </form>
          </details>
        </div>

      </div>
    )
  }
}


export default EditCar;