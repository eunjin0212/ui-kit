import { createPortal } from 'react-dom';
import type { Dispatch, ReactNode, RefObject } from 'react';
import type { Option } from './DropdownItem';
import DropdownOptions from './DropdownOptions';
import Icon from './Icon';

interface BaseSelectProps {
 open: boolean;
 options: Option[]
 selectRef: RefObject<HTMLDivElement>;
 displayLabel: string;
 className?: string;
 label?: string;
 labelClassName?: string;
 children?: ReactNode;
 placeholder?: string;
 disable?: boolean;
 setOpen: Dispatch<boolean>;
 handleClick: (arg?: Option) => void;
}

export const BaseSelect = ({
 open,
 selectRef,
 displayLabel,
 className = '',
 label = '',
 labelClassName = '',
 children,
 disable = false,
 handleClick,
 setOpen,
 options = []
}: BaseSelectProps) => {
 return (
  <div className={['s-select inline-flex items-center', className].join(' ')}>
   {label && (
    <label
     htmlFor={label}
     className={[
      'relative text-center py-4pxr px-12pxr bg-Grey_Lighten-5 border border-r-0 rounded-tl-2pxr rounded-bl-2pxr',
      labelClassName,
      disable ? 'border-Grey_Lighten-2' : 'border-Grey_Lighten-1'
     ].join(' ')}
    >
     {label}
    </label>
   )}
   <div
    ref={selectRef}
    onClick={() => handleClick()}
    className={['inline-flex items-center justify-between border flex-nowrap px-8pxr py-4pxr min-w-100pxr w-full',
     label ? 'rounded-br-2pxr rounded-tr-2pxr' : 'rounded-2pxr',
     disable ? 'cursor-not-allowed border-Grey_Lighten-2 bg-Grey_Lighten-4 text-Grey_Default' : 'cursor-pointer bg-white border-Grey_Lighten-1 text-Grey_Darken-4'
    ].join(' ')}
   >
    <span className="block truncate overflow-hidden text-ellipsis max-w-full">
     {displayLabel}
    </span>
    <Icon name="ArrowDown_12" className="text-Grey_Default" />
   </div>
   {open && !disable &&
    createPortal(
     <DropdownOptions
      onClick={handleClick}
      setOpen={setOpen}
      parentRef={selectRef}
      open={open}
      options={options}
      children={children}
     />,
     document.body
    )}
  </div>
 );
};