var gameWidth=10;
var gameHeight=10;
var liveCells= [];
$.getJSON('http://rigby909.github.io/theGameOfLife/live.json', function(data){ //получение данных из файла
	liveCells = data;
	$(function(){
		for (var x = 1; x <= gameWidth; x++) { //рисуем поле
			for (var y = 1; y <= gameHeight; y++) {
				$('<div></div>')
					.addClass('field').addClass('dead')
					.attr('id','field-'+x.toString()+'-' + y.toString())
					.data('x',x).data('y',y)
					.appendTo('#game')
			}
		}
		$.each(liveCells, function() { //рисуем живые клетки
			$('#field-'+this[0]+'-'+this[1]).addClass('alive').removeClass('dead');
		});
		function neigbourCount(x, y) { //ищем число живых клеток-соседей
			var aliveCellsCount = 0;
			var directions = [{x:-1, y:-1}, {x:-1, y:0}, {x:-1, y:1}, {x:0, y:-1}, {x:0, y:1}, {x:1, y:-1}, {x:1, y:0}, {x:1, y:1}];
			for (var i=0; i<directions.length; i++) {
				if ($('#field-'+(x+directions[i].x)+'-'+(y+directions[i].y)).hasClass('alive')) {
					aliveCellsCount++;
				}
			}
			return aliveCellsCount;
		}
		function nextGeneration() { //формируем следующее поколение клеток
			var nextGenerationArray = [];
			$('.field').each(function() {
				var x = $(this).data('x');
				var y = $(this).data('y');
				var count = neigbourCount(x,y); //число соседей из функции
				var arrElement = [];
				if ($(this).hasClass('dead') && count==3){
					arrElement.push(x, y, "alive"); //записывает свойства каждой клетки при выполнении условия
					nextGenerationArray.push(arrElement); //массив клеток
				} else if ($(this).hasClass('alive') && count!=3 && count!=2) {
					arrElement.push(x, y, "dead");
					nextGenerationArray.push(arrElement);
				}
			});
			$.each(nextGenerationArray, function() { //рисуем новые живые клетки
				$('#field-' + this[0] + '-' + this[1]).attr('class', 'field ' + this[2]);
			});
			if (nextGenerationArray.length==0) { //конец игры
				alert("Игра окончена!");
			}
		}
		$('#next').on('click', nextGeneration); //событие кнопки
	});
});