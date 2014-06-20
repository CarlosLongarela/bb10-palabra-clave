var segundos=90;
var n_preguntas_ronda=4;
var n_rondas=5;
var ronda_actual=0;
var n_equipos=2;
var equipo_1='Equipo 1';
var equipo_2='Equipo 2';
var equipo_3='Equipo 3';
var equipo_4='Equipo 4';
var equipo_5='Equipo 5';
var puntos_equipo_1=0;
var puntos_equipo_2=0;
var puntos_equipo_3=0;
var puntos_equipo_4=0;
var puntos_equipo_5=0;
var turno_equipo=1;
var ronda_interna_js_actual=1;
var ronda_interna_js_total=n_rondas * n_equipos;
var n_preguntas_juego=0;
var matriz_preguntas=[];
var contador_activo=0;
var segundos_restantes_contador=0;
var partida_iniciada=0;
var tipo_preguntas='data_general';
var t;

var ancho_pantalla=1280;
var alto_pantalla=768;

var meta = document.createElement('meta');
meta.setAttribute('name','viewport');
meta.setAttribute('content','initial-scale='+ (1/window.devicePixelRatio) +',user-scalable=no');
document.head.appendChild(meta);


function tiempo_finalizado(){
	var html_tiempo='<h1>Tiempo finalizado</h1><div class="centrado"><a class="btn" href="javascript:oculta_info();">Cerrar</a></div>';
	muestra_info(html_tiempo, 600, 300, '#000', '#666', '#FFF');
}

function cuenta_atras(tiempo, f) {
	var fn = f;
	var i = tiempo;

	var capa_cuenta = document.getElementById("cuenta_atras");//referenciamos la capa

	capa_cuenta.count = function(i) {//Mostramos la cuenta
		//capa_cuenta.innerHTML = i + ' segundos restantes...';
		capa_cuenta.innerHTML = i;
		segundos_restantes_contador=i;
		if (i === 0) {//Si llega al final ejecutamos la funcion
			fn();
			return;//Y salimos
		}

		t=setTimeout(function() {//repetimos
			capa_cuenta.count(i - 1);
			},
			1000
		);
	}//function(i)
	capa_cuenta.count(i);
}

function para_contador(){
	clearTimeout(t);
	contador_activo=0;
}

function diferencias_versiones(){
	var html_vers='<table>';

	html_vers+= '<tr><th colspan="3">Diferencias entre la versión gratuita y la versión completa</th></tr>';
	html_vers+= '<tr><th>&nbsp;</th><th class="tam_tercio">Versión Gratuita</th><th class="tam_tercio">Versión Completa</th></tr>';
	html_vers+= '<tr><th class="dere">Nº de equipos:</th><td class="centrado">2</td><td class="centrado">2, 3, 4 ó 5</td></tr>';
	html_vers+= '<tr><th class="dere">Nº de rondas:</th><td class="centrado">5</td><td class="centrado">desde 3 hasta 10</td></tr>';
	html_vers+= '<tr><th class="dere">Nº de preguntas/ronda:</th><td class="centrado">4</td><td class="centrado">3, 4 ó 5</td></tr>';
	html_vers+= '<tr><th class="dere">Tiempo disponible por ronda:</th><td class="centrado">90 segundos</td><td class="centrado">30, 45, 60, 75, 90, 105 ó 120 segundos</td></tr>';
	html_vers+= '<tr><th class="dere">Nombre equipos:</th><td class="centrado">Equipo 1 y Equipo 2</td><td class="centrado">Personalizable</td></tr>';
	html_vers+= '<tr><th class="dere">Preguntas por grupos temáticos:</th><td class="centrado">No</td><td class="centrado">Si</td></tr>';
	html_vers+= '</table>';

	return html_vers;
}

