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
		bustedPlayers: new Set()
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
			let scores = this.gamers.map(gamer => gamer.currentScore);
			this.lowestScore = Math.min(...scores);
			this.gamers.forEach((gamer, index) => {
				if (!this.bustedPlayers.has(gamer.name)) {
					gamer.totalScore = gamer.totalScore + parseInt(gamer.currentScore) - this.lowestScore;
					gamer.currentScore = 0;
					if (gamer.totalScore > 100) {
						gamer.isBusted = true;
						this.bustedPlayers.add(gamer.name);
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