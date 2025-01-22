import { Input } from "@heroui/input"
import { Button } from "@heroui/react"
import { useCallback } from "react"
import { MdClose } from "react-icons/md"

import { User, useStore } from "@hooks/useStore"

import type { FC } from "react"

export const UserRow: FC<{ user: User }> = ({ user }) => {
	const index = user.id
	const setName = useStore((s) => s.setName)
	const setBeers = useStore((s) => s.setBeers)
	const setPaid = useStore((s) => s.setPaid)

	const deleteUserFunc = useStore((s) => s.deleteUser)

	const deleteUser = useCallback(() => {
		deleteUserFunc(index)
	}, [deleteUserFunc, index])

	return (
		<div className="group relative">
			<Button
				color="danger"
				isIconOnly
				radius="full"
				className="absolute -right-3 -top-3 z-10 h-7 min-h-0 w-7 min-w-0 overflow-visible opacity-0 transition-opacity group-hover:opacity-100"
				onPress={deleteUser}
			>
				<MdClose size={15} />
			</Button>
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
		</div>
	)
}
