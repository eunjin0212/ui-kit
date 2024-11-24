import {
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import DropdownItem from './DropdownItem';

const initParentDOMRect = {
	height: 0,
	width: 0,
	x: 0,
	y: 0,
	bottom: 0,
	left: 0,
	top: 0,
};

export type Option =
	| {
			[x: string]: string | number;
			label: string;
			value: string | number;
	  }
	| string
	| number;

export type DropdownOptionProps =
	| Option
	| {
			disable?: boolean;
			display?: boolean;
	  }
	| string
	| number;

interface DropdownOptionsProps {
	options: DropdownOptionProps[];
	parentRef: RefObject<HTMLElement>;
	onClick: (arg?: Option) => void;
	open: boolean;
	optionLabel?: string;
	optionValue?: string;
}

const DropdownOptions = ({
	options = [],
	optionLabel = 'label',
	optionValue = 'value',
	parentRef,
	onClick,
	open,
}: DropdownOptionsProps) => {
	const [position, setPosition] =
		useState<Omit<DOMRect, 'toJSON' | 'right'>>(initParentDOMRect);
	const dropdownRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (parentRef.current!) {
			setPosition(parentRef.current.getBoundingClientRect());
		}
	}, [parentRef]);

	const handleClickOutSide = useCallback(
		(e: MouseEvent) => {
			if (
				parentRef.current &&
				!parentRef.current.contains(e.target as Node) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node)
			) {
				onClick();
			}
		},
		[parentRef, dropdownRef, onClick]
	);

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutSide);
		} else {
			document.removeEventListener('mousedown', handleClickOutSide);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutSide);
		};
	}, [open, handleClickOutSide]);

	const displayOptions = useMemo(() => {
		return options.map((opt) => {
			const optLabel =
				typeof opt === 'object'
					? String(opt[optionLabel as keyof typeof opt])
					: String(opt);
			const optValue =
				typeof opt === 'object'
					? opt[optionValue as keyof typeof opt]
					: String(opt);

			return {
				label: optLabel,
				value: optValue,
				display: typeof opt === 'object' ? opt.display : undefined,
				disable: typeof opt === 'object' ? opt.disable : undefined,
			};
		});
	}, [optionLabel, optionValue, options]);

	const handleClick = (opt: (typeof displayOptions)[number]) => {
		if (typeof options[0] === 'object' && options[0] !== null) {
			const findResult = options.find(
				(originOpt) =>
					typeof originOpt === 'object' &&
					originOpt[optionValue as keyof typeof originOpt] === opt.value
			);

			onClick(findResult as Option);
			return;
		}

		const findResult = options.find((originOpt) => originOpt === opt.value);
		onClick(findResult as Option);
	};

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
			{displayOptions.map((opt, idx) => (
				<DropdownItem
					option={opt}
					idx={idx}
					handleClick={() => handleClick(opt)}
				/>
			))}
		</ul>
	);
};

export default DropdownOptions;
