import { getKeyValue } from "@nextui-org/react"
import {
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from "@nextui-org/table"
import { useMemo } from "react"

import { useStore } from "@hooks/useStore"

import type { FC } from "react"

export const ResultTable: FC = () => {
	const users = useStore((s) => s.users)
	const totalBeers = useStore((s) => s.totalBeers())
	const pricePerBeer = useStore((s) => s.totalPaid() / s.totalBeers() || 0)

	const data = useMemo(
		() =>
			users.map((user) => {
				const paid = user.paid || 0
				const beers = user.beers || 0

				return {
					...user,
					beers,
					name: user.name || `Persoon ${user.id + 1}`,
					paid: `€${paid.toFixed(2)}`,
					cost: `€${(beers * pricePerBeer).toFixed(2)}`,
					toPay: `€${(beers * pricePerBeer - paid).toFixed(2)}`,
					share: `${((beers / totalBeers) * 100 || 0).toFixed(2)}%`,
				}
			}),
		[pricePerBeer, totalBeers, users],
	)

	const columns = [
		{
			key: "name",
			label: "Naam",
		},
		{
			key: "beers",
			label: "Bieren gedronken",
		},
		{
			key: "share",
			label: "Aandeel",
		},
		{
			key: "paid",
			label: "Al betaald",
		},
		{
			key: "cost",
			label: "Kosten",
		},
		{
			key: "toPay",
			label: "Te betalen",
		},
	]

	return (
		<>
			<Table layout="fixed" isStriped removeWrapper>
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn key={column.key}>
							{column.label}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={data}>
					{(user) => (
						<TableRow key={user.id}>
							{(columnKey) => (
								<TableCell>
									{getKeyValue(user, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</>
	)
}
