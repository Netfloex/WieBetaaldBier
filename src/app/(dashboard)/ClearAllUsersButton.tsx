import { Button } from "@heroui/button"
import { Checkbox } from "@heroui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover"
import { useCallback, useState } from "react"
import { MdDelete } from "react-icons/md"
import { useShallow } from "zustand/react/shallow"

import useStore from "@hooks/useStore"

import type { FC } from "react"

export const ClearAllUsersButton: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [clearAll, setClearAll] = useState(false)

	const [userCount, clearUsers] = useStore(
		useShallow((s) => [s.users.length, s.clearUsers]),
	)

	const clear = useCallback(() => {
		clearUsers(clearAll)
		setIsOpen(false)
		setClearAll(false)
	}, [clearAll, clearUsers])

	return (
		<Popover
			placement="bottom"
			isOpen={isOpen}
			onOpenChange={(open) => setIsOpen(open)}
		>
			<PopoverTrigger>
				<Button
					color="danger"
					startContent={<MdDelete size={20} />}
					isDisabled={userCount == 0}
				>
					Clear
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				{(titleProps) => {
					return (
						<div className="p-4">
							<h3
								className="mb-3 text-lg font-bold"
								{...titleProps}
							>
								Weet je zeker dat je alle bieren en betalingen
								wilt verwijderen?
							</h3>
							<div>
								<Checkbox
									color="default"
									isSelected={clearAll}
									onValueChange={setClearAll}
								>
									Verwijder ook de gebruikerslijst
								</Checkbox>
								<div className="mt-4 flex justify-end space-x-2">
									<Button onPress={clear} color="danger">
										Verwijder
									</Button>
								</div>
							</div>
						</div>
					)
				}}
			</PopoverContent>
		</Popover>
	)
}
