import { SVGProps } from 'react';
import { ArrowDown24 } from './ArrowDownIcon';
import { ArrowLeftEnd12 } from './ArrowLeftEndIcon';
import { ArrowLeft12 } from './ArrowLeftIcon';
import { ArrowRightEnd12 } from './ArrowRightEndIcon';
import { ArrowRight12 } from './ArrowRightIcon';
import { Check12 } from './CheckIcon';
import { Close12 } from './CloseIcon';
import { HelpOutline16, HelpOutline24 } from './HelpOutlineIcon';
import { LineDown12 } from './LineDownIcon';
import { LineUp12 } from './LineUpIcon';
import { Minus8, Minus12 } from './MinusIcon';
import { NotificationOutline24 } from './NotificationOulineIcon';
import { Setting24 } from './SettingIcon';
import { VisibilityOff16 } from './VisibilityOffIcon';
import { VisibilityOn16 } from './VisibilityOnIcon';

export const icons: Record<
	string,
	Record<number, React.ComponentType<SVGProps<SVGSVGElement>>>
> = {
	ArrowDown: {
		24: ArrowDown24,
	},
	ArrowLeftEnd: {
		12: ArrowLeftEnd12,
	},
	ArrowLeft: {
		12: ArrowLeft12,
	},
	ArrowRightEnd: {
		12: ArrowRightEnd12,
	},
	ArrowRight: {
		12: ArrowRight12,
	},
	Check: {
		12: Check12,
	},
	Close: {
		12: Close12,
	},
	HelpOutline: {
		16: HelpOutline16,
		24: HelpOutline24,
	},
	LineDown: {
		12: LineDown12,
	},
	LineUp: {
		12: LineUp12,
	},
	Minus: {
		8: Minus8,
		12: Minus12,
	},
	NotificationOutline: {
		24: NotificationOutline24,
	},
	Setting: {
		24: Setting24,
	},
	VisibilityOff: {
		16: VisibilityOff16,
	},
	VisibilityOn: {
		16: VisibilityOn16,
	},
};