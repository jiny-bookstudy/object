export const getQuerySelector = (selector) => document.querySelector(selector);
export const getQuerySelectorAll = (selector) => document.querySelectorAll(selector);
export const createElement = (element) => document.createElement(element);
export const createFragment = () => document.createDocumentFragment();
export const clearElement = (element) => element.replaceChildren();
export const findElementByTag = (parent, tagName) => parent.getElementsByTagName(tagName);
