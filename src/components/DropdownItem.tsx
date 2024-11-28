import type { ReactNode } from 'react';

export type Option = {
 label: string;
 value: string | number;
 disable?: boolean;
 display?: boolean;
} & {
 [key: string]: string | number | boolean | undefined; // Index signature
};

interface ItemProps {
 option: Option
 idx: number;
 handleClick: () => void;
 children?: ReactNode;
}

const DropdownItem = ({ option, idx, handleClick, children }: ItemProps) => {
 return (
  (option.display === undefined || option.display) && (
   <li
    key={`s-dropdown__option--${idx}`}
    className={[
     'px-12pxr py-4pxr text-Grey_Darken-4 hover:bg-Blue_C_Default hover:text-white aria-disabled:bg-white aria-disabled:text-Grey_Lighten-1',
     option?.disable ? 'cursor-not-allowed' : 'cursor-pointer',
    ].join(' ')}
    aria-disabled={option.disable as boolean}
    onClick={() => handleClick()}
   >
    {children ? (
     <div>{children}</div>
    ) : (
     <div dangerouslySetInnerHTML={{ __html: option.label }}></div>
    )}
   </li>
  )
 )
}

export default DropdownItem
