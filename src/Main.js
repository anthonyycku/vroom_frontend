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
import Car from './Car'


class Main extends React.Component {
  state = {
    companies: [],
    company: {},
    children: [],
    page: "main"
  }

  //COMPONENT DID MOUNT
  componentDidMount = () => {
    this.getCompanies();
  }
  //GET COMPANIES
  getCompanies = () => {
    axios.get("https://vroomies.herokuapp.com/companies").then(response => {
      this.setState({
        companies: response.data
      })
    })
  }
  //GET SPECIFIC COMPANY
  getCompany = (id) => {
    axios.get("https://vroomies.herokuapp.com/companies/" + id).then(response => {
      let data = response.data;
      let childrenArray = [];
      let parentObject = {};
      for (let key in data) {
        if (typeof data[key] !== "object") {
          parentObject[key] = data[key];
        }
      }
      if (data.children) {
        childrenArray = data.children;
      }
      this.setState({
        company: parentObject,
        children: childrenArray
      })
    })
  }
  //GO TO SPECIFIC PAGE
  gotoPage = (page, companyID) => {
    if (page === "company") {
      this.getCompany(companyID);
    }
    if (page === "editCompany") {
      this.getCompany(companyID)
    }
    this.setState({
      page: page
    })
  }


  render() {
    const { companies, company, car,children, page } = this.state;

    //Main page render
    if (page === "main") {
      return (
        <div>
          <Companies companies={companies} gotoPage={this.gotoPage} />
        </div>
      )
    }
    //Show specific company render
    if (page === "company") {
      return (
        <div>
          <Company company={company} children={children} gotoPage={this.gotoPage} />
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
          <EditCompany company={company} />
        </div>
      )
    }

    if (page === "editCar") {
      return (
        <div>
          <EditCar car={car} />
        </div>
      )
    }


    //Show create car page
    if (page === "createCar") {
      return (
        <div>
          <CreateCar />
        </div>
      )
    }

    if (page === "car") {
      return (
        <div>
          <Car car={car} children={children} gotoPage={this.gotoPage} />
        </div>
      )
    }

  } //End of render()
}//End of Class

export default Main;
