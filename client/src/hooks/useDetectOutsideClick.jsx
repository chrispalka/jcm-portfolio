import { useState, useEffect } from 'react';

/**
 * Hook for handling closing when clicking outside of an element
 * @param {React.node} el
 */
export const useDetectOutsideClick = (el) => {
  const [isActive, setIsActive] = useState(false);
  const idList = ['nav-click', 'hamburger'];
  const eclusionaryTagName = 'path';

  useEffect(() => {
    const onClick = (e) => {
      if (
        el.current !== null &&
        !el.current.contains(e.target) &&
        !idList.includes(e.target.id) &&
        e.target.tagName !== eclusionaryTagName
      ) {
        setIsActive(!isActive);
      }
    };

    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
