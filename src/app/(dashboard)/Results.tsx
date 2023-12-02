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
				<h1 className="text-lg">Totaal</h1>
				<p>Totaal gedronken: {totalBeers}</p>
				<p>Totaal betaald: €{totalPaid.toFixed(2)}</p>
				<p>Prijs per bier: €{pricePerBeer.toFixed(2)}</p>
				<div className="p-4">
					<ResultTable />
				</div>
			</div>
		</>
	)
}
