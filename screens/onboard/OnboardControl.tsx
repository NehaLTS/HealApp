import { SetStateAction } from "react";

// OnboardControl.js
export const startChangingText = (setCircleText: { (value: SetStateAction<number>): void; (arg0: number): void; }) => {
  let counter = 1;
  const interval = setInterval(() => {
    if (counter === 3) {
      clearInterval(interval); // Stop changing text after reaching the desired count.
    }
    setCircleText(counter);
    counter++;
  }, 5000); // Change every 5 seconds.
};
