
import { UI } from "./ui.js"
// --- Core Application Class ---
export class App {
    constructor() {
        this.ui = new UI();
        this.apiConfig = {
            headers: {
                'x-rapidapi-key': '5b6fba4569mshee7bebc9e0378a6p153daajsnb38713fc257d',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
        this.init();
    }

    async init() {
        await this.fetchGames('mmorpg');

        // Category filtering
        document.querySelectorAll('.nav-link').forEach(link => {
            link.onclick = async (e) => {
                document.querySelector('.nav-link.active').classList.remove('active');
                e.target.classList.add('active');
                await this.fetchGames(e.target.dataset.category);
            };
        });

        // Detail close
        document.getElementById('closeBtn').onclick = () => {
            document.getElementById('detailsSection').classList.add('d-none');
            document.getElementById('gamesSection').classList.remove('d-none');
            window.scrollTo(0, 0);
        };
    }

    async fetchGames(category) {
        this.toggleLoader(true);
        try {
            const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, this.apiConfig);
            const data = await res.json();
            this.ui.displayGames(data);
        } catch (err) {
            console.error(err);
        } finally {
            this.toggleLoader(false);
        }
    }

    async loadDetails(id) {
        this.toggleLoader(true);
        try {
            const res = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, this.apiConfig);
            const data = await res.json();
            this.ui.displayDetails(data);
            document.getElementById('gamesSection').classList.add('d-none');
            document.getElementById('detailsSection').classList.remove('d-none');
            window.scrollTo(0, 0);
        } catch (err) {
            console.error(err);
        } finally {
            this.toggleLoader(false);
        }
    }

    toggleLoader(show) {
        document.getElementById('loader').classList.toggle('d-none', !show);
    }
}
