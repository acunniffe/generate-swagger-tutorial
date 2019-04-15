module.exports = {
	siteMetadata: {
		title: 'Generate OAS/Swagger from tests',
	},
	plugins: [
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					`gatsby-remark-copy-images`,
					{
						resolve: `gatsby-remark-images`,
						options: {
							// It's important to specify the maxWidth (in pixels) of
							// the content container as this plugin uses this as the
							// base for generating different widths of each image.
							maxWidth: 590,
						},
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: "language-",
							inlineCodeMarker: null,
							aliases: {},
							showLineNumbers: false,
							noInlineHighlight: false,
						},
					},
				],
			},
		},
	]
}
