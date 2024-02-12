"use client"

import { Card, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/react"
import { MdAdd } from "react-icons/md"

import { useStore } from "@hooks/useStore"

import { ClearAllUsersButton } from "./ClearAllUsersButton"
import { Results } from "./Results"
import { UserRows } from "./UserRows"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const [userCount, addUser] = useStore((s) => [s.users.length, s.addUser])

	return (
		<>
			<Card className="p-4 m-10">
				<CardHeader>Gebruikers</CardHeader>
				<div className="mb-4 h-10 flex items-center space-x-4">
					<ClearAllUsersButton />
					{/* <Divider orientation="vertical" /> */}
				</div>
				<div className="flex gap-4 flex-col">
					<UserRows />
				</div>
				<div className="flex justify-center mt-4">
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
