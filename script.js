document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  const toastFileName = document.getElementById('toastFileName');
  const currentYearSpan = document.getElementById('currentYear');
  const defaultApkFileName = 'FOBS-TV v3.1.1.apk';

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Handle Main Hero Download Click
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      // Show loading feedback on button
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnText) btnText.textContent = 'Starting Download...';

      // Show toast notification
      showToast(defaultApkFileName);

      // Reset button text after timeout
      setTimeout(() => {
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnText) btnText.textContent = 'Downloading Started! ✓';

        setTimeout(() => {
          if (btnText) btnText.textContent = 'Download Again';
        }, 3000);
      }, 1000);
    });
  }

  // Handle Version Archive Download Clicks
  const versionBtns = document.querySelectorAll('.version-dl-btn');
  versionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const fileName = btn.getAttribute('data-apk') || defaultApkFileName;
      showToast(fileName);
    });
  });

  // Toast controls
  let toastTimer = null;
  function showToast(fileName = defaultApkFileName) {
    if (!toast) return;
    if (toastFileName) {
      toastFileName.textContent = fileName;
    }
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 6000);
  }

  if (toastClose) {
    toastClose.addEventListener('click', () => {
      toast.classList.remove('show');
      clearTimeout(toastTimer);
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Close others
        faqItems.forEach((other) => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Optional: Auto download if URL contains #download or ?download=auto
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('download') === 'auto' || window.location.hash === '#auto-download') {
    setTimeout(() => {
      if (downloadBtn) {
        downloadBtn.click();
      }
    }, 800);
  }
});
