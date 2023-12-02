import { useMemo } from "react"

import { useStore } from "@hooks/useStore"

import type { FC } from "react"

interface Payment {
	from: string
	to: string
	amount: number
}

export const PayList: FC = () => {
	const users = useStore((s) => s.users)
	const pricePerBeer = useStore((s) => s.totalPaid() / s.totalBeers() || 0)

	const payments = useMemo<Payment[]>(() => {
		const payments: Payment[] = []

		const data = users
			.map((user) => {
				return {
					name: user.name || `Persoon ${user.id + 1}`,
					toPay: user.beers * pricePerBeer - user.paid,
				}
			})
			.sort((a, b) => a.toPay - b.toPay)

		data.forEach((user) => {
			while (user.toPay > 0) {
				const otherUser = data.find((u) => u.toPay < 0)

				if (!otherUser) {
					break
				}

				const amount = Math.min(-otherUser.toPay, user.toPay)

				payments.push({
					from: user.name,
					to: otherUser.name,
					amount,
				})

				user.toPay -= amount
				otherUser.toPay += amount
			}
		})

		return payments
	}, [pricePerBeer, users])

	return (
		<>
			{payments.map((payment, index) => (
				<div key={index}>
					{payment.from} moet €{payment.amount.toFixed(2)} betalen aan{" "}
					{payment.to}
				</div>
			))}
		</>
	)
}
