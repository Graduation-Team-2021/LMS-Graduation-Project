import React, {Component} from 'react'

class ErrorBound extends React.Component {

    state = {
        hasError: false,
        errorMess: ''
    }

    componentDidCatch = (error, info) => {
        this.setState({hasError: true, errorMess: error});
    }

    render() {
        if (this.state.hasError){ 
            return <h1>{this.state.errorMess}</h1>;
        }   else {
            return this.props.children;
        }
    }

}

export default ErrorBound;