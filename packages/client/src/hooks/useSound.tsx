import { useBleeps } from '@arwes/react';
import type { BleepNames } from '@/settings';

export default function useSound() {
	const bleeps = useBleeps<BleepNames>();
	const intro = () => bleeps.intro?.play();
	const click = () => bleeps.click?.play();
	const error = () => {
		console.log('onFailureSound');
		bleeps.error?.play();
	};
	return { intro, click, error };
}
