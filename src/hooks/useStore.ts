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
	clearUsers: (deleteUsers: boolean) => void
	deleteUser: (index: number) => void
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
	clearUsers(): void {},
	deleteUser: () => {},
} as const satisfies State

export const useStore = create(
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
				clearUsers(deleteUsers): void {
					if (deleteUsers) {
						set((state) => {
							state.users = [emptyUser(0)]
							state.index = 0
							console.log(state)

							return {}
						})
						console.log(get())
					} else {
						set((state) => {
							const users = state.users.map((user) => {
								user.beers = 0
								user.paid = 0
								return user
							})
							return { users }
						})
					}
				},
				deleteUser(index: number): void {
					set((state) => {
						const users = state.users.filter(
							(user) => user.id !== index,
						)
						return { users }
					})
				},
			}) satisfies State,
		{
			name: "beerStorage",
			// skipHydration: true,
		},
	),
)

export default useStore
