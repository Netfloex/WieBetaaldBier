import { Input } from "@nextui-org/input"
import { Button } from "@nextui-org/react"
import { Tooltip } from "@nextui-org/tooltip"
import { useCallback } from "react"
import { MdDelete } from "react-icons/md"

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
		<Tooltip
			content={
				<>
					<Button
						color="danger"
						isIconOnly
						className="-mt-10"
						onClick={deleteUser}
					>
						<MdDelete size={20} />
					</Button>
				</>
			}
			containerPadding={0}
			placement="right-start"
			classNames={{
				content: "bg-transparent shadow-none",
			}}
			offset={-30}
		>
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
		</Tooltip>
	)
}
