'use strict';

// tag::vars[]
//import EmpleadoAvatar from '../avatars'

const React = require('react');
const ReactDOM = require('react-dom')
const client = require('./client');

import injectTapEventPlugin from 'react-tap-event-plugin';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();
// end::vars[]

const styles = {
		  container: {
		    textAlign: 'center',
		    paddingTop: 200,
		  },
	};


const muiTheme = getMuiTheme({
	  palette: {
	    accent1Color: deepOrange500,
	  },
	});

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}

	render() {
		return (
				<MuiThemeProvider muiTheme={getMuiTheme()}>
			        <div style={styles.container}>
					
			        		<EmployeeList employees={this.state.employees}/>
			        </div>
		        </MuiThemeProvider>
		)
	}
}
// end::app[]

//<img className="media-object" width="64px" src={'/imgs/${this.props.picture}'} />
class EmpleadoAvatar extends React.Component {
	  render() {

	    let picture = this.props.picture;

	    return (
	      <figure className="media-left">
	      	<img className="media-object" width="64px" src='https://s3.amazonaws.com/uifaces/faces/twitter/rem/128.jpg' />
	      </figure>
	    )
	  }
}

// tag::employee-list[]
class EmployeeList extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	render() {
		return (
		<li className="media">
			<tr>
				<td>
					<EmpleadoAvatar picture={this.props.picture} />
					{this.props.employee.firstName}
				</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		 </li>
		)
	}
}
// end::employee[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]

