import React from 'react';

class EditCompany extends React.Component {
    
    
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
        axios.put('/companies/id' + id, this.state).then((response) => {
          this.getCompanies()
        })
      }




render() {
return (
<div>
            <div className="company" >
              <h4>Name: {this.props.person.name}</h4>
              <h5>Age: {this.props.person.age}</h5>
              <details>
                <summary>Edit Person</summary>
                <form id={this.props.person.id} onSubmit={this.props.updatePerson}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" onChange={this.props.handleChange} />
                  <br />
                  <label htmlFor="age">Age</label>
                  <input type="text" id="age" onChange={this.props.handleChange} />
                  <br />
                  <input type="submit" value="Update Person" />
                </form>
              </details>
              <button value={this.props.person.id} onClick={this.props.deletePerson}>
                X
              </button>
            </div>
          
      </div>
    )
  }
}
export default EditCompany;