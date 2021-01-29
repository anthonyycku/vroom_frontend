import React from 'react';

class CreateCompany extends React.Component {
    state = {
        name: '',
        founded: [],
        country: '',
        }

    handleChange = (event) => {
        this.setState({event.target.name]: event.target.value,
      })
    }
            
    handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/companies', this.state).then((response) => {
        this.getCompanies()
      })
    }


    render() {
         const { name, founded, country } = this.props.CreateCompany;
        return (
            <div classNAme="createCompany">
                <h3>Create a Company</h3>
                  <form onSubmit={this.props.handleChange}>
                      <label htmlFor="name">name</label>
                        <input 
                          type="text"
                          id="name"
                          onChange={this.props.handleChange}
                          value={this.state.name}/>
                  <br />
                      <label htmlFor="founded:">Founded:</label>  
                       <input
                         type="text"
                         id="founded"
                         onChange={this.props.handleChange}
                         value={this.state.name}/>
                   <br />
                       <label htmlFor="country:">Country:</label>  
                       <input
                         type="text"
                         id="country"
                         onChange={this.props.handleChange}
                         value={this.state.name}/>
                    <br />
                       <input 
                       type="submit" 
                       value="Creat Company"/> 
                  </form>
            </div>
        )
    }
}

export default CreateCompany;