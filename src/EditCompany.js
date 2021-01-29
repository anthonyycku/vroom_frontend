import React from 'react';
import axios from 'axios';

class EditCompany extends React.Component {

  state = {
    name: this.props.company.name,
    description: this.props.company.description,
    country: this.props.company.country,
    image: this.props.company.image,
    parent_id: this.props.company.image,
  }


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  updateCompany = (event) => {
    event.preventDefault()
    event.target.reset()
    const id = event.target.id
    console.log(id)
    axios.put('/companies/' + id, this.state).then((response) => {
    })
  }




  render() {
    return (
      <div>
        <div className="company" >
          <h4>Name: {this.state.name}</h4>
          <h5>Discription: {this.state.description}</h5>
          <h5>Country: {this.state.contry}</h5>
          <h5>Image: {this.state.image}</h5>
          <h5>Parent_Id: {this.state.parent_id}</h5>
          <details>
            <summary>Edit Company</summary>
            <form id={this.props.company.id} onSubmit={this.updateCompany}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" onChange={this.handleChange} />
              <br />
              <label htmlFor="description">Discription:</label>
              <input type="text" id="description" onChange={this.handleChange} />
              <br />
              <label htmlFor="country">Contry:</label>
              <input type="text" id="country" onChange={this.handleChange} />
              <br />
              <label htmlFor="image">Image:</label>
              <input type="text" id="image" onChange={this.handleChange} />
              <br />
              <label htmlFor="parent_id">Parent_id:</label>
              <input type="text" id="parent_id" onChange={this.handleChange} />
              <br />
              <input type="submit" value="Update Company" />
            </form>
          </details>
        </div>

      </div>
    )
  }
}
export default EditCompany;