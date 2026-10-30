const HOW_TO_STORAGE_KEY = 'mw4:how-to-use-accordion';

/** Keep homepage “How to Use MW4” accordion open/closed across reloads. */
export function initHowToAccordionPersistence() {
  const root = document.querySelector<HTMLElement>('[data-how-to-accordion]');
  const trigger = document.getElementById('product-how-to-use-trigger');
  if (!root || !trigger) return;

  const applySaved = () => {
    try {
      const saved = localStorage.getItem(HOW_TO_STORAGE_KEY);
      if (saved === 'open' && trigger.getAttribute('data-state') !== 'open') {
        trigger.click();
      }
    } catch {
      /* ignore private mode */
    }
  };

  applySaved();
  window.setTimeout(applySaved, 0);
  window.setTimeout(applySaved, 120);

  trigger.addEventListener('click', () => {
    window.setTimeout(() => {
      try {
        const isOpen = trigger.getAttribute('data-state') === 'open';
        localStorage.setItem(HOW_TO_STORAGE_KEY, isOpen ? 'open' : 'closed');
      } catch {
        /* ignore */
      }
    }, 0);
  });
}
