"use client"

import { HeroUIProvider } from "@heroui/react"

import { FCC } from "@typings/FCC"

export const Providers: FCC = ({ children }) => {
	return <HeroUIProvider>{children}</HeroUIProvider>
}
