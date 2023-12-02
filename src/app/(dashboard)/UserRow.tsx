import { Input } from "@nextui-org/input"

import type { FC } from "react"

export const UserRow: FC = () => {
	return (
		<>
			<div className="flex gap-4">
				<Input placeholder="Naam" />
				<Input type="number" placeholder="Bieren gedronken" />
				<Input type="number" placeholder="Bieren betaald" />
			</div>
		</>
	)
}
