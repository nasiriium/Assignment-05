document.addEventListener('DOMContentLoaded', () => {
    const heartCountEl = document.getElementById('heart-count');
    const coinCountEl = document.getElementById('coin-count');
    const copyCountEl = document.getElementById('copy-count');
    const hotlineCardsContainer = document.getElementById('hotline-cards');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    let coins = 100;
    let hearts = 0;
    let copies = 0;

    // Data for the cards with both Bangla and English names
    const hotlineData = [
        { name: 'National Emergency', englishName: 'National Emergency', number: '999', category: 'General' },
        { name: 'Police', englishName: 'Police', number: '999', category: 'General' },
        { name: 'Fire Service', englishName: 'Fire Service', number: '999', category: 'Fire' },
        { name: 'Ambulance', englishName: 'Ambulance', number: '999', category: 'Health' },
        { name: 'Women & Child Helpline', englishName: 'Women & Child Helpline', number: '109', category: 'Support' },
        { name: 'Anti-Corruption', englishName: 'Anti-Corruption', number: '106', category: 'Government' },
        { name: 'Bangladesh Railway', englishName: 'Bangladesh Railway', number: '163', category: 'Transport' },
        { name: 'Electricity Outage', englishName: 'Electricity Outage', number: '16216', category: 'Electricity' },
        { name: 'Brac', englishName: 'Brac', number: '16445', category: 'NGO' }
    ];

    // Function to get the correct icon path based on the service name
    function getIconPath(serviceName) {
        switch (serviceName) {
            case 'Police':
                return './assets/police.png';
            case 'Fire Service':
                return './assets/fire-service.png';
            case 'Ambulance':
                return './assets/ambulance.png';
            case 'National Emergency':
                return './assets/emergency.png';
            case 'Bangladesh Railway':
                return './assets/Bangladesh-Railway.png';
            case 'Brac':
                return './assets/brac.png';
            default:
                // Use a general emergency icon for other services
                return './assets/emergency.png';
        }
    }

    // Function to render cards
    function renderCards() {
        hotlineCardsContainer.innerHTML = '';
        hotlineData.forEach(service => {
            const card = document.createElement('div');
            card.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'relative');
            
            let categoryClass;
            switch(service.category) {
                case 'General':
                    categoryClass = 'badge-primary';
                    break;
                case 'Fire':
                    categoryClass = 'badge-error';
                    break;
                case 'Health':
                    categoryClass = 'badge-success';
                    break;
                default:
                    categoryClass = 'badge-info';
                    break;
            }

            const iconPath = getIconPath(service.englishName);

            card.innerHTML = `
                <div class="flex justify-end items-start mb-2">
                    <span class="material-icons text-gray-300 text-3xl cursor-pointer heart-icon" data-service-name="${service.name}" data-favorited="false">favorite_border</span>
                </div>
                <div class="flex flex-col items-center text-center">
                    <img src="${iconPath}" alt="${service.name} Icon" class="h-16 w-16 mb-2">
                    <h3 class="text-xl font-semibold text-gray-800">${service.name}</h3>
                    <p class="text-gray-600 mb-2">${service.englishName}</p>
                    <p class="text-2xl font-bold text-gray-800 mb-2">${service.number}</p>
                    <div class="badge ${categoryClass} mb-4">${service.category}</div>
                    <div class="flex space-x-2">
                        <button class="btn btn-sm text-gray-700 flex items-center copy-btn" style="background-color: #F2F2F2;">
                            <span class="material-icons text-sm">content_copy</span> Copy
                        </button>
                        <button class="btn btn-sm btn-success text-white flex items-center call-btn" data-hotline="${service.number}" data-service-name="${service.englishName}">
                            <span class="material-icons text-sm">call</span> Call
                        </button>
                    </div>
                </div>
            `;
            hotlineCardsContainer.appendChild(card);
        });
    }

    // Function to add a service to history 
    function addHistoryItem(name, number) {
        const now = new Date();
        const timeString = now.toLocaleTimeString();

        const historyItem = document.createElement('li');
        historyItem.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'bg-gray-50', 'rounded-md', 'shadow-sm');
        historyItem.innerHTML = `
            <div>
                <span class="font-semibold text-gray-800">${name}</span>
                <span class="text-gray-800 ml-2">${number}</span>
            </div>
            <span class="text-sm text-gray-400">${timeString}</span>
        `;
        historyList.prepend(historyItem);
    }

    // Event listener for all cards (using event delegation)
    hotlineCardsContainer.addEventListener('click', (event) => {
        const target = event.target;

        // Handle Heart Icon Click
        if (target.classList.contains('heart-icon')) {
            const isFavorited = target.dataset.favorited === 'true';
            if (isFavorited) {
                target.textContent = 'favorite_border';
                target.dataset.favorited = 'false';
                hearts = Math.max(0, hearts - 1);
            } else {
                target.textContent = 'favorite';
                target.dataset.favorited = 'true';
                hearts++;
            }
            heartCountEl.textContent = hearts;
        }

        // Handle Call Button Click
        if (target.closest('.call-btn')) {
            const callBtn = target.closest('.call-btn');
            const serviceName = callBtn.dataset.serviceName;
            const hotline = callBtn.dataset.hotline;

            if (coins < 20) {
                alert("You don't have enough coins to make this call.");
                return;
            }

            coins -= 20;
            coinCountEl.textContent = coins;
            alert(`Calling ${serviceName}, number: ${hotline}`);
            addHistoryItem(serviceName, hotline);
        }

        // Handle Copy Button Click
        if (target.closest('.copy-btn')) {
            const copyBtn = target.closest('.copy-btn');
            const hotline = copyBtn.dataset.hotline;
            navigator.clipboard.writeText(hotline).then(() => {
                alert(`Copied number: ${hotline}`);
                copies++;
                copyCountEl.textContent = copies;
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    });

    // Handle Clear History Button
    clearHistoryBtn.addEventListener('click', () => {
        historyList.innerHTML = '';
        alert("Call history cleared.");
    });

    // Initial render of cards
    renderCards();
});