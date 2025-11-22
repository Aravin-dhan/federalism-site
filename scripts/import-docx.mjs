import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mammoth from "mammoth";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../");

const args = yargs(hideBin(process.argv))
	.option("input", {
		demandOption: true,
		describe: "Absolute or relative path to the .docx file",
		type: "string"
	})
	.option("slug", {
		demandOption: true,
		describe: "URL-safe slug for the article folder",
		type: "string"
	})
	.option("title", {
		demandOption: true,
		describe: "Article title",
		type: "string"
	})
	.option("lang", {
		choices: ["en", "ta"],
		default: "en",
		describe: "Language code"
	})
	.option("draft", {
		type: "boolean",
		default: true,
		describe: "Mark the imported article as draft"
	})
	.help().argv;

const targetDir = path.join(root, "src/content/articles", args.slug);
const targetFile = path.join(targetDir, "index.mdx");

const convertDocxToMarkdown = async () => {
	const docxPath = path.resolve(args.input);
	const buffer = await fs.readFile(docxPath);
	const { value } = await mammoth.convertToMarkdown({ buffer });
	return value.trim();
};

const ensureDir = async (dir) => {
	await fs.mkdir(dir, { recursive: true });
};

const createFrontmatter = (markdown) => {
	const summary = markdown.split(/\n\n+/)[0]?.slice(0, 240) ?? '';
	return `---\nslug: ${args.slug}\ntitle: "${args.title.replace(/"/g, "'")}"\ndescription: "${summary.replace(/"/g, "'")}"\nauthor: Balamurugan\npubDate: ${new Date().toISOString().split('T')[0]}\nupdatedDate: ${new Date().toISOString().split('T')[0]}\ntags:\n  - import\n  - writings\ndraft: ${args.draft}\ncategory: Writings\nheroImage: ./hero-placeholder.svg\nlang: ${args.lang}\n---\n\n`;
};

const copyHeroPlaceholder = async () => {
	const source = path.join(root, "src/assets/hero-bw.svg");
	const destination = path.join(targetDir, "hero-placeholder.svg");
	try {
		await fs.copyFile(source, destination);
	} catch {
		// ignore
	}
};

const run = async () => {
	const markdown = await convertDocxToMarkdown();
	await ensureDir(targetDir);
	await copyHeroPlaceholder();
	const frontmatter = createFrontmatter(markdown);
	await fs.writeFile(targetFile, `${frontmatter}${markdown}\n`);
	console.log(`Imported document saved to ${path.relative(root, targetFile)}`);
};

run().catch((error) => {
	console.error("Unable to import DOCX", error);
	process.exit(1);
});
