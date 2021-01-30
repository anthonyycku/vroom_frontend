import React from 'react';
import './styles/styles.css'
import Nav from './Nav'
class Company extends React.Component {
    render() {
        const { name, country, id, image, description } = this.props.company;
        const { gotoPage, children } = this.props;
        return (
            <div className="ContainerCompany">
                <Nav gotoPage={gotoPage} />
                <button class="myButton" onClick={() => gotoPage("main")}>Back</button>
                <img className="companyImage" src={image}></img>
                <p className="companyName">{name}</p>
                <p className="companyCountry">{country}</p>
                <p className="companyDescription">{description} description </p>
                
                <button class="myButton" onClick={() => gotoPage("editCompany", id)}>Edit this company</button>

                {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}

                <div className="childCompanies">

                    {children.length > 0 ?
                        children.map(entry => {
                            const { childName, childID, childImage } = entry
                            return (
                                <div>
                                    <div onClick={() => gotoPage("company", childID)}>
                                         {childName} 
                                         <img className="childImage" src={childImage}></img>{}
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default Company;