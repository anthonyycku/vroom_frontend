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
import Loading from './Loading'
// import Car from './Car'


class Main extends React.Component {
  state = {
    page: "main",
    companyID: null,
    carID: null,
    companyParentID: 0,
    carCompanyID: 0,

  }

  //RESET STATE
  resetState = () => {
    this.setState({
      companyID: null,
      carID: null
    })
  }
  //GET SPECIFIC COMPANY
  getCompany = (id) => {
    this.resetState();
    axios.get("https://vroomies.herokuapp.com/companies/" + id).then(response => {
      if (response.data.parent_id === undefined) {
        response.data.parent_id = 0;
      }
      this.setState({
        companyID: response.data.id,
        companyParentID: response.data.parent_id
      })
    })
  }
  getCar = (id) => {
    this.resetState();
    axios.get("https://vroomies.herokuapp.com/singleCar/" + id).then(response => {
      if (response.data.company_id === undefined) {
        response.data.company_id = 0;
      }
      this.setState({
        carID: response.data.id,
        carCompanyID: response.data.company_id
      })
    })
  }
  //GO TO SPECIFIC PAGE
  gotoPage = (page, companyID) => {
    if (page === "company" || page === "editCompany") {
      this.setState({
        companyID: this.getCompany(companyID),
        page: "main"
      })
      this.setState({
        page: page
      })
    } else if (page === "editCar") {
      this.setState({
        page: "main",
        carID: this.getCar(companyID)
      })
      this.setState({
        page: page
      })
    } else {
      this.setState({
        page: page
      })
    }
  }


  render() {
    const { carID, page, companyID, carCompanyID, companyParentID } = this.state;

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
      if (companyID == null) {
        return <Loading />
      } else {
        return (
          <div>
            <Company companyID={companyID} gotoPage={this.gotoPage} resetState={this.resetState} />
          </div>
        )
      }
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
      if (companyID == null) {
        return <Loading />
      } else {
        return (
          <div>
            <EditCompany companyParentID={companyParentID} companyID={companyID} gotoPage={this.gotoPage} resetState={this.resetState} />
          </div>
        )
      }
    }

    if (page === "editCar") {
      if (carID == null) {
        return <Loading />
      } else {
        return (
          <div>
            <EditCar carCompanyID={carCompanyID} carID={carID} gotoPage={this.gotoPage} resetState={this.resetState} />
          </div>
        )
      }
    }

    //Show create car page
    if (page === "createCar") {
      return (
        <div>
          <CreateCar gotoPage={this.gotoPage} />
        </div>
      )
    }

  } //End of render()
}//End of Class

export default Main;
