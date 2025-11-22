import { collection, config, fields } from '@keystatic/core';

const languages = [
	{ label: 'English', value: 'en' },
	{ label: 'தமிழ்', value: 'ta' }
];

const isProd = process.env.NODE_ENV === 'production';

const storage = isProd
	? {
		kind: 'github' as const,
		repo: process.env.KEYSTATIC_GITHUB_REPO ?? 'Aravin-dhan/federalism-site',
		branch: process.env.KEYSTATIC_GITHUB_BRANCH ?? 'main',
		token: process.env.KEYSTATIC_GITHUB_TOKEN
	}
	: {
		kind: 'local' as const
	};

export default config({
	ui: {
		brand: {
			name: 'Federalism Under Siege'
		}
	},
	storage,
	collections: {
		articles: collection({
			label: 'Articles',
			path: 'src/content/articles/*/index',
			slugField: 'slug',
			entryLayout: 'content',
			format: { contentField: 'content' },
			schema: {
				title: fields.text({ label: 'Title', validation: { isRequired: true } }),
				slug: fields.slug({
					name: { label: 'Slug label', validation: { isRequired: true } },
					slug: { label: 'Folder slug' }
				}),
				pubDate: fields.date({ label: 'Publish date', validation: { isRequired: true } }),
				updatedDate: fields.date({ label: 'Updated date' }),
				author: fields.text({ label: 'Author', validation: { isRequired: true } }),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: (tag) => tag.value ?? 'tag',
					validation: { length: { min: 1 } }
				}),
				draft: fields.checkbox({ label: 'Draft' }),
				category: fields.text({ label: 'Category', validation: { isRequired: true } }),
				heroImage: fields.image({
					label: 'Hero Image',
					directory: 'src/content/articles',
					publicPath: '/src/content/articles'
				}),
				lang: fields.select({ label: 'Language', options: languages, defaultValue: 'en' }),
				summary: fields.text({ label: 'Summary', multiline: true }),
				content: fields.mdx({
					label: 'Content',
					options: {
						image: {
							directory: 'src/content/articles',
							publicPath: '/src/content/articles'
						}
					}
				})
			}
		}),
		pages: collection({
			label: 'Pages',
			path: 'src/content/pages/*',
			slugField: 'slug',
			entryLayout: 'content',
			format: { contentField: 'content' },
			schema: {
				title: fields.text({ label: 'Title', validation: { isRequired: true } }),
				slug: fields.slug({
					name: { label: 'Slug helper', validation: { isRequired: true } },
					slug: { label: 'Slug' }
				}),
				description: fields.text({ label: 'Description', multiline: true }),
				order: fields.integer({ label: 'Menu order' }),
				draft: fields.checkbox({ label: 'Draft' }),
				lang: fields.select({ label: 'Language', options: languages, defaultValue: 'en' }),
				content: fields.mdx({
					label: 'Body',
					options: {
						image: {
							directory: 'src/content/pages',
							publicPath: '/src/content/pages'
						}
					}
				})
			}
		}),
		resources: collection({
			label: 'Resources',
			path: 'src/content/resources/*',
			slugField: 'slug',
			entryLayout: 'content',
			format: { contentField: 'content' },
			schema: {
				title: fields.text({ label: 'Title', validation: { isRequired: true } }),
				slug: fields.slug({
					name: { label: 'Slug label', validation: { isRequired: true } },
					slug: { label: 'Slug' }
				}),
				description: fields.text({ label: 'Description', multiline: true }),
				file: fields.file({
					label: 'Asset',
					directory: 'public/resources',
					publicPath: '/resources'
				}),
				fileType: fields.select({
					label: 'File type',
					options: [
						{ label: 'PDF', value: 'pdf' },
						{ label: 'EPUB', value: 'epub' },
						{ label: 'DOCX', value: 'docx' }
					],
					defaultValue: 'pdf'
				}),
				publishedOn: fields.date({ label: 'Published on', validation: { isRequired: true } }),
				lang: fields.select({ label: 'Language', options: languages, defaultValue: 'en' }),
				tags: fields.array(fields.text({ label: 'Tag' }), {
					label: 'Tags',
					itemLabel: (tag) => tag.value ?? 'tag'
				}),
				content: fields.mdx({
					label: 'Resource notes',
					options: {
						image: {
							directory: 'src/content/resources',
							publicPath: '/src/content/resources'
						}
					}
				})
			}
		}),
		posts: collection({
			label: 'Posts',
			path: 'src/content/posts/*',
			slugField: 'slug',
			entryLayout: 'content',
			format: { contentField: 'body' },
			schema: {
				title: fields.text({ label: 'Title', validation: { isRequired: true } }),
				slug: fields.slug({
					name: { label: 'Slug label', validation: { isRequired: true } },
					slug: { label: 'Slug' }
				}),
				date: fields.date({ label: 'Date', validation: { isRequired: true } }),
				draft: fields.checkbox({ label: 'Draft' }),
				category: fields.select({
					label: 'Category',
					options: [
						{ label: 'Policy', value: 'policy' },
						{ label: 'Campaign', value: 'campaign' },
						{ label: 'Dispatch', value: 'dispatch' }
					],
					defaultValue: 'policy'
				}),
				summary: fields.text({ label: 'Summary', multiline: true }),
				body: fields.markdoc({
					label: 'Body',
					options: {
						image: {
							directory: 'public/images/posts',
							publicPath: '/images/posts'
						}
					}
				})
			}
		})
	}
});
