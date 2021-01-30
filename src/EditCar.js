import React from 'react';
import axios from 'axios';
class EditCar extends React.Component {
    state = {
        name: this.props.car.name,
        description: this.props.car.description,
        image: this.props.car.image,
        country: this.props.car.country,
        parent_id: this.props.car.image,
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
          <h4>Name: {this.state.name}</h4>
          <h5>Discription: {this.state.description}</h5>
          <h5>Image: {this.state.image}</h5>
          <h5>Country: {this.state.contry}</h5>
          <h5>Parent_Id: {this.state.parent_id}</h5>
          <details>
            <summary>Customize This Car</summary>
            <form id={this.props.car.id} onSubmit={this.updateCar}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" onChange={this.handleChange} />
              <br />
              <label htmlFor="description">Discription:</label>
              <input type="text" id="description" onChange={this.handleChange} />
              <br />
              <label htmlFor="image">Image:</label>
              <input type="text" id="image" onChange={this.handleChange} />
              <br />
              <label htmlFor="country">Contry:</label>
              <input type="text" id="country" onChange={this.handleChange} />
              <br />
              <label htmlFor="parent_id">Parent_id:</label>
              <input type="text" id="parent_id" onChange={this.handleChange} />
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