function muestra_equipos(valor){
	if (valor=='def'){
		valor_ne=parseInt(n_equipos);//Lo convertimos a entero
	}else if (valor=='sel'){
		valor_ne=parseInt(document.getElementById('n_equipos').value);//Lo convertimos a entero
	}

	switch(valor_ne){
	case 2://Equipo 2
		document.getElementById('capa_eq3').style.display='none';
		document.getElementById('capa_eq4').style.display='none';
		document.getElementById('capa_eq5').style.display='none';
		break;
	case 3://Equipo 3
		document.getElementById('capa_eq3').style.display='block';
		document.getElementById('capa_eq4').style.display='none';
		document.getElementById('capa_eq5').style.display='none';
		break;
	case 4://Equipo 4
		document.getElementById('capa_eq3').style.display='block';
		document.getElementById('capa_eq4').style.display='block';
		document.getElementById('capa_eq5').style.display='none';
		break;
	case 5://Equipo 5
		document.getElementById('capa_eq3').style.display='block';
		document.getElementById('capa_eq4').style.display='block';
		document.getElementById('capa_eq5').style.display='block';
		break;
	}//switch
}

function muestra_val(id_mostrar, id_valor, texto){
	var valor_mostrar=document.getElementById(id_valor).value;
	document.getElementById(id_mostrar).innerHTML = valor_mostrar + texto;
}

function guarda_valores(){
	segundos=parseInt(document.getElementById('segundos_tmp').value);//Lo convertimos a entero
	n_preguntas_ronda=parseInt(document.getElementById('n_preguntas_ronda_tmp').value);//Lo convertimos a entero
	n_rondas=parseInt(document.getElementById('n_rondas_tmp').value);//Lo convertimos a entero
	n_equipos=parseInt(document.getElementById('n_equipos_tmp').value);//Lo convertimos a entero
	equipo_1=document.getElementById('equipo_1_tmp').value;
	equipo_2=document.getElementById('equipo_2_tmp').value;
	equipo_3=document.getElementById('equipo_3_tmp').value;
	equipo_4=document.getElementById('equipo_4_tmp').value;
	equipo_5=document.getElementById('equipo_5_tmp').value;
	//tipo_preguntas=document.getElementById('grupo_pregs').options[document.getElementById('grupo_pregs').selectedIndex].value;
	tipo_preguntas=document.getElementById('tipo_preguntas_tmp').value;

	/*
	para_contador();//Paramos el contador
	partida_iniciada=0;
	comenzar_partida();
	muestra_info('', false);
	*/

	//document.getElementById('info_general').style.display='none';//Ocultamos la ventana info
	//document.getElementById('cabecera').style.display='block';//Mostramos la ventana de cabecera
	//document.getElementById('contenido').style.display='block';//Mostramos la ventana de contenido
	oculta_info();

	partida_iniciada=0;
	comenzar_partida();
}

function copia_valores_tmp(){
	var segundos_tmp=parseInt(document.getElementById('tiempo_ronda').value);//Lo convertimos a entero
	var n_preguntas_ronda_tmp=parseInt(document.getElementById('n_pregs_ronda').value);//Lo convertimos a entero
	var n_rondas_tmp=parseInt(document.getElementById('n_rondas').value);//Lo convertimos a entero
	var n_equipos_tmp=parseInt(document.getElementById('n_equipos').value);//Lo convertimos a entero
	var equipo_1_tmp=document.getElementById('nombre_eq1').value;
	var equipo_2_tmp=document.getElementById('nombre_eq2').value;
	var equipo_3_tmp=document.getElementById('nombre_eq3').value;
	var equipo_4_tmp=document.getElementById('nombre_eq4').value;
	var equipo_5_tmp=document.getElementById('nombre_eq5').value;
	var tipo_preguntas_tmp=document.getElementById('grupo_pregs').options[document.getElementById('grupo_pregs').selectedIndex].value;

	var html_tmp='<input type="text" id="segundos_tmp" value="'+segundos_tmp+'">';
	html_tmp+='<input type="text" id="n_preguntas_ronda_tmp" value="'+n_preguntas_ronda_tmp+'">';
	html_tmp+='<input type="text" id="n_rondas_tmp" value="'+n_rondas_tmp+'">';
	html_tmp+='<input type="text" id="n_equipos_tmp" value="'+n_equipos_tmp+'">';
	html_tmp+='<input type="text" id="equipo_1_tmp" value="'+equipo_1_tmp+'">';
	html_tmp+='<input type="text" id="equipo_2_tmp" value="'+equipo_2_tmp+'">';
	html_tmp+='<input type="text" id="equipo_3_tmp" value="'+equipo_3_tmp+'">';
	html_tmp+='<input type="text" id="equipo_4_tmp" value="'+equipo_4_tmp+'">';
	html_tmp+='<input type="text" id="equipo_5_tmp" value="'+equipo_5_tmp+'">';
	html_tmp+='<input type="text" id="tipo_preguntas_tmp" value="'+tipo_preguntas_tmp+'">';

	var div_tmp = document.getElementById('div_tmp');

	div_tmp.innerHTML = '';
	div_tmp.innerHTML = html_tmp;
}

