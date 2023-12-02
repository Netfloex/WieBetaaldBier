import { ResultTable } from "src/app/(dashboard)/ResultTable"

import { useStore } from "@hooks/useStore"

import type { FC } from "react"

export const Results: FC = () => {
	const totalBeers = useStore((s) => s.totalBeers())
	const totalPaid = useStore((s) => s.totalPaid())
	const pricePerBeer = totalPaid / totalBeers || 0

	return (
		<>
			<div>
				<h1>Results</h1>
				<p>Total beers: {totalBeers}</p>
				<p>Total paid: €{totalPaid.toFixed(2)}</p>
				<p>Price per beer: €{pricePerBeer.toFixed(2)}€</p>

				<ResultTable />
			</div>
		</>
	)
}
