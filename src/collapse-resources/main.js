/* FIXME: need some way to defer this until the relevant markup has loaded (MutationObserver?) */
/* TODO: add event listeners for keyboard users as well */
/* TODO: once dynamic value replacement is implemented make this list customizeable? */
const collapse = [
  /\s+[Pp]ins?/, /\s+(Character|Weapon) Material/, /^Waypoints$/, /^Landmarks$/, /^Enemies$/,
  /^Local Specialties$/, /^Fishing$/, /^Inventory\/Materials$/, /^Animals$/, /^Ores$/, /^Wood$/,
  /* custom-created categories (from move items) */
  /^Resources$/, /^Guide$/,
];
document.querySelectorAll('.filter-panel__labels-item')
  .forEach(section => {
    const title = section.querySelector('.filter-panel__labels-title');
    /* bind the event listener to toggle display value */
    title.onclick = (e => {
      /* check whether clicking on a pin or material action and stop if so */
      if ([...e.target.classList].includes('filter-panel__labels-title-action')) return;
      if ([...e.target.parentNode.classList].includes('filter-panel__labels-title-action--text')) return;
      /* otherwise toggle section */
      const content = section.querySelector('.filter-panel__labels-content');
      const show = getComputedStyle(content).display === 'none';
      if (show) {
        content.style.display = null;
        delete section.dataset.collapsed;
      } else {
        content.style.display = 'none';
        section.dataset.collapsed = true;
      }
    });
    /* if need be, click on it to toggle */
    const empty = [...section.querySelector('.filter-panel__labels-content').children]
      .every(item => item.style.display === 'none');
    const preset = collapse.some(re => re.test(title.textContent));
    const shouldClose = empty || preset;
    if ((shouldClose && !section.dataset.collapsed) || (!shouldClose && section.dataset.collapsed)) {
      title.click();
    }
  });