function preg_guarda_valores(){
	copia_valores_tmp();//Copiamos los valores a un div temporal
	var html_guardar='<h2>¿Desea guardar los valores y comenzar una nueva partida de Palabra Clave?</h2>';
	html_guardar+= '<div class="centrado"><a class="btn" href="javascript:guarda_valores();">Guardar</a><a class="btn" href="javascript:oculta_info();">Cancelar</a></div>';
	muestra_info(html_guardar, 800, 300, '#000', '#666', '#FFF');
}

function configurar(){
	var html_config='<h1>Configurar opciones de partida</h1>';
	html_config+= '<form id="config_partida">';
	html_config+= '<label for="n_equipos">N&#186; de equipos [<span class="num_sel" id="m_n_equipos">'+n_equipos+'</span>]:</label> <input onchange="muestra_val(\'m_n_equipos\', \'n_equipos\', \'\');muestra_equipos(\'sel\');" id="n_equipos" class="an_medio" type="range" min="2" max="5" step="1" value="'+n_equipos+'" /><br />';
	html_config+= '<label for="n_rondas">N&#186; de rondas [<span class="num_sel" id="m_n_rondas">'+n_rondas+'</span>]:</label> <input onchange="muestra_val(\'m_n_rondas\', \'n_rondas\', \'\');" id="n_rondas" class="an_medio" type="range" min="3" max="10" step="1" value="'+n_rondas+'" /><br />';
	html_config+= '<label for="n_pregs_ronda">N&#186; de preguntas por ronda [<span class="num_sel" id="m_n_pregs_ronda">'+n_preguntas_ronda+'</span>]:</label> <input onchange="muestra_val(\'m_n_pregs_ronda\', \'n_pregs_ronda\', \'\');" id="n_pregs_ronda" class="an_medio" type="range" min="3" max="5" step="1" value="'+n_preguntas_ronda+'" /><br />';
	html_config+= '<label for="tiempo_ronda">Tiempo por ronda [<span class="num_sel" id="m_tiempo_ronda">'+segundos+' seg.</span>]:</label> <input onchange="muestra_val(\'m_tiempo_ronda\', \'tiempo_ronda\', \' seg.\');" id="tiempo_ronda" class="an_medio" type="range" min="30" max="180" step="15" value="'+segundos+'" /><br />';
	html_config+= '<label for="grupo_pregs">Grupo de palabras:</label> <select id="grupo_pregs">';
	//html_config+= '<option value="data_general">General</option><option value="data_general2">General 2</option><option value="data_general3">General 3</option><option value="data_general4">General 4</option><option value="data_infantil">Infantil</option>';
	html_config+= '<option value="data_general">General</option><option value="data_general2">General 2</option><option value="data_infantil">Infantil</option>';
	html_config+= '<option value="data_tech">Tecnología</option></select><br />';
	html_config+= '<label for="nombre_eq1">Nombre Equipo 1:</label> <input type="text" id="nombre_eq1" maxlength="35" class="an_medio2" value="' + equipo_1 + '" /><br />';
	html_config+= '<label for="nombre_eq2">Nombre Equipo 2:</label> <input type="text" id="nombre_eq2" maxlength="35" class="an_medio2" value="' + equipo_2 + '" /><br />';
	html_config+= '<div id="capa_eq3" style="display:none"><label for="nombre_eq3">Nombre Equipo 3:</label> <input type="text" id="nombre_eq3" maxlength="35" class="an_medio2" value="' + equipo_3 + '" /><br /></div>';
	html_config+= '<div id="capa_eq4" style="display:none"><label for="nombre_eq4">Nombre Equipo 4:</label> <input type="text" id="nombre_eq4" maxlength="35" class="an_medio2" value="' + equipo_4 + '" /><br /></div>';
	html_config+= '<div id="capa_eq5" style="display:none"><label for="nombre_eq5">Nombre Equipo 5:</label> <input type="text" id="nombre_eq5" maxlength="35" class="an_medio2" value="' + equipo_5 + '" /><br /></div>';
	html_config+= '<div class="centrado"><a href="javascript:preg_guarda_valores();"" class="btn_trans">Guardar Valores</a></div>';
	html_config+= '</form>';
	html_config+= '<div class="centrado"><a class="btn" href="javascript:oculta_info();">Cerrar</a></div>';

	//document.getElementById('info_general').innerHTML = html_config;
	muestra_info(html_config, 1100, 650);
	muestra_equipos('def');//Mostrar los cuadros de texto de los equipos
}

