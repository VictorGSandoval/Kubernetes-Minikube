function encripta(obj,tipo) {
  var cadena="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var new_cadena=""; 
  
  
  if (obj== 'undefined' || obj==null){
	  return '1';
  }
  obj=obj.trim();
  var max =obj.length;
  if (max==1){
	  return '1';
  }
  obj=obj.replace(/[.*+-]/,'').trim();
  max =obj.length;
  if (tipo=='E'){
    for (var i=0;i<max;i++)
        {    if(!obj[i]){
             new_cadena=new_cadena+cadena[obj[i]*2];
          	}else 
             new_cadena=new_cadena+cadena[cadena.indexOf(obj[i])*2];
        }   
  }
  else {
      for (var i=0;i<max;i++)
        {    
       new_cadena=new_cadena+cadena[cadena.indexOf(obj[i])/2];       
        } 
  } 
   
  return new_cadena;
}

function first_day(date){
	var date = new Date(date);
	var inicio = new Date(date.getFullYear(), date.getMonth(), 1);
	return inicio.toISOString().substring(0,10);
}

function last_day(date){
	var date = new Date(date);	
	var fin = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	return fin.toISOString().substring(0,10);
}

function fn_unidad_negocio(corporacion,filial_id,unidad_negocio_id){
	var _unidad_neg=unidad_negocio_id;
	
	switch(corporacion+filial_id){
		case 'INKAFARMA-O33': _unidad_neg='MTZ';break;
		case 'MIFARMA-160': _unidad_neg='MTZ';break;
	}
	switch(unidad_negocio_id){
		case '15': _unidad_neg='01';break;
		case '13': _unidad_neg='MTZ';break;
	}	
	return _unidad_neg;
}

function encripta_texto(obj,tipo) {	
  
  var name="abcdefghijklmnñopqrstuvwxyz .,;_-0123456789@áéíóúABCDEFGHIJKLMNÑOPQRSTUVWXYZ+*/()?&%=:{}¿¡!<>|[^°]$~";
  var new_cadena=""; 
  
  
  if (obj== 'undefined' || obj==null || obj== ''){
	  return '';
  }
  obj=obj.trim();
  var max =obj.length;
  if (max==1){
	  return '-';
  }
  //obj=obj.replace(/[.*+-]/,'').trim();
  max =obj.length;
  if (tipo=='E'){
  	  obj=obj.toLowerCase().trim();
  	  
    for (var i=0;i<max;i++)
        {    if(!obj[i]){
             new_cadena=new_cadena+name[obj[i]*2];
          	}else 
             new_cadena=new_cadena+name[name.indexOf(obj[i])*2];
        }   
  }
  else {
      for (var i=0;i<max;i++)
        {    
       new_cadena=new_cadena+name[name.indexOf(obj[i])/2];       
        } 
  } 
   
  return new_cadena;
}

function jerarquias_datos_cliente(p1,p2,p3,p4){		
	if (p1.trim()!=''){
		return (p1.toLowerCase()=='null')?null:p1;
	}
	if (p2.trim()!=''){
		return (p2.toLowerCase()=='null')?null:p2;
	}
	if (p3.trim()!=''){
		return (p3.toLowerCase()=='null')?null:p3;
	}
	if (p4.trim()!=''){
		return (p4.toLowerCase()=='null')?null:p4;
	}
	
}



function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


function contactRegla1(correo){

// usage example:
var palabra= correo.toUpperCase();

// Option 1
var stringarray=palabra.split('');
var unique = stringarray.filter(onlyUnique);
var cantidadcarac=unique.length;

var result=0;
if (cantidadcarac>=3) {
result=1;
}

return result;

}