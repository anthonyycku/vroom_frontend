import React from 'react';

class Company extends React.Component {
    render() {
        const { name, country } = this.props.company;
        const { gotoPage, children } = this.props;
        return (
            <div>
                <button onClick={() => gotoPage("main")}>Back</button>
                <p>{name}</p>
                <p>{country}</p>

                {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}
                
                <div>
                
                    {children.length > 0 ?
                        children.map(entry => {
                            const { childName, childID, childImage } = entry
                            return (
                                <div onClick={() => gotoPage("company", childID)}>
                                    Name: {childName}
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