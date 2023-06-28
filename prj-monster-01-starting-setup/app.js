function getRandomValue(min, max) {
    return Math.floor(Math.random() *(max - min)) + min;
}
const app = Vue.createApp({
    data () {
        return {
            playerHealt: 100,
            monsterHealt: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealt < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealt + '%'}
        },
        playerBarStyle() {
            if (this.playerHealt < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealt + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealt(value) {
            if (value <= 0 && this.monsterHealt <= 0) {
                this.winner= 'draw';
            } else if ( value <= 0) {
                this.winner= 'monster';
            }
        },
        monsterHealt(value) {
            if (value <= 0 && this.playerHealt <= 0) {
                this.winner= 'draw';
            } else if ( value <= 0) {
                this.winner= 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealt -= attackValue;
            this.addLogMessage('player', 'attack', attackValue)
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealt -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealt -= attackValue;
            this.addLogMessage('player', 'special-attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if(this.playerHealt + healValue > 100) {
                this.playerHealt = 100;
            } else {
                this.playerHealt += healValue;
            }
            this.addLogMessage('player', 'heal', healValue)
            this.attackPlayer();
        },
        startGame() {
            this.playerHealt = 100;
            this.monsterHealt = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });

        }
    }
});

app.mount('#game');