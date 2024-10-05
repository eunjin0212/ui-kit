import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface TooltipProps {
 children: ReactNode;
 button: string | JSX.Element;
 /**
  * @description The location where the tooltip appears.
  * @default 'top'
  */
 location?: 'top' | 'bottom' | 'right' | 'left'
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

const STooltip = ({ children, button, location = 'top' }: TooltipProps) => {
 const [hover, setHover] = useState(false)
 const [position, setPosition] = useState<Omit<DOMRect, 'toJSON'>>(initParentDOMRect);
 const [tooltipSize, setTooltipSize] = useState<typeof initSize>(initSize);

 const buttonRef = useRef<HTMLButtonElement>(null)
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
   top: 'border-x-8pxr border-t-12pxr -bottom-12pxr border-t-Blue_B_Darken-2 border-b-transparent border-x-transparent left-1/2 -translate-x-1/2',
   bottom: 'border-x-8pxr border-b-12pxr -top-12pxr border-b-Blue_B_Darken-2 border-t-transparent border-x-transparent left-1/2 -translate-x-1/2',
   right: 'border-y-8pxr border-r-12pxr -left-12pxr border-r-Blue_B_Darken-2 border-l-transparent border-y-transparent top-1/2 -translate-y-1/2',
   left: 'border-y-8pxr border-l-12pxr -right-12pxr border-l-Blue_B_Darken-2 border-r-transparent border-y-transparent top-1/2 -translate-y-1/2',
  }
 }, []);
 return (
  <button
   ref={buttonRef}
   onMouseOver={() => handleHover(true)}
   onMouseOut={() => handleHover(true)}
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
      'absolute w-0 h-0'
     ].join(' ')}></span>
     <div className='w-fit py-8pxr px-20pxr bg-Blue_B_Darken-2 text-white font-medium rounded-4pxr'>
      {children}
     </div>
    </aside>, document.body)}
  </button>)
}

export default STooltip