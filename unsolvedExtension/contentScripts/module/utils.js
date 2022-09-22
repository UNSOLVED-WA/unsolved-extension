export function removeAllchild(element) {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
