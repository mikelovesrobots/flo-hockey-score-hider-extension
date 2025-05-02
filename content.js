// Constants
const HIDDEN_CLASS = "score-hidden";

function hideScoreIframe() {
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    if (iframe.src.includes("hockeytech.com")) {
      iframe.classList.add(HIDDEN_CLASS);
    }
  });
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
  const observer = new MutationObserver(() => {
    hideScoreIframe();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

injectCSS();
hideScoreIframe();
setupObserver();
