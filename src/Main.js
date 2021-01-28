//Import React & CSS
import React from 'react';
//Import axios
import axios from 'axios';
//Import Components
import Companies from './Companies'
import Company from './Company'

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
    axios.get("/companies").then(response => {
      this.setState({
        companies: response.data
      })
    })
  }
  //GET SPECIFIC COMPANY
  getCompany = (id) => {
    axios.get("/companies/" + id).then(response => {
      let data = response.data;
      let childrenArray = [];
      let parentObject = {};
      console.log(typeof data.children)
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
  getChildren = () => {

  }
  //GO TO SPECIFIC PAGE
  gotoPage = (page, companyID) => {
    if (page === "company") {
      this.getCompany(companyID);
    }
    this.setState({
      page: page
    })
  }


  render() {
    const { companies, company, children, page } = this.state;

    if (page === "main") {
      return (
        <div>
          <Companies companies={companies} gotoPage={this.gotoPage} />
        </div>
      )
    }
    if (page === "company") {
      return (
        <div>
          <Company company={company} children={children} gotoPage={this.gotoPage} />
        </div>
      )
    }

  } //End of render()
}//End of Class

export default Main;
