export function hydrateInputChange(
  id: string,
  handler: (value: string) => void,
  initialValue: string,
) {
  const input = document.getElementById(id) as HTMLInputElement | null;
  if (input === null) {
    throw new Error(`Input ${id} not found`);
  }

  input.addEventListener("change", (e: Event) => {
    handler((e.target as HTMLInputElement).value);
  });

  input.value = initialValue;
}
