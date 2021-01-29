import React from 'react';

class CreateCompany extends React.Component {
    state = {
        name: '',
        founded: [],
        country: '',
        }

        handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value,
      })
    }
            
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/companies', this.state).then((response) => {
        this.getCompanies()
      })
    }

    render() {
         
        return (
            <div classNAme="createCompany">
                <h3>Create a Company</h3>
                  <form onSubmit={this.handleSubmit}>
                      <label htmlFor="name">Name</label>
                        <input 
                          type="text"
                          id="name"
                          onChange={this.handleChange}
                          value={this.state.name}/>
                  <br />
                      <label htmlFor="founded">Founded</label>  
                       <input
                         type="text"
                         id="founded"
                         onChange={this.handleChange}
                         value={this.state.name}/>
                   <br />
                       <label htmlFor="country">Country</label>  
                       <input
                         type="text"
                         id="country"
                         onChange={this.handleChange}
                         value={this.state.name}/>
                    <br />
                       <input 
                       type="submit" 
                       value="Creat Company" /> 
                  </form>
                  {this.state.CreateCompany.map((person) => {
                      return <CreateCompany
                      key={CreateCompany.id}
                      CreateCompany={CreateCompany}
                      />
                  })}
            </div>
        )
    }
}

export default CreateCompany;