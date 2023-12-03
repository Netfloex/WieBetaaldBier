"use client"

import { Card } from "@nextui-org/card"
import { Button } from "@nextui-org/react"
import { MdAdd } from "react-icons/md"

import { useStore } from "@hooks/useStore"

import { Results } from "./Results"
import { UserRow } from "./UserRow"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const [userCount, addUser] = useStore((s) => [s.users.length, s.addUser])

	return (
		<>
			<Card className="p-4 m-10">
				<div className="flex gap-4 flex-col">
					{Array.from({ length: userCount }, (_, index) => (
						<UserRow key={index} index={index} />
					))}
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
