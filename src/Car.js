import React from 'react';

class Car extends React.Component {
    render() {
        const { name, description,image,country,id } = this.props.car;
        const { gotoPage, children } = this.props;
        return (
            <div>
                <button onClick={() => gotoPage("main")}>Back</button>
                <p>{name}</p>
                <p>{country}</p>
                <button onClick={() => gotoPage("editCar", id)}>Customiz This car</button>

                {/* <button onClick={() => gotoPage("createCar")}>Create</button> */}
                
                <div>
                
                    {children.length > 0 ?
                        children.map(entry => {
                            const { childName, childID, childImage } = entry
                            return (
                                <div>
                                    <div onClick={() => gotoPage("car", childID)}>
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

export default Car;