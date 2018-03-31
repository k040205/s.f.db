$(document).ready(function() {
	$.ajax('../json/doll.json', {
		contentType:'application/json',
		dataType:'json',
		success:function(result) {
			itemcon = '<div class="w3-hover-shadow tdoll item-content">';
			var allCharacters = $.map(result, function(doll, index) {
			character = $('<div class="item" data-time="'+doll.buildTime+'" data-type="'+doll.type+'" data-rarity="'+doll.rank+'"></div>');
			dollcon = '<div class="w3-text-white	no">'+doll.id+'</div><p class="w3-text-black name podo f125">'+doll.krName+'</p><i	class="star	r'+doll.rank+'"></i><i	class="incage doll info_cage_'+doll.rank+'"></i><i	class="type	doll '+doll.type+'_'+doll.rank+'"></i><img	src="../img/t_doll/'+doll.id+'_i.png"	alt="icon"><div class="tag">'+doll.nick+'/'+doll.buildTime+'</div>';
			$(character).append(itemcon).find(".item-content").html(dollcon);
			return character;
		});
		$('.grid').append(allCharacters);
		},
		error:function(request, errorType, errorMessage) {
			alert('Error:' + errorType + ' With message:' + errorMessage);
		},	
		timeout:3000
	});
}).ajaxStop(function(){loadComplete();});
function sortrarity(){grid.sort('rarity')};
function sorttime(){grid.sort('time')};
function sorttype(){grid.sort('type')};
$("select").change(function(){
	$("select:focus option:selected").each(function(){
		var query = $(this).text()
		switch (query) {
		case "기본":
			new Muuri('.grid',{sordData:null});
		break;
		case "등급":
			sortrarity();
		break;
		case "제조시간":
			sorttime();
		break;
		case "종류":
			sorttype();
		break;
		};
	});
});
function loadComplete(){
	grid = new Muuri('.grid',{
		sortData:{
			time:function (item, element) {
			return parseInt(element.getAttribute('data-time'));
			},
			type:function (item, element) {
			return element.getAttribute('data-type').toUpperCase();
			},
			rarity:function (item, element) {
			return parseInt(element.getAttribute('data-rarity'));
			}
		},
		layout:{
			fillGaps:true,
			rounding:true
		}
	});
	$('input#search').quicksearch('div.grid .item', {
		noResults:"#noResultMessage",
		'bind':'keyup keydown click input',
		'hide':function() {
			$(this).removeClass('muuri-item-shown').addClass('muuri-item-hidden').css("display","none");
			grid.filter('.muuri-item-shown');
		},
		'show':function() {
			$(this).addClass('muuri-item-shown').removeClass('muuri-item-hidden').css("display","block");
			grid.filter('.muuri-item-shown');
		}
	});
	$(".fc").click(function() {
		var query = $(this).text();
		switch (query){
		case "2성":
			grid.filter('[data-rarity="2"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "3성":
			grid.filter('[data-rarity="3"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "4성":
			grid.filter('[data-rarity="4"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "5성":
			grid.filter('[data-rarity="5"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "HG":
			grid.filter('[data-type="hg"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "AR":
			grid.filter('[data-type="ar"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "RF":
			grid.filter('[data-type="rf"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "MG":
			grid.filter('[data-type="mg"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "SG":
			grid.filter('[data-type="sg"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "제조불가":
			grid.filter('[data-time="9999"]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break;
		case "All":
			grid.filter('[data-type]');
			$('.fc').removeClass('active');
			$(this).addClass('active')
		break; 
		}
	});
};