// Constants
const HIDDEN_CLASS = "score-hidden";
const PLACEHOLDER_CLASS = "score-placeholder";

function createPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = PLACEHOLDER_CLASS;
  placeholder.innerHTML = `
    <div style="
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin: 10px 0;
      text-align: center;
      color: #6c757d;
    ">
      <p style="margin: 0 0 10px 0; font-weight: bold;">FloHockey Score Hider Extension</p>
      <p style="margin: 0; font-size: 0.9em;">Content removed to prevent spoilers</p>
    </div>
  `;
  return placeholder;
}

function hideScoreIframe() {
  const iframes = document.querySelectorAll("iframe");
  iframes.forEach((iframe) => {
    if (iframe.src.includes("hockeytech.com")) {
      const existingPlaceholder = iframe.previousElementSibling;
      if (
        existingPlaceholder &&
        existingPlaceholder.classList.contains(PLACEHOLDER_CLASS)
      ) {
        return;
      }

      const placeholder = createPlaceholder();
      iframe.parentNode.insertBefore(placeholder, iframe);
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
        .${PLACEHOLDER_CLASS} {
            transition: opacity 0.3s ease;
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
