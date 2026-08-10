const NAV_EVENT = 'chc:navigate';

function currentPath(): string {
  return window.location.pathname || '/';
}

const state = $state({ path: currentPath() });

function sync() {
  state.path = currentPath();
}

window.addEventListener('popstate', sync);
window.addEventListener(NAV_EVENT, sync);

export function navigate(to: string): void {
  if (window.location.pathname === to) return;
  window.history.pushState(null, '', to);
  window.dispatchEvent(new Event(NAV_EVENT));
}

/** Intercepts plain left-clicks so in-app links do not reload the page. */
export function linkClick(event: MouseEvent, to: string): void {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
  event.preventDefault();
  navigate(to);
}

export function route(): string {
  return state.path;
}
