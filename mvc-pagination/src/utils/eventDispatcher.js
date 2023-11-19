export const addEvent = ($target, eventType, event) => {
  $target.addEventListener(eventType, event);
};

export const removeEvent = ($target, eventType, event) => {
  $target.removeEventListener(eventType, event);
};
