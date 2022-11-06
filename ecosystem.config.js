module.exports = {
	apps: [
		{
			name: "feedback",
			script: "npm -- run babel",
			watch: true,
			ignore_watch: ["node_modules", "public", "dist"],
		},
	],
};
