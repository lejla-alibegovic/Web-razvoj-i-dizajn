var x=document.querySelectorAll(".VilaKolonaOkvir");

x.forEach(function(element){
    element.addEventListener('click',function(){
        this.style.borderColor='yellow';
        for(var j=0;j<x.length;j++){
            if(this!=x[j]){
                x[j].style.borderColor='white';
            }
        }
    })
})


var dugme=document.querySelector("#IzbornikDugme");
var menu=document.querySelector("#Izbornik");
menu.style.height="0px";

dugme.addEventListener("click",function(){
    if(menu.style.height=="0px"){
        menu.style.height=menu.scrollHeight+"px";
    }
    else{
        menu.style.height="0px";
    }
})


//validation
$.validator.addMethod(
    "regex",
    function(value, element, regexp) {
        var check = false;
        return this.optional(element) || regexp.test(value);
    },
    "Please check your input."
);

$("#forma").validate({
    rules: {
        dostavaIme: {
            regex: /[A-Za-z]{1,}/
        },
        dostavaAdresa: {
            regex: /[A-Za-z]{1,}/
        },
        dostavaPostanskiBroj: {
            regex: /^[0-9]{5}$/
        },
        dostavaTelefon: {
            regex: /^\+[0-9]{3}\-[0-9]{2}\-[0-9]{3}\-[0-9]{4}$/
        }
    }


})


function dohvati(url,fun){
    var zahtjev=new XMLHttpRequest();

    zahtjev.onload=function(){
        if(zahtjev.status===200){
            fun(JSON.parse(zahtjev.responseText));
        }else{
            alert("Server javlja gresku: "+zahtjev.statusText);
        }
    }

    zahtjev.onerror=function(){
        alert("Greska u komunikaciji sa serverom.");
    };

    zahtjev.open("GET",url,true);
    zahtjev.send(null);
}

dohvati('http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/GetAll', function(x){
    x.forEach(function(el){
        var body=$('tbody');
        var red=$('<tr></tr>').appendTo(body);
        $('<td>'+ el.narudzbaId+'</td>').appendTo(red);
        $('<td>'+el.datumNarudzbe+'</td>').appendTo(red);
        $('<td>'+ el.dostavaIme+'</td>').appendTo(red);
        $('<td>'+ el.dostavaAdresa+'</td>').appendTo(red);
        $('<td>'+ el.dostavaPostanskiBroj+'</td>').appendTo(red);
        $('<td>'+ el.dostavaTelefon+'</td>').appendTo(red);
        $('<td>'+ el.napomena+'</td>').appendTo(red);

    })
})

document.querySelector('#btn').addEventListener('click',function(){
   
    if(!$("#forma").valid()){
        alert('Neispravan unos.');
        return;
    }
    
    var obj={
        dostavaAdresa:document.querySelector('#dostavaAdresa').value,
        dostavaIme: document.querySelector('#dostavaIme').value,
        dostavaPostanskiBroj: document.querySelector('#dostavaPostanskiBroj').value,
        dostavaTelefon: document.querySelector('#dostavaTelefon').value,
        napomena: document.querySelector('#napomena').value
    };

    var strJson=JSON.stringify(obj);
    var zahtjev=new XMLHttpRequest();
    var myurl='http://onlineshop.wrd.app.fit.ba/api/ispit20190622/Narudzba/Dodaj';
    zahtjev.onload=function(){
        if(zahtjev.status===200){
            alert('Podaci su uspjesno poslani.');
        }else{
            alert("Server javlja gresku: "+zahtjev.statusText);
        }
    }

    zahtjev.onerror = function() {
        alert("Greška u komunikaciji sa serverom.");
    };

    zahtjev.open("POST", myurl, true);
    zahtjev.setRequestHeader('Content-type', 'application/json');
    zahtjev.send(strJson);

    document.querySelector('#dostavaAdresa').value = '';
    document.querySelector('#dostavaIme').value = '';
    document.querySelector('#dostavaPostanskiBroj').value = '';
    document.querySelector('#dostavaTelefon').value = '';
    document.querySelector('#napomena').value = '';

})