const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fetch = require('node-fetch')
const slugify = require('slugify')
const fs = require('fs')

const frameworkColors = {
	'Express JS': '#494949',
	'micro': '#2c78f6',
	'Rails': '#bb261a',
	'Akka HTTP Scala': '#3c88a5',
	'Flask': '#3e3e3e',
	'Django': '#65b48e'
}

exports.createPages = ({ graphql, actions }) => new Promise((resolve, reject) => {

	const { createPage } = actions
	const setupHead = fs.readFileSync('./src/templates/setuphead.md').toString()
	const setupTail = fs.readFileSync('./src/templates/setuptail.md').toString()

	const docPage = path.resolve(`./src/templates/doc-post.js`)

	fetch('https://s3.amazonaws.com/current-optic-docs-website/integrations_docs.json')
		.then(res => res.json())
		.then((json) => {

			//index page
			createPage({
				path: '/',
				component: docPage,
				context: {
					color: '#0e6ee2',
					name: 'your API',
					md: setupHead + '\n' + toSection(json) + '\n' + setupTail
				}
			})

			Promise.all(json.map((doc) => {

				return fetch(doc.raw).then((res) => res.text()).then((docContents) => {

					const docString = setupHead + '\n\n' + docContents + '\n\n' + setupTail

					createPage({
						path: slugify(doc.name, {lower: true}),
						component: docPage,
						context: {
							...doc,
							color: frameworkColors[doc.name] || '#0e6ee2',
							md: docString
						}
					})

				}).catch(() => {
					throw new Error('could not load docs for '+doc.name)
				})
			})).then(resolve)

		})
		.catch(e => console.error('unable to load doc links ' + e));

})

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode })
		createNodeField({
			name: `slug`,
			node,
			value,
		})
	}
}

function toSection(json) {
return `
# Choose your API Framework

${json.map(i => `- [${i.name}](/${slugify(i.name, {lower: true})})`).join('\n')}

Don't see the API framework you use? [Let us know](https://calendly.com/optic-onboarding/setup-optic-for-my-api-framework) and we'll add it for you!
`
}
