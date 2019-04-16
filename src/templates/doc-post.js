import React from 'react';
import {graphql} from 'gatsby';
import withRoot from '../withRoot';
import {Typography, withStyles} from '@material-ui/core';
import Helmet from 'react-helmet/es/Helmet';
import Grid from '@material-ui/core/Grid';
import opticOASSVG from '../images/optic-oas.svg';
import commandSVG from '../images/command.svg';
import {PrismCode} from 'react-prism';
import ReactMarkdown from 'react-markdown';

const styles = theme => ({
	root: {
		fontFamily: 'Ubuntu',
		textAlign: 'center',
		lineHeight: 1.4,
		paddingTop: theme.spacing.unit * 10,

		paddingLeft: 20,
		paddingRight: 20
	},
	img: {
		maxWidth: '100%'
	},
	title: {
		lineHeight: 1.4
	},
	cmdImg: {
		width: '100%',
		maxWidth: 550,
	},
	tddTitle: {
		fontSize: 35,
		fontWeight: 400
	},
	benefits: {
		textAlign: 'left',
		paddingLeft: 22
	},
	markdownRegion: {
		maxWidth: 800,
		width: '100%',
		margin: '0 auto',
		marginTop: 70,
		flexDirection: 'column',
		textAlign: 'left',
		lineHeight: 1,
		paddingBottom: 200
	},
	codeRegion: {
		marginTop: 22,
		marginBottom: 30,
		backgroundColor: '#2a2a2a',
		padding: 5,
		maxWidth: '100%',
		overflow: 'scroll'
	}

});

const SectionTitle = ({color, title}) => <Typography variant="display3" component="h2" style={{
	fontSize: 35,
	fontWeight: 200,
	padding: 15,
	color: color
}}>{title}</Typography>;

const DocPost = (props) => {

	const {classes, pageContext} = props;
	const {name, color, md} = pageContext;

	const title = <>Generate OAS Specs from Tests: <br/>Test Driven Documentation for <span style={{color}}>{name}</span></>;
	const tddTitle = 'Test Driven Documentation';
	const subtitle = 'Your tests are already the source of truth for your API, now you can use them to generate OAS/Swagger every time you run them. This is great because: ';
	const tddReasons = [
		'Since tests are coupled to your code, the docs are updated on every commit',
		'Tests are the best abstraction for defining an API contract',
		'Tests document the actual behavior of your API, not how you think it works',
		'You\'ll never write Swagger manually again',
	];

	require('prismjs');
	require('prismjs/components/prism-bash');
	require('prismjs/components/prism-python');
	require('prismjs/components/prism-javascript');
	require('prismjs/components/prism-java');
	require('prismjs/components/prism-scala');
	require('prismjs/components/prism-ruby');
	require('prismjs/components/prism-javascript');
	require('prismjs/components/prism-typescript');
	require('prismjs/components/prism-yaml');
	require('prismjs/themes/prism-tomorrow.css');

	return (
		<div className={classes.root}>
			<Helmet>
				<title>Test Driven Documentation for {name}. Generate OAS Specs from Tests</title>
			</Helmet>
			<Grid container spacing={22}>

				<Grid item xs={12} style={{paddingBottom: 50}}>
					<img className={classes.img} src={opticOASSVG}/>
				</Grid>
				<Grid item xs={12}>
					<Typography variant="display3" component="h1" className={classes.title}>{title}</Typography>
				</Grid>

				<Grid container xs={12} style={{paddingLeft: 50, paddingRight: 50}}>
					<Grid item sm={12} md={6}>
						<img src={commandSVG} className={classes.cmdImg}/>
					</Grid>

					<Grid item sm={12} md={6} style={{paddingTop: 70, textAlign: 'left'}}>
						<Typography variant="display2" component="h2"
									className={classes.tddTitle}>{tddTitle}</Typography>
						<Typography variant="subtitle1" style={{fontSize: 20}}>{subtitle}</Typography>
						<ul className={classes.benefits}>
							{tddReasons.map((i, index) => {
								return <li key={index}><Typography variant="subtitle1"
																   style={{fontSize: 20}}>{i}</Typography></li>;
							})}
						</ul>
					</Grid>

				</Grid>

				<Grid item xs={12} style={{marginTop: 80}}>
					<hr/>
				</Grid>

				<Grid container xs={12} className={classes.markdownRegion}>

					<ReactMarkdown source={md} renderers={{
						code: ({value, language}) => <pre className={classes.codeRegion}><PrismCode className={'language-' + language}>{value}</PrismCode></pre>,
						heading: ({children, level}) => {
							return <Typography variant="display2" component="h2" style={{color, marginTop: 22, maxWidth: '100%', fontSize: (level === 1) ? 35 : 20, fontWeight: 600}} className={classes.tddTitle}>{children}</Typography>
						},
						paragraph: ({children}) => {
							return <Typography variant="subheading" style={{fontSize: 18, marginTop: 10, maxWidth: '100%'}}>{children}</Typography>
						},
						listItem: ({children}) => <li><Typography variant="subheading" style={{}}>{children}</Typography></li>,
						inlineCode: ({children}) => <span style={{fontSize: 16, backgroundColor: '#e2e2e2', padding: 3, borderRadius: 6}}>{children}</span>
					}}/>

				</Grid>

			</Grid>
		</div>
	);
};
export default withRoot(withStyles(styles)(DocPost));
