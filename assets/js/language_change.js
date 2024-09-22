const translations = {
  en: null,
  zh: null
};

function loadLanguage(lang) {
  if (!translations[lang]) {
    $.getJSON(lang + '.json', function(data) {
      translations[lang] = data;
      updateContent(lang);
    });
  } else {
    updateContent(lang);
  }
}

function updateContent(lang) {
  $('#greeting').text(translations[lang].greeting);
  $('#about-us').text(translations[lang].about_us);
}

$('#language-switcher').on('change', function() {
  const selectedLang = $(this).val();
  loadLanguage(selectedLang);
});

// 默认语言为英文
loadLanguage('en');
