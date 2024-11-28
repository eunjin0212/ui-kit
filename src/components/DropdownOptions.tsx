import {
 type Dispatch,
	type ReactNode,
	type RefObject,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import DropdownItem, { type Option } from './DropdownItem';

const initParentDOMRect = {
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	bottom: 0,
	left: 0,
	top: 0,
};

interface DropdownProps {
	options: Option[];
	parentRef: RefObject<HTMLElement>;
	onClick: (arg?: Option) => void;
	open: boolean;
 setOpen: Dispatch<boolean>
	children?: ReactNode;
}

const DropdownOptions = ({
	options,
	parentRef,
	onClick,
	open,
 setOpen,
	children,
}: DropdownProps) => {
	const [position, setPosition] = useState(initParentDOMRect);
	const dropdownRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (parentRef.current) {
			setPosition(parentRef.current.getBoundingClientRect());
		}
	}, [parentRef]);

	const handleClickOutside = useCallback(
		(e: MouseEvent) => {
			if (
				parentRef.current &&
				!parentRef.current.contains(e.target as Node) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
    console.log('handleClickOutside')
				setOpen(false)
			}
		},
		[parentRef, setOpen]
	);

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open, handleClickOutside]);

	return (
			<ul
				className='s-dropdown__options rounded-2pxr bg-white shadow-dropdownOptions'
				ref={dropdownRef}
				style={{
					position: 'absolute',
					top: position.top + position.height + 4 + window.scrollY,
					left: position.left + window.scrollX,
					width: position.width,
				}}
			>
				{children
					? children
					: options.map((opt, idx) => (
							<DropdownItem
								option={opt}
								idx={idx}
								key={idx}
								handleClick={() => onClick(opt)}
							/>
						))}
			</ul>
	);
};

export default DropdownOptions;
