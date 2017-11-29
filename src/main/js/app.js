'use strict';

//import React from 'react';
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';

import {
	  Table,
	  TableBody,
	  TableHeader,
	  TableHeaderColumn,
	  TableRow,
	  TableRowColumn,
	} from 'material-ui/Table';
	
// tag::vars[]
//import EmpleadoAvatar from '../avatars'

//const React = require('react');
const ReactDOM = require('react-dom')
const client = require('./client');

import injectTapEventPlugin from 'react-tap-event-plugin';
/*import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';*/
//import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

/*state = {
		selected: [1],
};*/

// end::vars[]

const styles = {
		  container: {
		    textAlign: 'center',
		    paddingTop: 1,
		  },
	};


/*const muiTheme = getMuiTheme({
	  palette: {
	    accent1Color: deepOrange500,
	  },
	});*/


/*const AppBarExampleIcon = () => (
		  <AppBar
		    title="My sweet Home..."
		    iconClassNameRight="muidocs-icon-navigation-expand-more"
		  />
		);*/


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
				<MuiThemeProvider>
			        <div style={styles.container}>
			        		<AppBar title='Employees Dashboard' />
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
		
		state = {
			    fixedHeader: false,
			    fixedFooter: false,
			    stripedRows: true,
			    showRowHover: true,
			    selectable: true,
			    multiSelectable: false,
			    enableSelectAll: true,
			    deselectOnClickaway: false,
			    showCheckboxes: true
			  };
		
		state = {
			    selected: [1],
			  };
		
		var isSelected = (index) => {
			return this.state.selected.indexOf(index) !== -1;
		};
		
		var handleRowSelection = (selectedRows) => {
			this.setState({
				selected: selectedRows,
			});
		};
		
		var employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
				<Table onRowSelection={this.handleRowSelection}>
		        <TableHeader>
			        <TableRow>
			        		<TableHeaderColumn>Avatar</TableHeaderColumn>
			            <TableHeaderColumn>Name</TableHeaderColumn>
			            <TableHeaderColumn>Last Name</TableHeaderColumn>
			            <TableHeaderColumn>Description</TableHeaderColumn>
			        </TableRow>	
		        </TableHeader>
	            <TableBody>
	          	
	          		{employees}
	          	 
	            </TableBody>
	           </Table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	
	render() {
		
		return (
				<TableRow>
				    <TableRowColumn>
				                     <EmpleadoAvatar picture={this.props.picture} />
				    </TableRowColumn>
		            <TableRowColumn>
									{this.props.employee.firstName}
		            </TableRowColumn>
				    <TableRowColumn>{this.props.employee.lastName}</TableRowColumn>
				    <TableRowColumn>{this.props.employee.description}</TableRowColumn>
	            </TableRow>		
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

