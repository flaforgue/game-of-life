export function hydrateLabel(id: string, getText: () => string) {
  const label = document.getElementById(id);
  if (label === null) {
    throw new Error(`Could not find label ${id}`);
  }

  const updateTextContent = () => {
    label.textContent = getText();
  };
  updateTextContent();
  setInterval(updateTextContent, 1000);
}
