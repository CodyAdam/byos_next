import screens from "@/app/recipes/screens.json";
import tools from "@/app/tools/tools.json";
import { ClientMainLayout } from "@/components/client-main-layout";

/**
 * Server Component that handles all data fetching and passes it to client components.
 *
 * This component:
 * 1. Centralizes data fetching through getInitData() which is cached
 * 2. Preloads data for other routes to improve navigation performance
 * 3. Processes recipe and tool data on the server
 * 4. Passes the complete set of server data to ClientMainLayout
 */
export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	// Process recipe and tool data on the server to reduce client-side computation
	const recipesComponents = Object.entries(screens)
		.filter(
			([, config]) => process.env.NODE_ENV !== "production" || config.published,
		)
		.sort((a, b) => a[1].title.localeCompare(b[1].title));

	const toolsComponents = Object.entries(tools)
		.filter(
			([, config]) => process.env.NODE_ENV !== "production" || config.published,
		)
		.sort((a, b) => a[1].title.localeCompare(b[1].title));

	// Pass all data to the ClientMainLayout
	// This ensures data is shared across pages through the centralized cache
	return (
		<ClientMainLayout
			recipesComponents={recipesComponents}
			toolsComponents={toolsComponents}
		>
			{children}
		</ClientMainLayout>
	);
}
