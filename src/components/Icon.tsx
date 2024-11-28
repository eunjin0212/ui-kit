import { icons } from '../assets/icons';
import colors from '../css/colors';

export interface IconProps {
	name: string; // 'HelpOutline_16'과 같은 형식
	color?: keyof typeof colors;
	className?: string;
	onClick?: () => void;
}

const Icon = ({ name, color, className, onClick }: IconProps) => {
	const [iconName, iconSizeStr] = name.split('_');
	const iconSize = parseInt(iconSizeStr, 10);
	const IconComponent = icons[iconName]?.[iconSize];

	if (!IconComponent) {
		return <span>Icon not found</span>;
	}

	return (
		<IconComponent
			color={color}
			className={className}
			onClick={() => onClick?.()}
		/>
	);
};

export default Icon;
