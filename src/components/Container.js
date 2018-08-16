import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import Form from './Form'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
	},
	appBarSpacer: theme.mixins.toolbar,
	contentRoot: {
		display: 'flex',
		width: '100%',
		marginRight: 'auto',
		marginLeft: 'auto',
		[theme.breakpoints.down('sm')]: {
      maxWidth: '540px',
    },
    [theme.breakpoints.up('md')]: {
      maxWidth: '720px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '960px',
		},
		[theme.breakpoints.up('xl')]: {
      maxWidth: '1140px',
    },
	}
})

class Container extends React.Component {
	render() {
		const { classes } = this.props

		return (
			<main>
				<div className={classes.appBarSpacer} />
				<div className={classes.heroUnit}>
						<div className={classes.heroContent}>
							<Typography variant="title" align="center" color="textPrimary" paragraph>
								Decode QRCode you found, in an image or an URL
							</Typography>
						</div>
				</div>
				<div className={classes.contentRoot}>
					<Form />
				</div>
			</main>
		)
	}
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Container)
