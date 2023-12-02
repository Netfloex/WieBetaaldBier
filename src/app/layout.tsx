import "@styles/global.scss"

import { Providers } from "./Providers"

import { FCC } from "@typings/FCC"

const RootLayout: FCC = ({ children }) => (
	<html lang="en" className="dark">
		<head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width" />
		</head>
		<body>
			<Providers>{children}</Providers>
		</body>
	</html>
)

export default RootLayout