function ayuda(){
	var html_ayuda='<h1>Ayuda de Palabra Clave</h1>';
	html_ayuda+= '<p>Cada equipo debe estar formado al menos por dos personas, una que ve las palabras y la otra (u otras)';
	html_ayuda+= ' que deberán adivinar cada una de las palabras clave mostradas en pantalla.</p>';
	html_ayuda+= '<p>La persona que ve la palabra, deberá ir diciendo una sóla palabra de cada vez para que su compañero/s de equipo';
	html_ayuda+= ' respondan con otra palabra (una sóla de cada vez y sin palabras compuestas), si no es la correcta';
	html_ayuda+= ' volverá a decir otra palabra para que su/s compañero/s acierten la palabra clave.</p>';
	html_ayuda+= '<p>Si se acierta la palabra, deberá marcarse la misma para que puntúe como acertada (la bandera cambiará a color verde)';
	html_ayuda+= ' pulsando sobre la misma con el dedo (o sobre su correspondiente bandera) y dirá <strong>siguiente</strong> para indicar a su equipo';
	html_ayuda+= ' que pasa a otra palabra (no tiene que seguir el orden de las palabras en pantalla).</p>';
	html_ayuda+= '<p>No se puede utilizar como pista una palabra compuesta sobre la misma palabra clave, que contenga su misma raíz';
	html_ayuda+= ' o la palabra clave en otro idioma.</p>';
	html_ayuda+= '<p>En la parte superior izquierda y en blanco vemos el tiempo restante del que disponemos para que nuestro equipo acierte';
	html_ayuda+= ' las palabras clave de dicha ronda.</p>';
	html_ayuda+= '<p>';
	html_ayuda+= '<p>Si pulsamos sobre el icono <strong>Configurar Partida</strong>, <strong>Ver Puntuaciones</strong> o';
	html_ayuda+= ' <strong>Ayuda del Programa</strong>, el tiempo se detiene, continuando con la cuenta atrás al cerrar dichas ventanas.</p>';
	html_ayuda+= '<p>Gana el equipo que más puntos obtiene al finalizar todas las rondas. No se olvide de marcar cada';
	html_ayuda+= ' pregunta que acierte su equipo para que se contabilice. Al final de la partida o durante la misma';
	html_ayuda+= ' puede ver el estado de las puntuaciones pulsando sobre el icono <strong>Ver Puntuaciones</strong>.</p>';
	html_ayuda+= '<p>Todos los grupos de palabras clave constan de 300 palabras, suficientes para jugar 5 equipos en 10 rondas';
	html_ayuda+= ' con 5 palabras por ronda (lo que escogería aleatoriamente 250 palabras). La excepción es el grupo';
	html_ayuda+= ' infantil que tiene 250 palabras, ya que se recomienda usar 3 palabras por ronda (y 120 segundos de tiempo por ronda).</p>';
	html_ayuda+= '<h2>¡¡¡Suerte y a disfrutar del juego!!!</h2>';
	html_ayuda+= '<div class="centrado"><a class="btn" href="javascript:oculta_info();">Cerrar</a></div>';

	//document.getElementById('info_general').innerHTML = html_ayuda;
	muestra_info(html_ayuda, 950, 600);
}

