const btn = document.getElementById('loadBtn');
const loader = document.getElementById('loader');
const error = document.getElementById('error');
const cards = document.getElementById('cards');

btn.onclick = async () => {
    cards.innerHTML = '';
    error.style.display = 'none';
    loader.style.display = 'block';
    btn.disabled = true;

    try {
        const r = await fetch('https://kazakovstepan.github.io/pyramids/facts.json');
        if (!r.ok) throw new Error('Сервер не отвечает');
        const facts = await r.json();

        facts.forEach(f => {
            const card = document.createElement('div');
            card.className = 'card';

            const title = document.createElement('h3');
            title.textContent = f.title;

            const text = document.createElement('p');
            text.textContent = f.text;

            card.appendChild(title);
            card.appendChild(text);
            cards.appendChild(card);
        });

    } catch (err) {
        error.textContent = 'Ошибка: ' + err.message;
        error.style.display = 'block';
    } finally {
        loader.style.display = 'none';
        btn.disabled = false;
    }
};