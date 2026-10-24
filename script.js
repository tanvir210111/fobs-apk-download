document.addEventListener('DOMContentLoaded', () => {
  const downloadBtn = document.getElementById('downloadBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');
  const toast = document.getElementById('toast');
  const toastClose = document.getElementById('toastClose');
  const currentYearSpan = document.getElementById('currentYear');
  const apkFileName = 'FOBS Tv.apk';

  // Set current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Handle Download Click
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      // Show loading feedback on button
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnText) btnText.textContent = 'Starting Download...';

      // Show toast notification
      showToast();

      // Reset button text after 2.5 seconds
      setTimeout(() => {
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnText) btnText.textContent = 'Downloading Started! ✓';

        setTimeout(() => {
          if (btnText) btnText.textContent = 'Download Again';
        }, 3000);
      }, 1000);
    });
  }

  // Toast controls
  let toastTimer = null;
  function showToast() {
    if (!toast) return;
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