function puntuaciones(){
	var nombre_equipo_mostrar=eval('equipo_' + turno_equipo);
	var txt_puntos='';

	var html_puntos='<h1>Puntuaciones</h1><table>';
	html_puntos+= '<tr><th colspan="2">Ronda ' + ronda_actual + ' de ' + n_rondas + ' (' + n_preguntas_ronda + ' preguntas por ronda en ' + segundos + ' segundos).</th></tr>';
	html_puntos+= '<tr><th colspan="2">Turno de: <em>' + nombre_equipo_mostrar + '</em></tr></th>';

	for (k=1;k<=n_equipos;k++){//Puntuaciones de cada equipo
		switch(k){
		case 1://Equipo 1
			txt_puntos=(puntos_equipo_1==1)?'punto':'puntos';
			html_puntos+= '<tr><th class="dere">' + equipo_1 + ':</th><td>' + puntos_equipo_1 + ' ' + txt_puntos + '.</td></tr>';
			break;
		case 2://Equipo 2
			txt_puntos=(puntos_equipo_2==1)?'punto':'puntos';
			html_puntos+= '<tr><th class="dere">' + equipo_2 + ':</th><td>' + puntos_equipo_2 + ' ' + txt_puntos + '.</td></tr>';
			break;
		case 3://Equipo 3
			txt_puntos=(puntos_equipo_3==1)?'punto':'puntos';
			html_puntos+= '<tr><th class="dere">' + equipo_3 + ':</th><td>' + puntos_equipo_3 + ' ' + txt_puntos + '.</td></tr>';
			break;
		case 4://Equipo 4
			txt_puntos=(puntos_equipo_4==1)?'punto':'puntos';
			html_puntos+= '<tr><th class="dere">' + equipo_4 + ':</th><td>' + puntos_equipo_4 + ' ' + txt_puntos + '.</td></tr>';
			break;
		case 5://Equipo 5
			txt_puntos=(puntos_equipo_5==1)?'punto':'puntos';
			html_puntos+= '<tr><th class="dere">' + equipo_5 + ':</th><td>' + puntos_equipo_5 + ' ' + txt_puntos + '.</td></tr>';
			break;
		}//switch
	}//for
	html_puntos+= '</table>';
	html_puntos+= '<div class="centrado"><a class="btn" href="javascript:oculta_info();">Cerrar</a></div>';

	//document.getElementById('info_general').innerHTML = html_puntos;
	muestra_info(html_puntos, 900, 600);
}

function dialogoNueva(){
	oculta_info();
	partida_iniciada=0;
	comenzar_partida();
}

function comenzar_partida(){
	if (partida_iniciada==1){//Si ya hay una partida iniciada
		para_contador();//Paramos el contador
		var html_comenzar='<h2>¿Desea iniciar una nueva partida?</h2>';
		html_comenzar+= '<div class="centrado"><a class="btn" href="javascript:dialogoNueva();">Aceptar</a><a class="btn" href="javascript:oculta_info();">Cancelar</a></div>';
		muestra_info(html_comenzar, 800, 300, '#000', '#666', '#FFF');
		return;//Salimos de la funcion
	}

	partida_iniciada=1;//Marcamos la partida como iniciada
	ronda_interna_js_total=n_rondas * n_equipos;//Fijamos el numero de rondas internas totales

	puntos_equipo_1=0;
	puntos_equipo_2=0;
	puntos_equipo_3=0;
	puntos_equipo_4=0;
	puntos_equipo_5=0;
	turno_equipo=1;
	ronda_interna_js_actual=1;

	//data_general.sort(function() {return 0.5 - Math.random()}) //Elementos del array ordenados aleatoriamente
	datos[tipo_preguntas].sort(function() {return 0.5 - Math.random()}) //Elementos del array ordenados aleatoriamente

	n_preguntas_juego=n_preguntas_ronda * n_rondas * n_equipos;

	for (j=0;j<n_preguntas_juego;j++){//Creamos la matriz de preguntas del juego actual con todas a false
		matriz_preguntas[j]=false;
	}

	muestra_palabras('inicio');
}

