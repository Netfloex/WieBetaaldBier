import { create } from "zustand"

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

export const useStore = create<State>(
	(set, get) =>
		({
			index: 0,
			createEmptyUser(): User {
				set((state) => ({ index: state.index + 1 }))
				return emptyUser(get().index)
			},
			users: [emptyUser(0)],
			addUser(): void {
				set((state) => {
					const users = [...state.users, get().createEmptyUser()]
					return { users }
				})
			},
			getUser: (index: number): User => {
				const existingUser = get().users[index]

				if (existingUser) {
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

				if (!isNaN(parsedBeers)) {
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

				if (!isNaN(parsedPaid)) {
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
				return get().users.reduce((acc, user) => acc + user.beers, 0)
			},
			totalPaid: (): number => {
				return get().users.reduce((acc, user) => acc + user.paid, 0)
			},
		}) satisfies State,
)
