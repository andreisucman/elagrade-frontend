import React, { useEffect } from "react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  ref: any;
};

export default function useHandleClickOutside({ ref, setIsOpen }: Props) {
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      const passed = ref?.current !== null && !ref?.current?.contains(e.target);
      if (passed) {
        if (setIsOpen) setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);
}
