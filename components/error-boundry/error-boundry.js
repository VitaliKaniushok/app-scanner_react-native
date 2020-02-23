import React, {Component} from 'react';
import ErrorMessage from './error-message.js';

export default class ErrorBoundry extends Component {

  state = {
   	hasError:false
  }

  componentDidCath() {

 		this.setState({ 
 			hasError:true
 		});
  }

  render() {       

  	if (this.state.hasError || this.props.errorMessage) {
  		return <ErrorMessage props={this.props} />
  	};

  	return this.props.children;  
  }
}