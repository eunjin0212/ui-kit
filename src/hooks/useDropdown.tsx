import { type RefObject, useCallback, useEffect, useRef, useState } from 'react';

const useClickOutside = (
	refs: RefObject<HTMLElement>[],
	onOutsideClick: (arg: boolean) => void
) => {
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				refs.every(
					(ref) => ref.current && !ref.current.contains(event.target as Node)
				)
			) {
				onOutsideClick(false);
			}
		},
		[refs, onOutsideClick]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);
};

const useDropdownPosition = (
	parentRef: RefObject<HTMLElement>,
	isOpen: boolean
) => {
	const [position, setPosition] = useState({ width: 0, left: 0, top: 0 });
	
 const dropdownRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (isOpen && dropdownRef.current && parentRef.current) {
			const parentRect = parentRef.current.getBoundingClientRect();
			const dropdownHeight = dropdownRef.current.offsetHeight;
			const viewportHeight = window.innerHeight;
			const margin = 4;

			const top =
				parentRect.bottom + dropdownHeight > viewportHeight
					? parentRect.top - (dropdownHeight + margin)
					: parentRect.bottom + margin;

			setPosition({
				top,
				width: parentRect.width,
				left: parentRect.left,
			});
		}
	}, [isOpen, parentRef]);

	return { position, dropdownRef };
};

export { useDropdownPosition, useClickOutside };
