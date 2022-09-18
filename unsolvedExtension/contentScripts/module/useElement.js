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

  return { useElement };
})();

const useElement = ElementInterface.useElement;

export { useElement };
