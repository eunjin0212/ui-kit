import { type ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useDropdownPosition, useClickOutside } from '../../hooks/useDropdown';

interface DateWrapperProps {
	open: boolean;
	onChange: (arg: boolean) => void;
	parentRef: RefObject<HTMLElement>;
	children: ReactNode;
}

const DateWrapper = ({
	children,
	open,
	parentRef,
	onChange,
}: DateWrapperProps) => {
	const { position, dropdownRef } = useDropdownPosition(parentRef, open);
	useClickOutside([parentRef, dropdownRef], () => onChange(false));
 
	return (
		open &&
		createPortal(
			<div
				className={['absolute min-h-292pxr w-302pxr rounded-8pxr px-23pxr py-24pxr shadow-[2px_2px_12px_2px_#00000033]'].join(' ')}
				style={{
					top: position.top,
					left: position.left,
					width: position.width,
					transition: 'opacity 0.4s',
				}}
    ref={dropdownRef as RefObject<HTMLDivElement>}
			>
				{children}
			</div>,
			document.body
		)
	);
};

export default DateWrapper;
