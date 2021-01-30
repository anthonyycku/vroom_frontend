import React from 'react';
import './styles/styles.css'

class Nav extends React.Component {
    render() {
        const { gotoPage } = this.props;
        return (
            <div className="navigation">
                <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a onClick={() => gotoPage("main")} className="navbar-brand">VROOM</a>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;