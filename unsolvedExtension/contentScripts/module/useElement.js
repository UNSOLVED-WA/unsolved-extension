const ElementInterface = (function () {
  let element = [];
  let idx = 0;

  function useElement(elementType) {
    const state = element[idx] || document.createElement(elementType);
    const _idx = idx;

    function setElement(func) {
      func(state);
      element[_idx] = state;
    }

    idx++;
    return [state, setElement];
  }

  function removeElementFromDom() {
    element.forEach((el) => el.remove());
    element = [];
    idx = 0;
  }

  return { useElement, removeElementFromDom };
})();

const useElement = ElementInterface.useElement;
const removeElementFromDom = ElementInterface.removeElementFromDom;

export { useElement, removeElementFromDom };
