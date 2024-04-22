import React, { useEffect, useState } from "react";
import TheSpeakerComp from "./TheSpeaker";

const TestComp = () => {
  const [toMount, setToMount] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setToMount(false);
    }, 7000);
  }, []);

  if (toMount) {
    return <TheSpeakerComp />;
  } else {
    return null;
  }
};
export default TestComp;
