import { heroui } from "@heroui/react"

import type { Config } from "tailwindcss"

export default {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	plugins: [heroui()],
} satisfies Config
