import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };
    
    sideDrawerCloseHandler =() => (
        this.setState({showSideDrawer: false})
    );

    sideDrawerToggler =() => {
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return(
            <Aux>
                <Toolbar drawerToggleClicked ={this.sideDrawerToggler}/>
                <SideDrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                    {/*wrapping all the children into 'layout' components*/}
                </main>
            </Aux>
        )
    }
};

export default Layout;