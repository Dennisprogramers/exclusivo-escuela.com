/*let nombre = prompt("Hola! Pofavor pon tu nombre aqui abajo")
let saludo = "Hola bienvenido "
document.write(saludo + nombre)
**/
{

	var saludo = ""
	var tiempo = new
	Date().getHours()
	var nombre = prompt("Hola! Pofavor pon tu nombre aqui abajo");

	if(tiempo <12){
		saludo= "Buenos dias espero tengas un lindo dia ";
	}else if (tiempo <18){
	 saludo = "Buenas tardes ";
}else{
	saludo= "Espero allas tenido un lindo dia  "
}

 document.write(saludo + nombre)
 alert(nombre + " bienvenido esta web todavia esta en desarrollo")
}