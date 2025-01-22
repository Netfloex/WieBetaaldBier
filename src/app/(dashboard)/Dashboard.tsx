"use client"

import { Card, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/react"
import { MdAdd } from "react-icons/md"
import { useShallow } from "zustand/react/shallow"

import { useStore } from "@hooks/useStore"

import { ClearAllUsersButton } from "./ClearAllUsersButton"
import { Results } from "./Results"
import { UserRows } from "./UserRows"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const [userCount, addUser] = useStore(
		useShallow((s) => [s.users.length, s.addUser]),
	)

	return (
		<>
			<Card className="m-10 p-4">
				<CardHeader>Gebruikers</CardHeader>
				<div className="mb-4 flex h-10 items-center space-x-4">
					<ClearAllUsersButton />
					{/* <Divider orientation="vertical" /> */}
				</div>
				<div className="flex flex-col gap-4">
					<UserRows />
				</div>
				<div className="mt-4 flex justify-center">
					<Button
						onPress={addUser}
						startContent={<MdAdd size={30} />}
					>
						Voeg iemand toe
					</Button>
				</div>
			</Card>
			<Card className="m-10">{userCount > 1 && <Results />}</Card>
		</>
	)
}
