import { useStore } from "@hooks/useStore"

import { UserRow } from "./UserRow"

import type { FC } from "react"

export const UserRows: FC = () => {
	const users = useStore((s) => s.users)
	return (
		<>
			{users.map((user) => (
				<UserRow key={user.id} user={user} />
			))}
		</>
	)
}
