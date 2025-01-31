import { type ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useDropdownPosition, useClickOutside } from '../../hooks/useDropdown';

interface TimeWrapperProps {
	open: boolean;
	onChange: (arg: boolean) => void;
	parentRef: RefObject<HTMLElement>;
	children: ReactNode;
	timeFormat?: '12' | '24';
}

const TimeWrapper = ({
	children,
	open,
	parentRef,
	onChange,
	timeFormat = '24',
}: TimeWrapperProps) => {
	const { position, childRef } = useDropdownPosition(parentRef, open);
	useClickOutside([parentRef, childRef], () => onChange(false));

	return (
		open &&
		createPortal(
			<div
				className={[
					'absolute h-124pxr z-10 rounded-8pxr bg-white shadow-[2px_2px_12px_2px_#00000033]',
					timeFormat === '12' ? 'w-240pxr' : 'w-144pxr p-24pxr',
				].join(' ')}
				style={{
					top: position.top,
					left: position.left,
					transition: 'opacity 0.4s',
				}}
				ref={childRef as RefObject<HTMLDivElement>}
			>
				{children}
			</div>,
			document.body
		)
	);
};

export default TimeWrapper;
