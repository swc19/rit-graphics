var thumbFileName;
function FixSize(selector){
	selector = `.${selector.split(" ").at(2)}`;
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
function takeScreen(){
	domtoimage.toPng(document.getElementById('top8'))
    .then(function (dataUrl) {
        let link = document.createElement('a');
        link.download = thumbFileName;
        link.href = dataUrl;
        link.click();
    });
}
$(() => {
	loadSmashControl();

	function loadSmashControl(){
		const bundle = 'nodecg-smashcontrol';
		var tourneyname = $('.tourney-name');
		var tourneynumber = $('.tourney-number');
		var tourneydate = $('.tourney-date');
		var tourneyentrants = $('.tourney-entrants');
		var offweek = $('.off-week');
		var player1name = $('.player1-tag');
		var player1char = $('.player1-render');
		var player1secondary = $('.player1-secondary');
		var player2name = $('.player2-tag');
		var player2char = $('.player2-render');
		var player2secondary = $('.player2-secondary');
		var player3name = $('.player3-tag');
		var player3char = $('.player3-render');
		var player3secondary = $('.player3-secondary');
		var player4name = $('.player4-tag');
		var player4char = $('.player4-render');
		var player4secondary = $('.player4-secondary');
		var player5aname = $('.player5a-tag');
		var player5achar = $('.player5a-render');
		var player5asecondary = $('.player5a-secondary');
		var player5bname = $('.player5b-tag');
		var player5bchar = $('.player5b-render');
		var player5bsecondary = $('.player5b-secondary');
		var player7aname = $('.player7a-tag');
		var player7achar = $('.player7a-render');
		var player7asecondary = $('.player7a-secondary');
		var player7bname = $('.player7b-tag');
		var player7bchar = $('.player7b-render');
		var player7bsecondary = $('.player7b-secondary');
		var top8Info = nodecg.Replicant("top8Array", bundle);
		top8Info.on('change', (newVal, oldVal) => {
			if (newVal)
				updateFields(newVal);
		});

		function updateFields(top8Data){
			var tag_array = [[player1name, 1], [player2name, 2], [player3name, 3], [player4name, 4], 
								[player5aname, '5a'], [player5bname, '5b'], [player7aname, '7a'], [player7bname, '7b']];
			var char_array = [[player1char, '1main', '1costume'], [player2char, '2main', '2costume'], [player3char, '3main', '3costume'], [player4char, '4main', '4costume'], 
								[player5achar, '5amain', '5acostume'], [player5bchar, '5bmain', '5bcostume'], [player7achar, '7amain', '7acostume'], [player7bchar, '7bmain', '7bcostume']];
			var secondary_array = [[player1secondary, '1secondary'], [player2secondary, '2secondary'], [player3secondary, '3secondary'], [player4secondary, '4secondary'], 
									[player5asecondary, '5asecondary'], [player5bsecondary, '5bsecondary'], [player7asecondary, '7asecondary'], [player7bsecondary, '7bsecondary']];
			thumbFileName = top8Data.tourneyname + "_top8.png";
			tourneyname.text(top8Data.tourneyname.match(/([A-Z a-z]+)/)[0]);
			tourneydate.text(top8Data.tourneydate);
			tourneyentrants.text(`${top8Data.tourneyentrants} entrants`);
			tourneynumber.text(top8Data.tourneyname.match(/\d+/)[0]);
			if(top8Data.tourneyname.toLowerCase().includes("off-week")){
				offweek.text("Off-Week");
			} else {
				offweek.text('');
			}
			tag_array.forEach((tag) => {
				tag[0].text(top8Data[`${tag[1]}tag`]);
				FixSize(`${tag[0].attr('class')}`)
			});
			var linkToRender = `../../nodecg-smashcontrol/dashboard/images/${top8Data.game}/renders`;
			char_array.forEach((char) => {
				char[0].children().attr("src", (`${linkToRender}/${top8Data[char[1]].split("[REMIX] ").at(-1)}/${top8Data[char[2]]}.png`));
			});
			var linkToIcon = `../../nodecg-smashcontrol/dashboard/images/${top8Data.game}`
			secondary_array.forEach((char) => {
					if(top8Data[char[1]] !== null && top8Data[char[1]] !== '' ){
						char[0].children().attr("src", (`${linkToIcon}/${top8Data[char[1]].split("[REMIX] ").at(-1)}.png`));
					}
					else {
						char[0].remove();
					}
				}
			)
		}
	}
})