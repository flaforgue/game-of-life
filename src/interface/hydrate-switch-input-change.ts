export function hydrateSwitchInputChange(
  name: string,
  toggleHandler: () => void,
  initialIsOn: boolean,
) {
  let isOn = initialIsOn;
  const inputs = [...document.getElementsByName(name)] as HTMLInputElement[];

  const isOnInput = inputs.find(({ value }) => value === "1");
  if (isOnInput === undefined) {
    throw new Error(`isOnInput not found for switch ${name}`);
  }

  const isOffInput = inputs.find(({ value }) => value === "0");
  if (isOffInput === undefined) {
    throw new Error(`isOnInput not found for switch ${name}`);
  }

  const syncSwitchState = () => {
    if (isOn) {
      isOnInput.checked = true;
      isOffInput.checked = false;
    } else {
      isOnInput.checked = false;
      isOffInput.checked = true;
    }
  };

  const toggleSwitch = () => {
    isOn = !isOn;
    syncSwitchState();
    toggleHandler();
  };

  syncSwitchState();

  for (const input of inputs) {
    input.addEventListener("click", toggleSwitch);
  }
}
