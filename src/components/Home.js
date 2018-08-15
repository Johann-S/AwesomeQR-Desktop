import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'

import Container from './Container'

class Home extends React.Component {
	constructor() {
		super()

		this.state = {
			drawerOpen: false,
		}
	}

	toggleDrawer(drawerState) {
		this.setState({
			drawerOpen: drawerState,
		})
	}

	drawer() {
		return (
			<Drawer
				open={this.state.drawerOpen}
				onClose={() => { this.toggleDrawer(false) }}>
				<div
					tabIndex={0}
					role="button"
					onClick={() => { this.toggleDrawer(false) }}
					onKeyDown={() => { this.toggleDrawer(false) }}
				>
					<List>
						<ListItem button>
							<ListItemText primary="Home"></ListItemText>
						</ListItem>
					</List>
				</div>
			</Drawer>
		)
	}

	render() {
		return (
			<React.Fragment>
				<AppBar>
					<Toolbar>
						<IconButton color="inherit" aria-label="Menu" onClick={() => { this.toggleDrawer(true) }}>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
				<Container />
				{this.drawer()}
			</React.Fragment>
		)
	}
}

export default Home
