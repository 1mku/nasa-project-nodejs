import { useBleeps } from "@arwes/react";
import { BleepNames } from "../settings";

const Clickable = (props: {
	children: React.ReactNode;
	name?: BleepNames;
	onClick?: React.MouseEventHandler<HTMLElement>;
}) => {
	const { children, name = "click", onClick } = props;
	const bleeps = useBleeps<BleepNames>();
	const clickWithSound = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		bleeps[name]?.play();
		onClick?.(e);
	};

	// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
	return <span onClick={clickWithSound}>{children}</span>;
};

export default Clickable;
