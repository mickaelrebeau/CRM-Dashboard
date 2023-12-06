export function Sidebar() {
	return (
		<section className="h-full flex flex-col px-3 pt-6 w-72 border-r border-gray-200 dark:border-gray-700">
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-bold text-blue-700 dark:text-cyan-400">Navigation</h2>
					<p className="w-full hover:bg-cyan-200 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer">
						Page d'accueil
					</p>
					<p className="w-full hover:bg-cyan-200 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer">
						Graphiques
					</p>
					<p className="w-full hover:bg-cyan-200 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer">
						Email
					</p>
					<p className="w-full hover:bg-cyan-200 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer">
						Calendrier
					</p>
					<p className="w-full hover:bg-cyan-200 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer">
						Documents
					</p>
					<p className="w-full hover:bg-cyan-200 dark:hover:bg-blue-700 p-2 rounded-md cursor-pointer">
						Contacts
					</p>
				</div>
			</div>
		</section>
	);
}
