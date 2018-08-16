import React from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinkIcon from '@material-ui/icons/Link'

import { decodeQRCodeByFile, decodeQRCodeByURL } from '../util'

const styles = theme => ({
	button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
})

class Form extends React.Component {
  constructor() {
		super()

		this.state = {
			inputURLValue: '',
			inputFileValue: null,
		}
	}

	decodeQRCode(type) {
		if (type === 'url') {
			decodeQRCodeByURL(this.state.inputURLValue)
		} else {
			decodeQRCodeByFile(this.state.inputFileValue)
		}
	}

	render() {
		const { classes } = this.props

		return (
			<React.Fragment>
				<div>
					<FormControl className={classes.formControl}>
						<Input
							onChange={(event) => { this.state.inputURLValue = event.target.value }}
							startAdornment={
								<InputAdornment position="start">
									<LinkIcon />
								</InputAdornment>
							}
						/>
						<FormHelperText>Paste your QRCode image URL</FormHelperText>
					</FormControl>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={() => { this.decodeQRCode('url') }}>
						Detect
					</Button>
				</div>
				<div>
					<FormControl className={classes.formControl}>
						<Input
							type="file"
							onChange={(event) => { this.state.inputFileValue = event.target.files[0] }}
						/>
						<FormHelperText>Choose your image file</FormHelperText>
					</FormControl>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={() => { this.decodeQRCode('file') }}>
						Detect
					</Button>
				</div>
			</React.Fragment>
		)
	}
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Form)
