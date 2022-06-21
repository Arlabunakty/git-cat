// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import MutationObserver from '@sheerun/mutationobserver-shim'

window.MutationObserver = MutationObserver

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
});

afterEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
});