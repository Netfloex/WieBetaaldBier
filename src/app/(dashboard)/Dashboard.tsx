"use client"

import { Card } from "@nextui-org/card"
import { Button } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { MdAdd } from "react-icons/md"

import { UserRow } from "./UserRow"

import type { FC } from "react"

export const Dashboard: FC = () => {
	const [userCount, setUserCount] = useState(1)

	const addUser = useCallback(() => {
		setUserCount((u) => u + 1)
	}, [])

	return (
		<Card className="p-4 m-10">
			<h1>Dashboard</h1>
			<div className="flex gap-4 flex-col">
				{Array.from({ length: userCount }, (_, index) => (
					<UserRow key={index} />
				))}
			</div>
			<div className="flex justify-center mt-4">
				<Button isIconOnly onClick={addUser}>
					<MdAdd size={30} />
				</Button>
			</div>
		</Card>
	)
}
