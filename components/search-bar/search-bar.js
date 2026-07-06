document.addEventListener('DOMContentLoaded', () => {
  // Search form interaction (visual feedback)
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.closest('.search-field').style.backgroundColor = 'rgba(0,0,0,0.03)';
    });
    input.addEventListener('blur', () => {
      input.closest('.search-field').style.backgroundColor = 'transparent';
    });
  });
});
