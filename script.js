document.addEventListener("DOMContentLoaded", function () {
    let balloonsPopped = 0;
    let matchesFound = 0;

    // 🎈 Balloon Popping Game
    function createBalloons() {
        const container = document.getElementById('balloon-container');
        container.innerHTML = ''; // Clear previous balloons
        balloonsPopped = 0;

        for (let i = 0; i < 10; i++) {
            let balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.background = `hsl(${Math.random() * 360}, 80%, 60%)`; // Random colors
            balloon.onclick = function () {
                this.style.visibility = 'hidden';
                balloonsPopped++;
                checkCompletion();
            };
            container.appendChild(balloon);
        }
    }

    // 🃏 Memory Matching Game
    let cardValues = ['🎂', '🎂', '🎈', '🎈', '🎁', '🎁', '🎉', '🎉'];
    let flippedCards = [];

    function createMemoryGame() {
        cardValues.sort(() => 0.5 - Math.random());
        const container = document.getElementById('memory-game');
        container.innerHTML = '';
        matchesFound = 0;

        cardValues.forEach((emoji, index) => {
            let card = document.createElement('div');
            card.className = 'card';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.innerHTML = '❓';
            card.onclick = function () { flipCard(this); };
            container.appendChild(card);
        });
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && card.innerHTML === '❓') {
            card.innerHTML = card.dataset.emoji;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
            matchesFound++;
            flippedCards = [];
            checkCompletion();
        } else {
            flippedCards.forEach(card => card.innerHTML = '❓');
            flippedCards = [];
        }
    }

    // ✅ Check if both games are completed
    function checkCompletion() {
        if (balloonsPopped === 10 && matchesFound === 4) {
            setTimeout(() => {
                window.location.href = "birthday.html"; // Redirect to birthday page
            }, 1000);
        }
    }

    // Initialize games
    createBalloons();
    createMemoryGame();
});
