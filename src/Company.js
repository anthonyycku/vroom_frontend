import React from 'react';
import './styles/styles.css'
import Nav from './Nav'
class Company extends React.Component {
    render() {
        const { name, country, id, image, description } = this.props.company;
        const { gotoPage, children } = this.props;
        return (
            <div className="company">
                <Nav gotoPage={gotoPage} />
                <button onClick={() => gotoPage("main")}>Back</button>
                <p>{name}</p>
                <p>{country}</p>

                <button onClick={() => gotoPage("editCompany", id)}>Edit this company</button>

                {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}

                <div>

                    {children.length > 0 ?
                        children.map(entry => {
                            const { childName, childID, childImage } = entry
                            return (
                                <div>
                                    <div onClick={() => gotoPage("company", childID)}>
                                        Name: {childName}
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