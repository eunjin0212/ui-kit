interface ItemProps {
 option: {
  label: string;
  value: string | number | boolean | undefined;
  display?: string | number | boolean;
  disable?: string | number | boolean;
 }
 idx: number;
 handleClick: () => void
}

const DropdownItem = ({ option, idx, handleClick }: ItemProps) => {
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
    {typeof option === 'string' ? (
     <div>{option}</div>
    ) : (
     <div dangerouslySetInnerHTML={{ __html: option.label }}></div>
    )}
   </li>
  )
 )
}

export default DropdownItem
