import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const Home = () => {
  return (
		<AppBar>
			<Toolbar>
				<IconButton color="inherit" aria-label="Menu">
					<MenuIcon />
				</IconButton>
			</Toolbar>
		</AppBar>
  )
}

export default Home
