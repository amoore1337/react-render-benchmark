import React from "react";
import { measureRender } from "../measureRender";
import { renderCompleteEvent } from "../utils";

export function useMeasureComponentRender() {
  React.useEffect(() => {
    runAfterFramePaint(() => {
      // Set a performance mark shortly after the frame has been produced.
      measureRender.stop();
      document.dispatchEvent(new Event(renderCompleteEvent));
    });
  });
}

function runAfterFramePaint(callback: () => void) {
  requestAnimationFrame(() => {
    const messageChannel = new MessageChannel();

    messageChannel.port1.onmessage = callback;
    messageChannel.port2.postMessage(undefined);
  });
}
