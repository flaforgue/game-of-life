export function hydrateSwitchInputChange(
  name: string,
  handler: (value: string) => void,
  initialValue: boolean,
) {
  const inputs = [...document.getElementsByName(name)] as
    | HTMLInputElement[]
    | null;

  if (inputs === null || inputs.length <= 1) {
    throw new Error(`Switch inputs ${name} not found`);
  }

  for (const input of inputs) {
    input.addEventListener("change", (e: Event) => {
      handler((e.target as HTMLInputElement).value);
    });
  }

  const inputToCkeck = initialValue
    ? inputs.find((input) => input.value === "1")
    : inputs.find((input) => input.value === "0");

  if (inputToCkeck === undefined) {
    throw new Error(
      `Input to ckeck ${name} for value ${initialValue} not found`,
    );
  }

  inputToCkeck.checked = true;
}
