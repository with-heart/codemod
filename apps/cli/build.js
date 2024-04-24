import { build } from "esbuild";

build({
	entryPoints: ["./src/index.ts"],
	bundle: true,
	minify: true,
	platform: "node",
	target: "node18",
	format: "cjs",
	legalComments: "inline",
	outfile: "./dist/index.cjs",
	external: [
		"esbuild",
		"keytar",
		"prettier",
		// Workaround for @vue/compiler-sfc dynamic require
		"mustache",
		"templayed",
		"handlebars",
		"jazz",
		"jqtpl",
		"velocityjs",
		"dustjs-linkedin",
		"atpl",
		"liquor",
		"twig",
		"ejs",
		"eco",
		"hamljs",
		"hamlet",
		"whiskers",
		"haml-coffee",
		"hogan.js",
		"walrus",
		"just",
		"ect",
		"mote",
		"toffee",
		"dot",
		"bracket-template",
		"ractive",
		"htmling",
		"plates",
		"vash",
		"slm",
		"marko",
		"teacup/lib/express",
		"coffee-script",
		"squirrelly",
		"twing",
	],
});
