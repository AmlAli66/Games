// --- UI Class ---
export class UI {
    displayGames(data) {
        const grid = document.getElementById('gameGrid');
        let html = '';
        data.forEach(game => {
            html += `
                    <div class="col-xl-3 col-lg-4 col-md-6">
                        <div class="game-card" data-id="${game.id}">
                            <div class="card-img-wrapper">
                                <img src="${game.thumbnail}" class="w-100" alt="${game.title}">
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h5 class="game-title mb-0">${game.title}</h5>
                                    <span class="price-tag">FREE</span>
                                </div>
                                <p class="game-desc">${game.short_description}</p>
                                <div class="mt-3 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between">
                                    <span class="badge-custom">${game.genre}</span>
                                    <span class="badge-custom">${game.platform}</span>
                                </div>
                            </div>
                        </div>
                    </div>`;
        });
        grid.innerHTML = html;
        this.attachListeners();
    }

    displayDetails(game) {
        const container = document.getElementById('detailsContent');
        container.innerHTML = `
                    <div class="col-lg-5">
                        <img src="${game.thumbnail}" class="w-100 detail-img mb-4" alt="">
                    </div>
                    <div class="col-lg-7">
                        <h1 class="display-4 mb-2">${game.title}</h1>
                        <div class="d-flex gap-2 mb-4">
                            <span class="badge-custom">${game.genre}</span>
                            <span class="badge-custom">${game.platform}</span>
                            <span class="badge-custom text-info">${game.status}</span>
                        </div>
                        <p class="lead text-muted mb-5" style="font-size: 1.1rem; line-height: 1.8;">
                            ${game.description}
                        </p>
                        <a href="${game.game_url}" target="_blank" class="btn btn-action">PLAY FOR FREE</a>
                    </div>
                `;
    }

    attachListeners() {
        document.querySelectorAll('.game-card').forEach(card => {
            card.onclick = () => window.app.loadDetails(card.dataset.id);
        });
    }
}
