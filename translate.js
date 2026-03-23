function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,es,hi,fr,zh-CN,vi,ar,ja,tl',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
        multilanguagePage: true
    }, 'google_translate_element');
}