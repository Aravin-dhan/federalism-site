import { defineCollection, z } from 'astro:content';

const languageEnum = z.enum(['en', 'ta']);

const articleCollection = defineCollection({
	type: 'content',
	schema: ({ image }) =>
		z.object({
			slug: z.string().optional(),
			title: z.string(),
			description: z.string().min(20, 'Add a richer description for feeds and SEO.'),
			author: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			tags: z.array(z.string()).nonempty(),
			draft: z.boolean().default(false),
			category: z.string(),
			heroImage: image().optional(),
			lang: languageEnum.default('en')
		})
});

const pageCollection = defineCollection({
	type: 'content',
	schema: z.object({
		slug: z.string().optional(),
		title: z.string(),
		description: z.string().min(10),
		order: z.number().int().optional(),
		draft: z.boolean().default(false),
		lang: languageEnum.default('en')
	})
});

const resourceCollection = defineCollection({
	type: 'content',
	schema: z.object({
		slug: z.string().optional(),
		title: z.string(),
		description: z.string().min(10),
		file: z.string(),
		fileType: z.enum(['pdf', 'epub', 'docx']).default('pdf'),
		publishedOn: z.coerce.date(),
		lang: languageEnum.default('en'),
		tags: z.array(z.string()).default([])
	})
});

const videoCollection = defineCollection({
	type: 'data',
	schema: z.object({
		title: z.string(),
		description: z.string().min(10),
		url: z.string().url(),
		platform: z.enum(['youtube', 'podcast', 'other']).default('youtube'),
		publishedOn: z.coerce.date(),
		lang: languageEnum.default('en'),
		tags: z.array(z.string()).default([])
	})
});

const postsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		slug: z.string().optional(),
		title: z.string(),
		date: z.coerce.date(),
		draft: z.boolean().default(false),
		category: z.string(),
		summary: z.string().min(10),
		body: z.string()
	})
});

export const collections = {
	articles: articleCollection,
	pages: pageCollection,
	resources: resourceCollection,
	videos: videoCollection,
	posts: postsCollection
};
