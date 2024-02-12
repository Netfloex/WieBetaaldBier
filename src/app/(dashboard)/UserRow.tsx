import { Input } from "@nextui-org/input"

import { User, useStore } from "@hooks/useStore"

import type { FC } from "react"

export const UserRow: FC<{ user: User }> = ({ user }) => {
	const index = user.id
	const setName = useStore((s) => s.setName)
	const setBeers = useStore((s) => s.setBeers)
	const setPaid = useStore((s) => s.setPaid)

	return (
		<>
			<div className="flex gap-4">
				<Input
					label="Naam"
					placeholder={`Persoon ${index + 1}`}
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
					label="Al betaald"
					value={user.paid.toString()}
					onValueChange={(val) => setPaid(index, val)}
					startContent={<div className="leading-tight">€</div>}
				/>
			</div>
		</>
	)
}
