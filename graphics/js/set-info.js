function FixSize(selector){
	setTimeout(function(){
		var divWidth = $(selector + ":visible").width();
		var fontSize = 92;

		// Reset font to default size to start.
		$(selector).css("font-size", "");

		var text_org = $(selector + ":visible").html();
		var text_update = '<span style="white-space:nowrap;">' + text_org + '</span>';
		$(selector + ":visible").html(text_update);


		var childWidth = $(selector + ":visible").children().width();

		// console.log(childWidth + " " + divWidth);

		while ($(selector + ":visible").children().width() > divWidth){
			// console.log($(selector + ":visible").children().width() + " " + divWidth);
			$(selector).css("font-size", fontSize -= 1);
		}
		// console.log(fontSize)
	}, 500);
}

$(() => {
	loadSmashControl();

	function loadSmashControl(){
		const bundle = 'nodecg-smashcontrol';
		var bracket = $('.bracket-location');
		var player1tag = $('.player1-tag');
		var p1score = $('.player1-score');
		var player2tag = $('.player2-tag');
		var p2score = $('.player2-score');


		var player1score = nodecg.Replicant("player1Score", bundle);
		var player2score = nodecg.Replicant("player2Score", bundle);
		NodeCG.waitForReplicants(player1score, player2score).then(() => {
			player1score.on('change', (newVal) => {
				if (newVal){
					p1score.html(player1score.value);
				}
			});
			player2score.on('change', (newVal) => {
				if (newVal){
					p2score.html(player2score.value);
				}
			})
		});


		var setInfo = nodecg.Replicant("playerDataArray", bundle);
		setInfo.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});

		function updateFields(setData){
			bracket.html(setData.bracketlocation);
			console.log(bracket.attr("class"));
			FixSize('.bracket-location');
			player1tag.html(setData.player1tag);
			FixSize('.player1-tag');
			player2tag.html(setData.player2tag);
			FixSize('.player2-tag');

		}
	}
});
