import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { toDocx } from "md-to-docx";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../");

const args = yargs(hideBin(process.argv))
	.option("slug", {
		demandOption: true,
		describe: "Slug of the article stored in src/content/articles",
		type: "string"
	})
	.option("output", {
		describe: "Optional docx output path",
		type: "string"
	})
	.help().argv;

const readArticle = async () => {
	const targetFile = path.join(root, "src/content/articles", args.slug, "index.mdx");
	return fs.readFile(targetFile, "utf8");
};

const mdxToMarkdown = (raw) => {
	const parsed = matter(raw);
	const markdown = parsed.content.replace(/import .*?;?\n/g, "").trim();
	return { markdown, frontmatter: parsed.data };
};

const buildAst = (markdown) => {
	return unified().use(remarkParse).use(remarkGfm).use(remarkFrontmatter, ["yaml"]).parse(markdown);
};

const run = async () => {
	const raw = await readArticle();
	const { markdown, frontmatter } = mdxToMarkdown(raw);
	const ast = buildAst(markdown);
	const buffer = await toDocx(ast, { creator: "Balamurugan", title: frontmatter.title }, undefined, "nodebuffer");
	const outDir = path.resolve(root, "exports");
	await fs.mkdir(outDir, { recursive: true });
	const outputPath = args.output ? path.resolve(args.output) : path.join(outDir, `${args.slug}.docx`);
	await fs.writeFile(outputPath, Buffer.from(buffer));
	console.log(`Exported article to ${outputPath}`);
};

run().catch((error) => {
	console.error("Unable to export article", error);
	process.exit(1);
});
