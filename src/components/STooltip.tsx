import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Close12 } from '../assets/CloseIcon';

export interface TooltipProps {
 children: ReactNode;
 button: string | ReactNode;
 /**
  * @description The location where the tooltip appears.
  * @default 'top'
  */
 location?: 'top' | 'bottom' | 'right' | 'left'
 useToggle?: boolean;
 title?: string
 actions?: ReactNode[]
}

const initParentDOMRect = {
 height: 0,
 width: 0,
 x: 0,
 y: 0,
 right: 0,
 bottom: 0,
 left: 0,
 top: 0,
};

const initSize = { width: 0, height: 0 }

const STooltip = ({ children, button, location = 'top', useToggle = false, title, actions }: TooltipProps) => {
 const [hover, setHover] = useState(false)
 const [position, setPosition] = useState<Omit<DOMRect, 'toJSON'>>(initParentDOMRect);
 const [tooltipSize, setTooltipSize] = useState<typeof initSize>(initSize);

 const buttonRef = useRef<HTMLDivElement>(null)
 const tooltipRef = useRef<HTMLElement>(null)

 const updatePositionAndSize = useCallback(() => {
  if (buttonRef.current) {
   setPosition(buttonRef.current.getBoundingClientRect());
  }

  if (tooltipRef.current) {
   setTooltipSize({
    width: tooltipRef.current.offsetWidth,
    height: tooltipRef.current.offsetHeight,
   });
  }
 }, [buttonRef, tooltipRef]);

 useEffect(() => {
  updatePositionAndSize();

  window.addEventListener('resize', updatePositionAndSize);

  return () => {
   window.removeEventListener('resize', updatePositionAndSize);
  };
 }, [updatePositionAndSize]);


 const handleHover = (val: typeof hover) => {
  setHover(val)
  updatePositionAndSize();
 }

 const locationStyle = useMemo(() => {
  const SPACING = 4
  const ARROW_HEIGHT = 12
  const ARROW_WIDTH = 8
  const positionX = position.left + window.scrollX - (tooltipSize.width / 2) + (position.width / 2)
  const positionY = position.top + window.scrollY - (tooltipSize.height / 2) + (position.height / 2)

  return {
   top: {
    top: position.top + window.scrollY - tooltipSize.height - SPACING - ARROW_HEIGHT,
    left: positionX,
   },
   bottom: {
    top: position.top + window.scrollY + position.height + SPACING + ARROW_HEIGHT,
    left: positionX,
   },
   right: {
    top: positionY,
    left: position.left + window.scrollX + position.width + SPACING + ARROW_WIDTH,
   },
   left: {
    top: positionY,
    left: position.left + window.scrollX - tooltipSize.width - SPACING - ARROW_WIDTH,
   },
  }
 }, [position, tooltipSize])

 const arrowClass = useMemo(() => {
  return {
   top: '-bottom-8pxr left-1/2 -translate-x-1/2',
   bottom: '-top-8pxr left-1/2 -translate-x-1/2',
   right: '-left-8pxr top-1/2 -translate-y-1/2',
   left: '-right-8pxr top-1/2 -translate-y-1/2',
  }
 }, []);
 return (
  <div
   ref={buttonRef}
   onMouseOver={() => handleHover(true)}
   onMouseOut={() => !useToggle && handleHover(false)}
   className='relative'
  >{button}
   {hover && createPortal(
    <aside
     className='absolute shadow-[2px_2px_8px_2px_#00000033]'
     ref={tooltipRef}
     style={locationStyle[location]}
    >
     <span className={[
      arrowClass[location],
      'absolute w-18pxr h-18pxr inline-block bg-Blue_B_Darken-2 transform rotate-45 rounded-2pxr'
     ].join(' ')}></span>
     {useToggle && <button className='absolute text-white top-12pxr right-12pxr' onClick={() => handleHover(!hover)}>
      <Close12 />
     </button>}
     <div className='font-medium text-white w-fit bg-Blue_B_Darken-2 rounded-4pxr'>
      <div className={[
        useToggle ? 'pl-20pxr pr-36pxr' : 'px-20pxr',
        title ? 'py-12pxr' : 'py-8pxr',
       ].join(' ')}>
       {title && <strong className='leading-20pxr mb-4pxr'>{title}</strong>}
       {children}
      </div>
      {actions && <div className='inline-flex items-center justify-between w-full px-20pxr pb-12pxr'>{actions.map((action) => action)}</div>}
     </div>
    </aside>, document.body)}
  </div>)
}

export default STooltip