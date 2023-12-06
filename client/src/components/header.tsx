import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button"

export function Header() {
    return (
			<div className="p-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
				<h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-700">
					CRM Dashboard
				</h1>
				<div className="flex items-center gap-4">
					<p>Bienvenue, Quentin</p>
					<ModeToggle />
					<Button
						variant={"outline"}
						className="hover:bg-cyan-200 dark:hover:bg-blue-700"
					>
						Profile
					</Button>
					<Button
						variant={"outline"}
						className="hover:bg-cyan-200 dark:hover:bg-blue-700"
					>
						Déconnexion
					</Button>
				</div>
			</div>
		);
}