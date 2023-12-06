/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ArcElement
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import { ChartType } from "../pages/home";

ChartJS.register(
	ArcElement,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface ChartProps {
	typeOfChart: ChartType;
	previousRate: unknown[];
	rate: unknown[];
}

export const Chart: React.FC<ChartProps> = ({ typeOfChart, rate, previousRate }) => {
	const theme = localStorage.getItem("vite-ui-theme");

	const filteredDataRate =
		Array.isArray(rate) && rate.length > 0
			? rate.filter((item: any) => item.type.endsWith("_RECEIVED"))
			: [];

	const filteredDataPreviousRate =
		Array.isArray(previousRate) && previousRate.length > 0
			? previousRate.filter((item: any) => item.type.endsWith("_RECEIVED"))
			: [];

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Taux de réponses aux emails/messages envoyés",
			},
		},
	};

	const labels = ["Emails", "Linkedin Messages", "Linkedin Inmail"];

	const data = {
		labels,
		datasets: [
			{
				label: "Période Précédente",
				data: filteredDataPreviousRate.map(
					(item: any) => item.responseRate * 100
				),
				backgroundColor: theme === "light" ? "#f87171" : "#ef4444",
			},
			{
				label: "Période Actuelle",
				data: filteredDataRate.map((item: any) => item.responseRate * 100),
				backgroundColor: theme === "light" ? "#22d3ee" : "#3b82f6",
			},
		],
	};

	return (
		<>
			{typeOfChart === "bar" ? (
				<div className="w-[800px] min-w-[200px]">
					<Bar options={options} data={data} />
				</div>
			) : (
				<div className="w-[400px] h-[400px]">
					<Pie options={options} data={data} />
				</div>
			)}
		</>
	);
};
