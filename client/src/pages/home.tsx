import { Chart } from "@/components/chart";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { gql } from "@apollo/client";
import { client } from "../main";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { differenceInDays, subDays } from "date-fns";
import { Loader2 } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export type ChartType = "pie" | "bar";

export function Home() {
	const [chartType, setChartType] = useState<ChartType>("bar");
	const [loading, setLoading] = useState(false);
	const [previousRate, setPreviousRate] = useState<
		{ type: string; count: number; responseRate: number }[]
	>([]);
	const [rate, setRate] = useState<
		{ type: string; count: number; responseRate: number }[]
	>([]);
	const [date, setDate] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	});

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const start = date?.from?.toISOString();
		const end = date?.to?.toISOString();

		setLoading(true);

		try {
			await client
				.query({
					query: gql`
						query ($start: DateTime, $end: DateTime) {
							stats(
								filters: {
									types: [
										"EMAIL_RECEIVED"
										"EMAIL_SENT"
										"LINKEDIN_MESSAGE_SENT"
										"LINKEDIN_MESSAGE_RECEIVED"
										"LINKEDIN_INMAIL_SENT"
										"LINKEDIN_INMAIL_RECEIVED"
									]
									startDate: $start
									endDate: $end
								}
							) {
								type
								responseRate
							}
						}
					`,
					variables: {
						start,
						end,
					},
				})
				.then(({ data }) => {
					setRate(data.stats);
				});

			await client
				.query({
					query: gql`
						query ($start: DateTime, $end: DateTime) {
							stats(
								filters: {
									types: [
										"EMAIL_RECEIVED"
										"EMAIL_SENT"
										"LINKEDIN_MESSAGE_SENT"
										"LINKEDIN_MESSAGE_RECEIVED"
										"LINKEDIN_INMAIL_SENT"
										"LINKEDIN_INMAIL_RECEIVED"
									]
									startDate: $start
									endDate: $end
								}
							) {
								type
								responseRate
							}
						}
					`,
					variables: {
						start: start
							? subDays(
									new Date(start),
									differenceInDays(
										new Date(end ? end : new Date()),
										new Date(start)
									)
							).toISOString()
							: undefined,
						end: start,
					},
				})
				.then(({ data }) => {
					setPreviousRate(data.stats);
				});
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col h-screen w-screen">
			<Header />
			<section className="h-full flex items-center gap-1">
				<Sidebar />
				<div className="h-full w-full flex flex-col items-center justify-center gap-8 p-5">
					<form
						onSubmit={handleSubmit}
						className="w-full flex items-center justify-center gap-8"
					>
						<CalendarDateRangePicker date={date} setDate={setDate} />
						<Button className="bg-blue-700 text-white hover:bg-blue-700/75 dark:bg-cyan-400 dark:text-black dark:hover:bg-cyan-400/75">
							Valider
						</Button>
					</form>
					<div className="w-full flex items-center justify-center gap-8">
						<p className="text-slate-500">Choisir un graphique : </p>
						<Select onValueChange={(value) => setChartType(value as ChartType)}>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Style de graphique" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="bar" className="cursor-pointer">
									Barre vertical
								</SelectItem>
								<SelectItem value="pie" className="cursor-pointer">
									Camenbert
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<Chart
						previousRate={previousRate}
						rate={rate}
						typeOfChart={chartType}
					/>
					{loading && (
						<div className="flex items-center justify-center gap-4 text-slate-500">
							<Loader2 className="w-4 h-4 animate-spin" />
							<p>Chargement en cours... Veillez patienter quelques secondes.</p>
						</div>
					)}
				</div>
			</section>
		</div>
	);
}
