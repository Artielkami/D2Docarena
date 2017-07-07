function getRunes(){
	var selection = [];
	// get common runes checked 
	$('.common-runes input:checked').each(function(){
		selection.push($(this).attr('value'))
	});
	// get middle runes checked
	$('.middle-runes input:checked').each(function(){
		selection.push($(this).attr('value'))
	});
	// get hight runes checked
	$('.hight-runes input:checked').each(function(){
		selection.push($(this).attr('value'))
	});
	// alert(selection);
}
function checkAll(className){
	var box = $(className).find(':checkbox');
	if(!$(box).is(':checked') || box.length < 11){
		box.prop('checked', true);
	}
	else {
		box.prop('checked', false);
	}
}
function makeType2HTML(type){
	var t = makeTypeItem4RW(type);
	var content = "<div>"; // init value for result
	if(!t[0]){
		for (var i = type.length - 1; i >= 0; i--) {
				content += type[i] + "<br>";
			}
	}
	else{
		content += t[1];
	}
	content += "</div>";
	return content;
}
function makeTypeItem4RW(type){
	if(type.length > 1){
		for (var i = type.length - 1; i >= 0; i--) {
			if(type[i] == "Weapons"){
				type.splice(i, 1);
				if(type.length == 1){
					return [true,type];
				}
				return [false,type];
			}
		}
		return [false,type];
	}
	return [true,type];
}
function makeListRunes(runes){
		var content = "<div class='rw-runes-left'>"; // init value for result
		for (var i = 0; i < runes.length; i++) {
			content += "<img src='./runes/invr" + runes[i] + ".jpg'>";
			content += runes[i] + "<br>";
		}
		content += "</div>";
		return content;
}
function getListRunewordsByJson(){
	//console.log(rw_data)
	$.getJSON('data.json', function(data){
		$.each(data, function(index, rw) {
			 /* iterate through array or object */
			var nTr = $("<tr class='rw-lst'>");
			var ver = "";
			var ladder = "";
			if(rw["ladder_only"]){
				ladder += " ladder";
			}
			if(rw["ver"] != "LoD"){
				ver += "<span class='span-red-bold'>Arena</span>";
			} else {
				ver += "<span class='bold'>LoD</span>"+ladder;
			}
			var nTd = $("<td>").html("<div>"+"<span class='span-bold'>"+
				rw["name"]+"<br>Level "+rw["lvl"]+"</span><br>"+ver+"</div>");
			nTr.append(nTd);
			nTd = $("<td>").html(makeListRunes(rw["runes"]));
			nTr.append(nTd);
			nTd = $("<td>").html(makeType2HTML(rw["item"]));
			nTr.append(nTd);
			nTd = $("<td>").html("<div class='rw-ct-center'><span>"+
				rw["content"]+"</span>");
			nTr.append(nTd);
			nTr.appendTo('#rw-table');
		});
	});
}
