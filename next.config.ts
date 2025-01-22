import { join } from "path"

import { NextConfig } from "next"

const config: NextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	sassOptions: {
		includePaths: [join(__dirname, "src", "styles")],
	},

	output: "standalone",
}

export default config
