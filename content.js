// Constants
const TARGET_ELEMENT_ID = "video-context";
const HIDDEN_CLASS = "score-hidden";

function hideScoreElement() {
  const scoreElement = document.getElementById(TARGET_ELEMENT_ID);
  if (scoreElement) {
    scoreElement.classList.add(HIDDEN_CLASS);
  }
}

function injectCSS() {
  const style = document.createElement("style");
  style.textContent = `
      .${HIDDEN_CLASS} {
          display: none !important;
      }
  `;
  document.head.appendChild(style);
}

function setupObserver() {
  // Set up a MutationObserver to watch for the element being added to the page
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      hideScoreElement();
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

injectCSS();
hideScoreElement();
setupObserver();
