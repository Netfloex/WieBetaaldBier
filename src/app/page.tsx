import { Button } from "@nextui-org/button"

import type { Metadata } from "next"
import type { FC } from "react"

export const metadata: Metadata = {
	title: "WieBetaaldBier",
	description: "Handig om bierkosten te verdelen",
}

const Page: FC = () => (
	<>
		<Button color="danger">Hello</Button>
	</>
)

export default Page
