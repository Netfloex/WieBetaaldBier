import { Dashboard } from "src/app/(dashboard)/Dashboard"

import type { Metadata } from "next"
import type { FC } from "react"

export const metadata: Metadata = {
	title: "WieBetaaldBier",
	description: "Handig om bierkosten te verdelen",
}

const Page: FC = () => (
	<>
		<Dashboard />
	</>
)

export default Page
