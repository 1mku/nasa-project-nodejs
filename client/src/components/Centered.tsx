import { FrameSVG, FrameSVGPathGeneric } from "@arwes/react";
import { useMemo } from "react";

const Centered = (props: { children: React.ReactNode }) => {
	const { children } = props;
	const paths: FrameSVGPathGeneric[] = useMemo(
		() => [
			// Background shape.
			{
				name: "bg",
				style: {
					strokeWidth: 0,
					fill: "hsl(180, 75%, 10%)",
					filter: "drop-shadow(0 0 2px hsl(180, 75%, 10%))",
				},
				path: [
					["M", 20, 20],
					["L", 20, "100% - 20"],
					["L", "100% - 20", "100% - 20"],
					["L", "100% - 20", 20],
				],
			},
			// Top decoration.
			{
				name: "line",
				style: {
					strokeWidth: "1",
					stroke: "hsl(180, 75%, 50%)",
					fill: "none",
					filter: "drop-shadow(0 0 2px hsl(180, 75%, 50%))",
				},
				path: [
					["M", 10, 10],
					["L", "100% - 10", 10],
					["L", "100% - 10", 40],
				],
			},
			// Bottom decoration.
			{
				name: "line",
				style: {
					strokeWidth: "2",
					stroke: "hsl(180, 75%, 50%)",
					fill: "none",
					filter: "drop-shadow(0 0 2px hsl(180, 75%, 50%))",
				},
				path: [
					["M", "100% - 10", "100% - 10"],
					["L", 10, "100% - 10"],
					["L", 10, "100% - 40"],
				],
			},
		],
		[],
	);

	return (
		<div
			style={{
				margin: "0 auto",
				maxWidth: 800,
			}}
		>
			<FrameSVG paths={paths} />
			{children}
		</div>
	);
};

export default Centered;
