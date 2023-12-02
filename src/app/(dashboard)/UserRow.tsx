import { Input } from "@nextui-org/input"

import { useStore } from "@hooks/useStore"

import type { FC } from "react"

export const UserRow: FC<{ index: number }> = ({ index }) => {
	const user = useStore((s) => s.getUser(index))
	const setName = useStore((s) => s.setName)
	const setBeers = useStore((s) => s.setBeers)
	const setPaid = useStore((s) => s.setPaid)
	return (
		<>
			<div className="flex gap-4">
				<Input
					label="Naam"
					value={user.name}
					onValueChange={(val) => setName(index, val)}
				/>
				<Input
					type="number"
					label="Bieren gedronken"
					value={user.beers.toString()}
					onValueChange={(val) => setBeers(index, val)}
				/>
				<Input
					type="number"
					label="Bieren betaald"
					value={user.paid.toString()}
					onValueChange={(val) => setPaid(index, val)}
				/>
			</div>
		</>
	)
}
