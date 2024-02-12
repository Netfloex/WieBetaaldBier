import { useEffect, useState } from "react"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface User {
	name: string
	beers: number
	paid: number
	id: number
}

export interface State {
	index: number
	createEmptyUser: () => User
	users: User[]
	addUser: () => void
	setBeers: (index: number, beers: string) => void
	setPaid: (index: number, paid: string) => void
	setName: (index: number, name: string) => void
	getUser: (index: number) => User
	totalBeers: () => number
	totalPaid: () => number
}

const emptyUser = (id: number): User => ({ id, name: "", beers: 0, paid: 0 })

const initialState = {
	index: 0,
	users: [emptyUser(0)],
	addUser: () => {},
	createEmptyUser: () => emptyUser(0),
	setBeers: () => {},
	setPaid: () => {},
	setName: () => {},
	getUser: () => emptyUser(0),
	totalBeers: () => 0,
	totalPaid: () => 0,
} as const satisfies State

const usePersistedStore = create(
	persist<State>(
		(set, get) =>
			({
				...initialState,
				createEmptyUser(): User {
					set((state) => ({ index: state.index + 1 }))
					return emptyUser(get().index)
				},
				addUser(): void {
					set((state) => {
						const users = [...state.users, get().createEmptyUser()]
						return { users }
					})
				},
				getUser: (index: number): User => {
					const existingUser = get().users[index]

					if (existingUser) {
						existingUser.beers ??= 0
						existingUser.paid ??= 0

						return existingUser
					}

					const newUser = get().createEmptyUser()
					set((state) => {
						const users = [...state.users, newUser]
						return { users }
					})

					return newUser
				},
				setBeers: (index: number, beers: string): void => {
					const parsedBeers = parseInt(beers)

					if (!isNaN(parsedBeers) || !beers) {
						set((state) => {
							const user = state.getUser(index)
							user.beers = parsedBeers
							return {
								users: [...state.users],
							}
						})
					}
				},
				setPaid: (index: number, paid: string): void => {
					const parsedPaid = parseFloat(paid)

					if (!isNaN(parsedPaid) || !paid) {
						set((state) => {
							const user = state.getUser(index)
							user.paid = parsedPaid
							return { users: [...state.users] }
						})
					}
				},
				setName: (index: number, name: string): void => {
					set((state) => {
						const user = state.getUser(index)
						user.name = name
						return { users: [...state.users] }
					})
				},
				totalBeers: (): number => {
					return get().users.reduce(
						(acc, user) => acc + (user.beers || 0),
						0,
					)
				},
				totalPaid: (): number => {
					return get().users.reduce(
						(acc, user) => acc + (user.paid || 0),
						0,
					)
				},
			}) satisfies State,
		{
			name: "beerStorage",
		},
	),
)

export const useStore = <T>(selector: (state: State) => T): T => {
	const [ready, setReady] = useState(false)
	const zustandState = usePersistedStore((persistedState) =>
		selector(persistedState),
	)

	useEffect(() => {
		setReady(true)
	}, [])

	if (ready) {
		return zustandState
	}

	return selector(initialState)
}

export default useStore
