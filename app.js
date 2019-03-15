class Gamer {
	constructor(name) {
		this.name = name;
		this.currentScore;
		this.totalScore = 0;
		this.isBusted = false;
	}
}

const app = new Vue({
	el: "#app",
	data: {
		lowestScore: 0,
		gamers: [],
		newMemberName: "",
	},
	methods: {
		addMember: function(event) {
			if (this.newMemberName === "") {
				return;
			}
			this.gamers.push(new Gamer(this.newMemberName));
			this.newMemberName = "";
		},
		computeScores: function() {
			const activePlayers = this.gamers.filter(gamer => !gamer.isBusted);
			let scores = activePlayers.map(gamer => gamer.currentScore);
			this.lowestScore = Math.min(...scores);
			this.gamers.forEach((gamer, index) => {
				if (!gamer.isBusted) {
					gamer.totalScore = gamer.totalScore + parseInt(gamer.currentScore) - this.lowestScore;
					gamer.currentScore = 0;
					if (gamer.totalScore > 100) {
						gamer.isBusted = true;
					}
				}
			});
		},
		resetGame: function() {
			this.gamers = [];
			this.bustedPlayers.clear();
		},
	}
});