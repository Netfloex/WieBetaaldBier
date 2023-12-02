"use client"

import { NextUIProvider } from "@nextui-org/react"

import { FCC } from "@typings/FCC"

export const Providers: FCC = ({ children }) => {
	return <NextUIProvider>{children}</NextUIProvider>
}
