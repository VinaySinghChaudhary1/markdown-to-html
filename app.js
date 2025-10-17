document.addEventListener('DOMContentLoaded', function() {
    const renderedTab = document.getElementById('rendered-tab');
    const sourceTab = document.getElementById('source-tab');
    const markdownOutput = document.getElementById('markdown-output');
    const markdownSource = document.getElementById('markdown-source');
    const wordCount = document.getElementById('markdown-word-count');

    function updateWordCount(text) {
        const words = text.trim().split(/\s+/).filter(Boolean);
        wordCount.textContent = `Words: ${new Intl.NumberFormat().format(words.length)}`;
    }

    function loadMarkdown(url) {
        fetch(url)
            .then(response => response.text())
            .then(text => {
                markdownSource.value = text;
                updateWordCount(text);
                markdownOutput.innerHTML = marked(text);
            });
    }

    function toggleView(showRendered) {
        if (showRendered) {
            markdownOutput.style.display = 'block';
            markdownSource.style.display = 'none';
        } else {
            markdownOutput.style.display = 'none';
            markdownSource.style.display = 'block';
        }
    }

    renderedTab.addEventListener('click', () => toggleView(true));
    sourceTab.addEventListener('click', () => toggleView(false));

    markdownSource.addEventListener('input', function() {
        const text = markdownSource.value;
        updateWordCount(text);
        markdownOutput.innerHTML = marked(text);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const markdownUrl = urlParams.get('url');
    if (markdownUrl) {
        loadMarkdown(markdownUrl);
    }

    toggleView(true);
});