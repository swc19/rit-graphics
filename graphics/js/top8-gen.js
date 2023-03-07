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
	html2canvas($('.top8').get(0), {width:1920, height:1080}).then(function(canvas) {
		var link = document.createElement('a');
		if (typeof link.download === 'string'){
			link.href = canvas.toDataURL();
			link.download = thumbFileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(canvas.toDataURL());
		}
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
		var player2name = $('.player2-tag');
		var player2char = $('.player2-render');
		var player3name = $('.player3-tag');
		var player3char = $('.player3-render');
		var player4name = $('.player4-tag');
		var player4char = $('.player4-render');
		var player5aname = $('.player5a-tag');
		var player5achar = $('.player5a-render');
		var player5bname = $('.player5b-tag');
		var player5bchar = $('.player5b-render');
		var player7aname = $('.player7a-tag');
		var player7achar = $('.player7a-render');
		var player7bname = $('.player7b-tag');
		var player7bchar = $('.player7b-render');
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
		}
	}
})