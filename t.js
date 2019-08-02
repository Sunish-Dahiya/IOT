var A0  = "A0";
var A1  = "A1";
var A2  = "A2";
var A3  = "A3";
var True = "HIGH"
var False = "LOW"
var HIGH = "HIGH"
var LOW  = "LOW"
var debug = 0
var arr;
var tempa;
var intensity;
var voltage;
var current;
var power;
var api_key = "";
var d_name = "";
var base_url = "https://cloud.boltiot.com/remote/"

function digitalWrite(pin,val){
	
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && debug == 1) {
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            alert(xmlhttp.responseText);
            var obj = JSON.parse(xmlhttp.responseText);
            if(obj.success=="1"){
                    alert(obj.value);
            }
        }
    };  
    xmlhttp.open("GET", base_url+api_key+"/digitalWrite?pin="+pin+"&state="+val+"&deviceName="+d_name,true);
    xmlhttp.send();    
}

 
function analogWrite(pin,val) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && debug == 1) {
        //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            alert(xmlhttp.responseText);
            var obj = JSON.parse(xmlhttp.responseText);
                if(obj.success=="1"){
                    alert(obj.value);
                }
        }
    };  
    xmlhttp.open("GET",base_url+api_key+"/analogWrite?pin="+pin+"&value="+val+"&deviceName="+d_name,true);
    xmlhttp.send();
}   

function digitalRead(pin,element_id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {

        //document.getElementById(element_id).innerHTML = xmlhttp.responseText;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            var obj = JSON.parse(xmlhttp.responseText);
            if(obj.success=="1"){
                    document.getElementById(element_id).innerHTML = "Pin Val = "+obj.value;
            }
            else{
                    document.getElementById(element_id).innerHTML = "Error = "+xmlhttp.responseText;
            }
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/digitalRead?pin="+pin+"&deviceName="+d_name,true);
    xmlhttp.send();
}


function analogRead(pin,element_id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        //document.getElementById(element_id).innerHTML = xmlhttp.responseText;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          //  alert(xmlhttp.responseText);
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            var obj = JSON.parse(xmlhttp.responseText);
            if(obj.success=="1"){
				var num=obj.value*0.097;
				var n=num.toFixed(2);
                 document.getElementById(element_id).innerHTML = n;
            }
            else{
                    document.getElementById(element_id).innerHTML = "Error = "+xmlhttp.responseText;
            }
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/analogRead?pin="+pin+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function serialBegin(baud) {
    var xmlhttp = new XMLHttpRequest();
    //var baud = parseInt(document.getElementById("baudset").value);
    //alert(document.getElementById("baudset").value)
    switch(baud) {
        case 2400:
            baud = 0;
            break;
        case 4800:
            baud = 1;
            break;
        case 9600:
            baud = 2;
            break;
        case 19200:
            baud = 3;
            break;
        default:
            baud = 2;
    }
    xmlhttp.onreadystatechange = function() {
        //document.getElementById("demo").innerHTML = xmlhttp.responseText;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && debug == 1) {
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            //var obj = JSON.parse(xmlhttp.responseText);
            //if(obj.success=="1")
            alert(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/serialBegin?baud="+baud+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function serialWrite(serialdata) {
    var xmlhttp = new XMLHttpRequest();
    //var serialdata = document.getElementById("serialdata").value;
    xmlhttp.onreadystatechange = function() {
        //document.getElementById("demo").innerHTML = xmlhttp.responseText;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && debug == 1) {
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            //var obj = JSON.parse(xmlhttp.responseText);
            //if(obj.success=="1")
                alert(xmlhttp.responseText);
        }
    };
	console.log(serialdata);
    xmlhttp.open("GET",base_url+api_key+"/serialWrite?data="+serialdata+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function serialRead(till,element_id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        //document.getElementById("demo").innerHTML = xmlhttp.responseText;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            var obj = JSON.parse(xmlhttp.responseText);
            if(obj.success=="1"){
				//alert(obj.value);
				arr=obj.value.split(",");
				 tempa=(parseFloat(arr[0])*0.49).toPrecision(3);
				var light=(parseFloat(arr[1])*0.0049).toPrecision(4);
				 intensity=(5000-1000*light)/5;
				var cvalue=(parseFloat(arr[2])*0.0049);
				current= (cvalue-2.51)*15;
var v1=(parseFloat(arr[3])*0.0049);
voltage=v1*13.5;
power=current*voltage;
console.log(intensity);
console.log(tempa);
console.log(current);
console.log(voltage);
                   // document.getElementById(element_id).innerHTML = arr[0]+"Device is Online";
				document.getElementById("temp_data").innerHTML =tempa;
				document.getElementById("light_data").innerHTML =intensity.toFixed(0);
					document.getElementById("current_data").innerHTML = current.toFixed(2);
document.getElementById("voltage_data").innerHTML = voltage.toFixed(1);
document.getElementById("power_data").innerHTML = power.toFixed(0);
            }
            else{
                    document.getElementById(element_id).innerHTML = "Error = "+xmlhttp.responseText;
            }
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/serialRead?till="+till+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function serialWR(data,till,element_id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        //document.getElementById("demo").innerHTML = xmlhttp.responseText;
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
            //document.getElementById("javascript_response").innerHTML = "Javascript Response : "+xmlhttp.responseText;
            var obj = JSON.parse(xmlhttp.responseText);
            if(obj.success=="1"){
                    document.getElementById(element_id).innerHTML = "Read Val = "+obj.value;
            }
            else{
                    document.getElementById(element_id).innerHTML = "Error = "+xmlhttp.responseText;
            }
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/serialWR?data="+data+"&till="+till+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function digitalMultiWrite(pins,values) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && debug == 1) {

            alert("Javascript Response : "+xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/digitalMultiWrite?pins="+pins+"&states="+values+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function analogMultiWrite(pins,values) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && debug == 1) {

            alert("Javascript Response : "+xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET",base_url+api_key+"/analogMultiWrite?pins="+pins+"&values="+values+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function digitalMultiRead(pins,element_id) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        document.getElementById(element_id).innerHTML = xmlhttp.responseText;
    };
    xmlhttp.open("GET",base_url+api_key+"/digitalMultiRead?pins="+pins+"&deviceName="+d_name,true);
    xmlhttp.send();
}

function setKey(key,dev_name){
    api_key = key;
    d_name = dev_name;
}

function setDebug(bool){
    if (bool == true){
        debug = 1;
    }
    else{
        debug = 0;
    }
}