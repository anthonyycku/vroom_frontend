//Import React & CSS
import React from 'react';
//Import axios
import axios from 'axios';
//Import Components
import Companies from './Companies'
import Company from './Company'
import CreateCar from './CreateCar'
import CreateCompany from './CreateCompany'
import EditCompany from './EditCompany'
import EditCar from './EditCar'
// import Car from './Car'


class Main extends React.Component {
  state = {
    page: "main",
    companyID: 0
  }

  //GET SPECIFIC COMPANY
  getCompany = (id) => {
    axios.get("https://vroomies.herokuapp.com/companies/" + id).then(response => {
      this.setState({
        companyID: response.data.id
      })
    })
  }
  //GO TO SPECIFIC PAGE
  gotoPage = (page, companyID) => {
    if (page === "company" || page === "editCompany") {
      this.setState({
        companyID: this.getCompany(companyID),
        page: page
      })
    } else {
      this.setState({
        page: page
      })
    }
  }


  render() {
    const { page, companyID } = this.state;

    //Main page render
    if (page === "main") {
      return (
        <div>
          <Companies gotoPage={this.gotoPage} />
        </div>
      )
    }
    //Show specific company render
    if (page === "company") {
      return (
        <div>
          <Company companyID={companyID} gotoPage={this.gotoPage} />
        </div>
      )
    }
    //Show create company page
    if (page === "createCompany") {
      return (
        <div>
          <CreateCompany gotoPage={this.gotoPage} />
        </div>
      )
    }

         
    if (page === "editCompany") {
      return (
        <div>
          <EditCompany />
        </div>
      )
    }

    if (page === "editCar") {
      return (
        <div>
          <EditCar />
        </div>
      )
    }


    //Show create car page
    if (page === "createCar") {
      return (
        <div>
          <CreateCar gotoPage={this.gotoPage} />
        </div>
      )
    }

    if (page === "car") {
      return (
        <div>
          <Company gotoPage={this.gotoPage} />
        </div>
      )
    }

  } //End of render()
}//End of Class

export default Main;
