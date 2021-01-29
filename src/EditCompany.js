import React from 'react';
import axios from 'axios';

class EditCompany extends React.Component {

    state = {
        name: '',
        description: [],
        country: '',
        image: '',
        parent_id: 0,
      }
    
    
    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        })
      } 
      
      handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/companies', this.state).then((response) => {
          this.getCompanies()
        })
      }

      updateCompany = (event) => {
        event.preventDefault()
        event.target.reset()
        const id = event.target.id
        axios.put('/companies' + id, this.state).then((response) => {
          this.getCompanies()
        })
      }




render() {
return (
<div>
            <div className="company" >
              <h4>Name: {this.state.company.name}</h4>
              <h5>Discription: {this.state.company.description}</h5>
              <h5>Country: {this.state.company.contry}</h5>
              <h5>Image: {this.state.company.image}</h5>
              <h5>Parent_Id: {this.state.company.parent_id}</h5>
              <details>
                <summary>Edit Company</summary>
                <form id={this.state.company.id} onSubmit={this.updateCompany}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.handleChange} />
                  <br />
                  <label htmlFor="description">Discription:</label>
                  <input type="text" id="description" onChange={this.handleChange} />
                  <br />
                  <label htmlFor="contry">Contry:</label>
                  <input type="text" id="contry" onChange={this.handleChange} />
                  <br />
                  <label htmlFor="image">Image:</label>
                  <input type="url" id="image" onChange={this.handleChange} />
                  <br />
                  <label htmlFor="parent_id">Parent_id:</label>
                  <input type="text" id="parent_id" onChange={this.handleChange} />
                  <br />
                  <input type="submit" value="Update Company" />
                </form>
              </details>
              <button value={this.state.company.id} onClick={this.deleteCompany}>
                X
              </button>
            </div>
          
      </div>
    )
  }
}
export default EditCompany;