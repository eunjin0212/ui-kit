import { createPortal } from 'react-dom';
import DropdownOptions, { Option } from './DropdownOptions';
import Icon from './Icon';
import { ReactNode, RefObject } from 'react';

interface BaseSelectProps {
  isOpen: boolean;
  options: Option[]
  selectRef: RefObject<HTMLDivElement>;
  displayLabel: string;
  className?: string;
  label?: string;
  labelClassName?: string;
  children?: ReactNode;
  placeholder?: string;
  handleClick: (arg?: Option) => void;
}

export const BaseSelect = ({
  isOpen,
  selectRef,
  displayLabel,
  className = '',
  label = '',
  labelClassName = '',
  children,
  handleClick,
  options = []
}: BaseSelectProps) => {
  return (
    <div className={['s-select', className].join(' ')}>
      {label && (
        <label
          htmlFor={label}
          className={[
            'relative text-center leading-20pxr',
            labelClassName,
          ].join(' ')}
        >
          {label}
        </label>
      )}
      <div
        ref={selectRef}
        onClick={() => handleClick()}
        className="flex items-center justify-between bg-white border cursor-pointer flex-nowrap rounded-2pxr border-Grey_Lighten-1 px-8pxr py-4pxr text-Grey_Darken-4"
      >
        {displayLabel}
        <Icon name="ArrowDown_12" className="text-Grey_Default" />
      </div>
      {isOpen &&
        createPortal(
          <DropdownOptions
            onClick={handleClick}
            parentRef={selectRef}
            open={isOpen}
            options={options}
          />,
          document.body
        )}
    </div>
  );
};