import { Animator } from '@arwes/react';
import { GridLines } from '@arwes/react';
import { useState, useEffect } from 'react';

export default function BgGrid() {
	const [active, setActive] = useState(true);

	useEffect(() => {
		const iid = setInterval(() => setActive((active) => !active), 1300);
		return () => clearInterval(iid);
	}, []);

	return (
		<Animator active={active} duration={{ enter: 0.5, exit: 0.5 }}>
			<div
				style={{
					zIndex: -1,
					position: 'absolute',
					width: '100%',
					height: '100%',
				}}
			>
				<GridLines
					lineColor="hsla(180, 100%, 75%, 0.2)"
					lineWidth={2}
					distance={40}
					horizontalLineDash={[4]}
					verticalLineDash={[4]}
				/>
			</div>
		</Animator>
	);
}
