//Import React & CSS
import React from 'react';
import './App.css';
//Import axios
import axios from 'axios';
//Import Components
import Companies from './Companies'

class App extends React.Component {
  state = {
    companies: []
  }

  getCompanies = () => {
    axios.get("/companies").then(response => {
      this.setState({
        companies: response.data
      })
    })
  }
  componentWillMount = () => {
    this.getCompanies();
  }

  render() {
    const { companies } = this.state;
    return (
      <div className="main">
        <Companies companies={companies} />
      </div>
    )
  }
}

export default App;