function muestra_palabras(accion){
	document.getElementById('info_general').innerHTML = '';

	if (accion=='inicio'){//Inicio del juego
		ronda_interna_js_actual=1;
		ronda_actual=1;
		turno_equipo=1;
	}else if (accion=='siguiente'){
		ronda_interna_js_actual++;
		if (turno_equipo==n_equipos){//Ya ha sido el turno del ultimo equipo
			turno_equipo=1;
			ronda_actual++;
		}else{
			turno_equipo++;
		}
	}else if (accion=='anterior'){
		ronda_interna_js_actual--;
		if (turno_equipo==1){//Ha sido el turno del primer equipo
			turno_equipo=n_equipos;
			ronda_actual--;
		}else{
			turno_equipo--;
		}
	}

	var nombre_equipo_mostrar=eval('equipo_' + turno_equipo);
	var cont_rondas='<img class="equipo" src="images/rectagle_' + turno_equipo + '.png" alt="turno" />Turno de: <strong>' + nombre_equipo_mostrar + '</strong>';
	cont_rondas+= '&nbsp;[Ronda ' + ronda_actual + ' de ' + n_rondas + ']';

	//******* Para DEBUG ******
	//cont_rondas=cont_rondas + '<br />ronda_interna_js_actual: ' + ronda_interna_js_actual + '; ronda_interna_js_total: ' + ronda_interna_js_total;
	//cont_rondas=cont_rondas + '; n_preguntas_juego: ' + n_preguntas_juego;
	//******* Para DEBUG ******

	document.getElementById('info_rondas').innerHTML = cont_rondas;

	var cont='';
	for (i=0;i<n_preguntas_ronda;i++){
		var actual=(n_preguntas_ronda * (ronda_interna_js_actual - 1)) + i;
		cont+='<div class="palabra" onclick="javascript:marca_preg(' + actual + ')">' +  datos[tipo_preguntas][actual];
		if (matriz_preguntas[actual]==false){//Si no esta acertada
			cont+='<img src="images/flag-red.png" id="flag_' + actual + '" alt="Fallo" class="banderas" /></div>';
		}else{//Si esta acertada
			cont+='<img src="images/flag-green.png" id="flag_' + actual + '" alt="Acierto" class="banderas" /></div>';
		}

	}
	document.getElementById('cont_palabras').innerHTML = cont;

	if (ronda_interna_js_actual>1){//No es la primera ronda
		var cont_anterior='<div class="siguiente"><img onclick="javascript:muestra_palabras(\'anterior\');" src="images/go-previous-8.png" alt="Anterior" />';
		document.getElementById('enlace_anterior').innerHTML = cont_anterior;
	}else{
		document.getElementById('enlace_anterior').innerHTML = '';//Vaciamos el enlace de anterior
	}

	if (ronda_interna_js_actual < ronda_interna_js_total){//No es la ultima ronda
		var cont_siguiente='<div class="siguiente"><img onclick="javascript:muestra_palabras(\'siguiente\');" src="images/go-next-8.png" alt="Siguiente" />';
		document.getElementById('enlace_siguiente').innerHTML = cont_siguiente;
	}else{
		document.getElementById('enlace_siguiente').innerHTML = '';//Vaciamos el enlace de siguiente
	}

	contador_activo=1;
	para_contador();
	cuenta_atras(segundos, tiempo_finalizado);//Iniciamos el contador pasandole el tiempo total y la funcion a ejecutar al acabar

}

function suma_resta_puntos(puntos){
	switch(turno_equipo){
		case 1://Equipo 1
			puntos_equipo_1 = puntos_equipo_1 + puntos;
			break;
		case 2://Equipo 2
			puntos_equipo_2 = puntos_equipo_2 + puntos;
			break;
		case 3://Equipo 3
			puntos_equipo_3 = puntos_equipo_3 + puntos;
			break;
		case 4://Equipo 4
			puntos_equipo_4 = puntos_equipo_4 + puntos;
			break;
		case 5://Equipo 5
			puntos_equipo_5 = puntos_equipo_5 + puntos;
			break;
	}//switch
}

