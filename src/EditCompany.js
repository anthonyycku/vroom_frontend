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
        axios.put('/companies/' + id, this.state).then((response) => {
          this.getCompanies()
        })
      }




render() {
return (
<div></div>
)
}
}
export default EditCompany;