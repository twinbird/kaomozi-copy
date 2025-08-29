document.addEventListener('DOMContentLoaded', () => {
    const kaomojiTable = document.getElementById('kaomojiTable');
    const tableBody = kaomojiTable.getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');
    const searchInput = document.getElementById('searchInput');

    // 検索機能
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        const tableRows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < tableRows.length; i++) {
            const row = tableRows[i];
            const name = row.getElementsByTagName('td')[1];
            if (name) {
                const txtValue = name.textContent || name.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            } else {
                if (filter) {
                    row.style.display = 'none';
                } else {
                    row.style.display = '';
                }
            }
        }
    });

    // コピー機能
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('copy-btn')) {
            const kaomoji = event.target.innerText;
            navigator.clipboard.writeText(kaomoji).then(() => {
                const originalText = event.target.innerText;
                event.target.innerText = 'Copied!';
                setTimeout(() => {
                    event.target.innerText = originalText;
                }, 1000);
            }).catch(err => {
                console.error('Copy failed', err);
            });
        }
    });
});