function marca_preg(pregunta){
	//alert(pregunta);
	var id_img='flag_' + pregunta;

	if (document.getElementById(id_img).alt=='Fallo'){//Marcar la pregunta como acertada
		document.getElementById(id_img).alt='Acierto';
		document.getElementById(id_img).src='images/flag-green.png';
		matriz_preguntas[pregunta]=true;
		suma_resta_puntos(1);//Aumentamos la puntuación del equipo
	}else{//Marcar la pregunta como fallada
		document.getElementById(id_img).alt='Fallo';
		document.getElementById(id_img).src='images/flag-red.png';
		matriz_preguntas[pregunta]=false;
		suma_resta_puntos(-1);//disminuimos la puntuacion del equipo
	}
}

function oculta_info(){
	if (segundos_restantes_contador>0){//Si quedaban segundos
		cuenta_atras(segundos_restantes_contador, tiempo_finalizado);//Volvemos a iniciar el contador donde quedo
	}
	document.getElementById('cierra_info').style.display='none';//Ocultamos el boton de cierre
	document.getElementById('info_general').style.display='none';//Ocultamos la ventana info
	document.getElementById('info_general').innerHTML='';//Vaciamos la venta info
	document.getElementById('fade').style.display='none';//Ocultamos el fade
}//oculta_info

function muestra_info(html, w, h, c, b, f){
	w = typeof(w) != 'undefined' ? w : 800;
	h = typeof(h) != 'undefined' ? h : 450;
	c = typeof(c) != 'undefined' ? c : '#CF9';
	b = typeof(b) != 'undefined' ? b : '#FFF';
	f = typeof(f) != 'undefined' ? f : '#000';

	//alert(segundos_restantes_contador);
	//var fade = document.getElementById('fade');
	var contenido = document.getElementById('contenido');
	var cabecera = document.getElementById('cabecera');
	var info = document.getElementById('info_general');
	var cierra_info = document.getElementById('cierra_info');

	var izqui=Math.round((ancho_pantalla - w)/2);
	var arriba=Math.round((alto_pantalla - h)/2);

	var cerrar_izqui=izqui + w + 20;
	var cerrar_arriba=arriba - 19;

	info.style.width=w+'px';//Ancho de la ventana
	info.style.height=h+'px';//Alto de la ventana
	info.style.top=arriba+'px';//Posicion arriba de la ventana
	info.style.left=izqui+'px';//Posicion izquierda de la ventana
	info.style.background=c;//Color de fondo de la ventana
	info.style.borderColor=b;//Color de borde de la ventana
	info.style.color=f;//Color de fuente

	cierra_info.style.top=cerrar_arriba+'px';//Posicion arriba del boton de cierre
	cierra_info.style.left=cerrar_izqui+'px';//Posicion izquierda del boton de cierre
	cierra_info.style.display='block';//Mostramos el boton de cierre

	para_contador();//Paramos el contador

	info.innerHTML='';//Vaciamos la venta info
	info.innerHTML=html;//Le ponemos el contenido
	fade.style.display='block';//Mostramos el fade
	info.style.display='block';//Mostramos la ventana info
}


function dialogoSalir(){
	oculta_info();
	blackberry.app.exit();
}

function salir(){
	var html_salir='<h2>¿Desea salir de Palabra Clave?</h2>';
	html_salir+= '<div class="centrado"><a class="btn" href="javascript:dialogoSalir();">Aceptar</a><a class="btn" href="javascript:oculta_info();">Cancelar</a></div>';
	muestra_info(html_salir, 800, 300, '#000', '#666', '#FFF');
}

window.addEventListener("load", function(e) {
	document.addEventListener("webworksready", function(e) {
		blackberry.event.addEventListener("swipedown", configurar);
		blackberry.event.addEventListener("pause", puntuaciones);
	}, false);
}, false);