// arcivos
var jQT = $.jQTouch({
    icon: 'icon.png',
    startupScreen: 'startup.png'
});

$(function(){
	function submitForm(){
    $el = $('#add form');
    if ($('#todo', $el).val().length > 1) {
    var itemid = $('#home ul li').length + 1;
    $('#home .incomplete').append($('<li><input type="checkbox" /> <span>' + $('#todo', $el).val() + '</span></li>'));
    }
    jQT.goBack();
    $el.get(0).reset();
    return false;
    }
    $('#add form').submit(submitForm);
    $('#add .whiteButton').click(submitForm);
    $('.complete li, .incomplete li').bind('swipe', function(){
    $(this).toggleClass('editingmode');
    });
    $('input[type="checkbox"]').live('change', function(){
    var $el = $(this);
    if ($el.attr('checked')) {
    $el.parent().prependTo('.complete');
	
	alert($(this).val());
	Tareas();
	
	} else {
    $el.parent().appendTo('.incomplete');
	
	alert($(this).val());
    
	}
    });
});

function Tareas(){
	document.addEventListener("deviceready", Escribir, false);
}

function Escribir() {
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, accesoFS, fail);
}

function accesoFS(fileSystem) {
	fileSystem.root.getFile("pendientes.txt", {create: true, exclusive: false}, accesoFile, fail);
}

function accesoFile(fileEntry) {
	fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
	writer.onwriteend = function(evt) {
		navigator.notification.alert('Archivo Escrito',null,'Escribir','Aceptar');
	};
	writer.write($(itemid).val());
}

function fail(error) {
	alert(error.code);
}