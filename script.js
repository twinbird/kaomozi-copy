document.addEventListener('DOMContentLoaded', () => {
    const kaomojiTable = document.getElementById('kaomojiTable');
    const tableBody = kaomojiTable.getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');

    // Kaomoji to button and remove copy button column
    for (let i = 0; i < rows.length; i++) {
        const kaomojiCell = rows[i].getElementsByTagName('td')[0];
        const buttonCell = rows[i].getElementsByTagName('td')[2];

        if (kaomojiCell) {
            const kaomojiText = kaomojiCell.innerText;
            kaomojiCell.innerHTML = ''; // Clear the cell
            const button = document.createElement('button');
            button.textContent = kaomojiText;
            button.classList.add('kaomoji-btn');
            kaomojiCell.appendChild(button);
        }

        if (buttonCell) {
            rows[i].removeChild(buttonCell);
        }
    }

    const searchInput = document.getElementById('searchInput');

    // 検索機能
    searchInput.addEventListener('keyup', () => {
        const filter = searchInput.value.toLowerCase();
        const tableRows = tableBody.getElementsByTagName('tr');

        for (let i = 0; i < tableRows.length; i++) {
            const name = tableRows[i].getElementsByTagName('td')[1];
            if (name) {
                const txtValue = name.textContent || name.innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    tableRows[i].style.display = '';
                } else {
                    tableRows[i].style.display = 'none';
                }
            }
        }
    });

    // コピー機能
    tableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('kaomoji-btn')) {
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
