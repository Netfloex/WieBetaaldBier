import { Divider } from "@nextui-org/react"

import { useStore } from "@hooks/useStore"

import { PayList } from "./PayList"
import { ResultTable } from "./ResultTable"

import type { FC } from "react"

export const Results: FC = () => {
	const totalBeers = useStore((s) => s.totalBeers())
	const totalPaid = useStore((s) => s.totalPaid())
	const pricePerBeer = totalPaid / totalBeers || 0

	return (
		<>
			<div className="flex flex-col gap-4">
				<div className="p-4">
					<h1 className="text-lg">Totaal:</h1>
					<p>Totaal gedronken: {totalBeers}</p>
					<p>Totaal betaald: €{totalPaid.toFixed(2)}</p>
					<p>Prijs per bier: €{pricePerBeer.toFixed(2)}</p>
				</div>
				<Divider />
				<div className="p-4">
					<ResultTable />
				</div>
				<Divider />
				<div className="p-4">
					<h1 className="text-lg">Conclusie:</h1>
					<PayList />
				</div>
			</div>
		</>
	)
}
