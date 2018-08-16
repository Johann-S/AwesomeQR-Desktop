import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import InfoIcon from '@material-ui/icons/Info'

const styles = {
  list: {
    width: 250,
  },
};

class MenuItems extends React.Component {
	render() {
		const { classes } = this.props

		return (
			<div className={classes.list}>
				<List>
					<ListItem button>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText primary="Home"></ListItemText>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<InfoIcon />
						</ListItemIcon>
						<ListItemText primary="About"></ListItemText>
					</ListItem>
				</List>
			</div>
		)
	}
}

MenuItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuItems)
