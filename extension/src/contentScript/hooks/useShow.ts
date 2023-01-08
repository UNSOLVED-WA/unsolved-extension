import { useEffect, useState, useRef } from 'react';
import { StorageManager } from '../../utils';

export const useShow = () => {
  const containerRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [isScoring, setIsScoring] = useState(false);

  const show = () => setIsShow(true);
  const close = () => setIsShow(false);
  const reset = () => setIsScoring(false);

  useEffect(() => {
    function handleOutsideClick({ target }: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(target as Node)) {
        close();
      }
    }
    window.addEventListener('click', handleOutsideClick, { capture: true });
    StorageManager.get('isClicked', (result) => {
      if (result) {
        setIsScoring(true);
        setIsShow(result);
        StorageManager.set('isClicked', false);
      }
    });
    return () => {
      window.removeEventListener('click', handleOutsideClick, { capture: true });
    };
  }, []);

  return { isShow, isScoring, containerRef, show, close, reset };
};
