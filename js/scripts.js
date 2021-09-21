
$(document).ready(function() {
var codigo = new String();

  function simbolob(sim, simb){
    // operadores
    if ( (sim == "+" && simb == "+") || (sim == "+" && simb == "=") || (sim == "-" && simb == "-") || (sim == "-" && simb == "=") || (sim == "*" && simb == "=") || (sim == "/" && simb == "=") || (sim == "%" && simb == "=")) {
      return true;
    }
    // operadores de comparacion
    else if ( (sim == "<" && simb == "=") || (sim == ">" && simb == "=") || (sim == "=" && simb == "=") || (sim == "!" && simb == "=")) {
      return true;
    }
    // operadpres logicos 
    else if ( (sim == "&" && simb == "&") || (sim == "|" && simb == "|")){
      return true;
    }
    // referencia
    else if (sim == "-" && simb == ">"){
      return true;
    }
    // parentesis
    else if (sim == "(" && simb == ")"){
      return true;
    }
    else{
      return false;
    }
  }

  function simbolo(sim, palabra){
    // operadores
    if (sim == "+" || sim == "-" || sim == "*" || sim == "/" || sim == "%") {
      return true;
    }
    // corchetes
    else if(sim == "{" || sim == "}" || sim == "(" || sim == ")"){
      return true;
    }
    // ;
    else if (sim == ";") {
      return true;
    }
    // Negacion
    else if (sim == "!") {
      return true;
    }
    //exepción logicos
    else if ( (sim == "<" && palabra == "#include") || sim == ">" && palabra == "#include") {
      return false;
    } 
    // logicos
    else if (sim == "<" || sim == ">") {
      return true;
    }
    // asignación
    else if (sim == "="){
      return true;
    }
    else{
      return false;
    }
  }

  function validar(codigo) {
    var palabra = new String();
    var text = "";
    var ultimaPalabra = "";

    for (var i = 0; i < codigo.length; i++) {

        // Eliminar espacios en blanco
        if(codigo[i] == " " || codigo[i] == "\t" || codigo[i] == "\n"){                      
          if (palabra != "") {
            text+=palabra+"\n";
            ultimaPalabra = palabra;
            palabra=""; 
          }
        }
        // eliminar linea de comentario
        else if (codigo[i] == "/" && codigo[i+1] == "/") {
          while(codigo[i] != "\n"){
            i++;
          }
        }
        // Eliminar comentario
        else if (codigo[i] == "/" && codigo[i+1] == "*") {
          var prueba = false;
          while(!prueba){
            if (codigo[i] == "*" && codigo[i+1] == "/") {
              prueba = true;
            }
            i++;
          }
        }
        // Identificar simbolos dobles
        else if ( simbolob(codigo[i], codigo[i+1])) {
          if (palabra != "") {
            text+=palabra+"\n";
            ultimaPalabra = palabra; 
            palabra="";
          }
          text+=codigo[i]+codigo[i+1]+"\n";
          i++;
        }
        // identificar simbolos 
        else if ( simbolo(codigo[i],ultimaPalabra) ){
          if (palabra != "") {
            text+=palabra+"\n";
            ultimaPalabra = palabra;
            palabra="";
          }
          text+=codigo[i]+"\n";
        }
        // Armar palabras reservadas, identificadores y constantes. 
        else if (codigo[i] != "" && codigo[i].charCodeAt(0) != 13)  {
            palabra+= codigo[i];      
        }
    }
    $("#texto").text(text);   
  }
  
  $("#leerArchivo").click(function() {
    var archivo = $("#cargar")[0].files[0];  
    if (archivo) {
      var reader = new FileReader();
      reader.readAsText(archivo);
      reader.onload = function(e) {
        $("#texto").empty();
        validar(reader.result);
      }
    }else{
      alert("No ha subido el archivo");
    }
  });



  $("#borrar").click(function() {
    $("#texto").empty();     
  });

});
