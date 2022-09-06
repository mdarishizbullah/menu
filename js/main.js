const keranjang = [];
const keranjangA ={};
const keranjangObject =[];
const d = new Date();

function pindahRegister(){
	document.getElementById("untukLogin").style.display='none';
	document.getElementById("untukRegister").style.display='block';
	inputNoPhonSama = setInterval(checkNoPhonSama, 1000);
	matikanSetIntervalNoPhon();
}

function matikanSetIntervalNoPhonSama(){
	if(typeof inputNoPhonSama === "undefined"){
	}else{
		clearInterval(inputNoPhonSama);
	}
}

function checkNoPhonSama(){
let noPonsel = document.getElementById("noPonsel").value;
let xhr = new XMLHttpRequest();
xhr.open('POST','php/checkPelanggan.php',true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onload = function(){
	let noPonsel = document.getElementById("noPonsel").value;
	let a = this.responseText;
	if(a == 1){
		checkNoPonsel();
	}else if(a == 0){
		document.getElementById("verNoPonselPendek").style.display='none';
		document.getElementById("verNoPonselTerdaftar").style.display='block';
		document.getElementById("verNoPonselPanjang").style.display='none';
	}
	document.getElementById("hasilNoHp").setAttribute('value', a);
}
xhr.send("id_pelanggan="+noPonsel);
munculRegister();
//checkNoPonsel();
}

function checkNoPonsel(){
	let noPonsel = document.getElementById("noPonsel").value;
	if(noPonsel<11111111){
		document.getElementById("verNoPonselPendek").style.display='block';
		document.getElementById("verNoPonselTerdaftar").style.display='none';
		document.getElementById("verNoPonselPanjang").style.display='none';
		return false;
	}else if(noPonsel>11111111111111){
		document.getElementById("verNoPonselPendek").style.display='none';
		document.getElementById("verNoPonselTerdaftar").style.display='none';
		document.getElementById("verNoPonselPanjang").style.display='block';
		return false;
	}else if(noPonsel=>11111111&&noPonsel<=11111111111111){
		document.getElementById("verNoPonselPendek").style.display='none';
		document.getElementById("verNoPonselTerdaftar").style.display='none';
		document.getElementById("verNoPonselPanjang").style.display='none';
		return true;
	}
}

/*let carts = {};
const STORAGE_MENU = "STORAGE_MENU";

if (typeof(Storage) !== "undefined") console.log("local storage available");
else console.log("Oops. you data will gone after page reload");

if(cartFromLocal = localStorage.getItem(STORAGE_MENU)) {
  carts = JSON.parse(cartFromLocal)
  for(let key in carts)
  createListStorage(key, carts[key])
}

function syncLocalStorage(activity, item, jumlahCarts = 1) {
	switch(activity) {
		case 'ADD':
		case 'UPDATE':
			carts[item] = jumlahCarts;
			break;
		case 'DELETE':
			delete carts[item]
			break;
		default:
			break;    
	}
	localStorage.setItem(STORAGE_MENU, JSON.stringify(carts))
	return
}

/*const STORAGE_KERANJANG = "STORAGE_KERANJANG";

if(keranjangFromLocal = localStorage.getItem("STORAGE_KERANJANG")) {
  keranjangA = JSON.parse(keranjangFromLocal)
  for(let key in keranjangA)
  createListStorage(key, keranjangA[key])
console.log(keranjangA);
}

function syncLocalStorageKeranjang(activity, item, jumlahKeranjangA = 1) {
	switch(activity) {
		case 'ADD':
		case 'UPDATE':
			keranjangA[item] = jumlahKeranjangA;
			break;
		case 'DELETE':
			delete keranjangA[item]
			break;
		default:
			break;    
	}
	
	console.log(keranjangA);
	localStorage.setItem(STORAGE_KERANJANG, JSON.stringify(keranjangA))
	return
}

function createListKeranjangStorage(text){
	keranjang.push(text);
}*/

/*function createListStorage(text, jumlah){
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/untukLocalStorage.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let newProduk = `
	<div name="hapus">
	<a class="text-start p-1"   onclick="removeItem(this);hapusData(`+response[0].id_product+`)">
	  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
		<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
	  </svg>
	</a>
	<div class="row">
	  <img src="./asset/menu/`+response[0].prd_image+`" class="rounded-3 col-3">
	  <div class="row col-9">
		<div class="row">
		  <input class="col-12 bg-white border-0 text-center" value="`+kapital(response[0].kat_sub)+`" disabled>
		</div>
		<div class="row">
		  <p class="col-12 mb-0 text-center">`+kapital(response[0].prd_nama)+`
		  </p>
		  <input name="idP" class="d-none" value="`+response[0].id_product+`">
		  </input>
	  </div>
	  <div class="row">
		<p class="col-12 small mb-0 text-center" >Rp. `+parseFloat(response[0].prd_harga).toLocaleString('en')+`
		</p>
		<input class="col-12 small d-none" id="harga`+response[0].id_product+`" value="`+response[0].prd_harga+`">
	  </div>
	</div>
	</div>
	<div class="row">
	  <div class="col-4 text-muted mt-2">Quantity
	  </div>
	  <div class="col-8">
		<div class="d-flex align-items-center">
		  <input class="form-control text-center input-items" name="jumlah" id="jumlah`+jumlah+`" type="number" value="`+jumlah+`" onkeyup="menghitung(`+response[0].id_product+`)" onchange="menghitung(`+response[0].id_product+`)">
		</div>
	  </div>
	</div>
	<div class="row">
	  <div class="col-6 text-muted" style="display: none;">Sub Total
	  </div>
	  <input class="col-6 text-end input-items border-0 bg-white mt-1" name="subTotal" id="hasil`+response[0].id_product+`" onload="menghitung(`+response[0].id_product+`)" style="display: none;" disabled>
	</div>
	<div class="row">
	  <div class="col-6 text-muted">Sub Total
	  </div>
	  <input class="col-6 text-end input-items border-0 bg-white mt-1"  id="hasilC`+response[0].id_product+`" disabled>
	</div>
	</div>
	`;
	document.getElementById("isiKeranjang").insertAdjacentHTML('afterbegin', newProduk);
		}
	xhr.send("id_product="+text);
	keranjang.push(text);
	//menghitung(text);
	//keranjang.forEach(mencobaHitung);
}*/

function myTimer() {
	const d = new Date();
  document.getElementById("waktuMs").setAttribute('value', d.getTime());
}

function tambahKeranjang(id_product, prd_nama, prd_harga, prd_image, kat_sub, jumlah_prd) {
	if (keranjang.some(checkId)){
	let jumlah3 = new Number(jumlah_prd);
	let jumlah2 = new Number(document.getElementById("jumlah"+id_product).value);
	let jumlah1 = jumlah2 + jumlah3;
	document.getElementById("jumlahCart").style.display='block'
	document.getElementById("jumlahCart").innerHTML = keranjang.length
	document.getElementById("jumlah"+id_product).setAttribute('value', jumlah1)
	menghitung(id_product);
	kembalian();
	//syncLocalStorage('UPDATE', id_product, jumlah1);
	//localStorage.setItem("storageKeranjang", keranjang)
	}else{
		keranjang.push(id_product);
		createList(id_product, prd_nama, prd_harga, prd_image, kat_sub, jumlah_prd);
		document.getElementById("belumTambah").style.display='none';
		document.getElementById("tampilKeranjang").style.display='block';
		document.getElementById("jumlahCart").style.display='block';
		document.getElementById("jumlahCart").innerHTML = keranjang.length;
		menghitung(id_product);
		kembalian();
		//syncLocalStorage('ADD', id_product);
		//syncLocalStorageKeranjang('ADD', id_product);
	}
	function checkId(x) {
	  return x == id_product;
	}
}

document.onreadystatechange = function() { 
	if (document.readyState !== "complete") { 
		document.querySelector( 
		"body").style.visibility = "hidden"; 
		document.querySelector( 
		"#loader").style.visibility = "visible"; 
	} else { 
		document.querySelector( 
		"#loader").style.display = "none"; 
		document.querySelector( 
		"body").style.visibility = "visible";
		jumlahMeja();
	} 
};

const images = document.querySelectorAll('.js-lazy-image');
const config = {
  // If the image gets within 50px in the Y axis, start the download.
  rootMargin: '50px 0px',
  threshold: 0.01
};

// The observer for the images on the page
let observer = new IntersectionObserver(onIntersection, config);
  images.forEach(image => {
    observer.observe(image);
  });
  
function onIntersection(entries) {
  // Loop through the entries
  entries.forEach(entry => {
    // Are we in viewport?
    if (entry.intersectionRatio > 0) {

      // Stop watching and load the image
      observer.unobserve(entry.target);
      preloadImage(entry.target);
    }
  });
}

function kapital(str){  
	return str.replace (/\w\S*/g, 
    function(txt)
    {  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
}

function matikanUntukIsi(){
	if(typeof untukIsi === "undefined"){
	}else{
		clearInterval(untukIsi);
	}
}

function pindahCart(){
	document.getElementById("iHome").classList.remove("active");
	document.getElementById("iCart").classList.add("active");
	document.getElementById("iCup").classList.remove("active");
	document.getElementById("iFood").classList.remove("active");
	document.getElementById("iDone").classList.remove("active");
	document.getElementById("iPerson").classList.remove("active");
	document.getElementById("home").style.display='none';
	document.getElementById("cart").style.display='block';
	document.getElementById("done").style.display='none';
	document.getElementById("person").style.display='none';
	matikanSetIntervalNoPhonSama();
	matikanSetIntervalNoPhon();
	untukIsi = setInterval(myTimer, 100);
}

function pindahHome(){
	document.getElementById("iHome").classList.add("active");
	document.getElementById("iCart").classList.remove("active");
	document.getElementById("iCup").classList.remove("active");
	document.getElementById("iFood").classList.remove("active");
	document.getElementById("iDone").classList.remove("active");
	document.getElementById("iPerson").classList.remove("active");
	document.getElementById("home").style.display='block';
	document.getElementById("cart").style.display='none';
	document.getElementById("done").style.display='none';
	document.getElementById("person").style.display='none';
	document.getElementById("scrollKategori").style.display='none';
	document.getElementById("spaceTambah").style.display='none';
	isiMenu();
	matikanSetIntervalNoPhon();
	matikanSetIntervalNoPhonSama();
	matikanUntukIsi();
}

function pindahCup(){
	document.getElementById("iHome").classList.remove("active");
	document.getElementById("iCart").classList.remove("active");
	document.getElementById("iCup").classList.add("active");
	document.getElementById("iFood").classList.remove("active");
	document.getElementById("iDone").classList.remove("active");
	document.getElementById("iPerson").classList.remove("active");
	document.getElementById("home").style.display='block';
	document.getElementById("cart").style.display='none';
	document.getElementById("done").style.display='none';
	document.getElementById("person").style.display='none';
	isiCup();
	kategoriCup();
	document.getElementById("scrollKategori").style.display='block';
	document.getElementById("spaceTambah").style.display='block';
	matikanSetIntervalNoPhonSama();
	matikanUntukIsi();
	matikanSetIntervalNoPhon();
}

function pindahFood(){
	document.getElementById("iHome").classList.remove("active");
	document.getElementById("iCart").classList.remove("active");
	document.getElementById("iCup").classList.remove("active");
	document.getElementById("iFood").classList.add("active");
	document.getElementById("iDone").classList.remove("active");
	document.getElementById("iPerson").classList.remove("active");
	document.getElementById("home").style.display='block';
	document.getElementById("cart").style.display='none';
	document.getElementById("done").style.display='none';
	document.getElementById("person").style.display='none';
	document.getElementById("spaceTambah").style.display='block';
	isiFood();
	kategoriFood();
	document.getElementById("scrollKategori").style.display='block';
	document.getElementById("spaceTambah").style.display='block';
	matikanSetIntervalNoPhonSama();
	matikanSetIntervalNoPhon();
	matikanUntukIsi();
}

function pindahDone(){
	document.getElementById("iHome").classList.remove("active");
	document.getElementById("iCart").classList.remove("active");
	document.getElementById("iCup").classList.remove("active");
	document.getElementById("iFood").classList.remove("active");
	document.getElementById("iDone").classList.add("active");
	document.getElementById("iPerson").classList.remove("active");
	document.getElementById("home").style.display='none';
	document.getElementById("cart").style.display='none';
	document.getElementById("done").style.display='block';
	document.getElementById("person").style.display='none';
	matikanSetIntervalNoPhonSama();
	matikanSetIntervalNoPhon();
	matikanUntukIsi();
}

function pindahPerson(){
	document.getElementById("iHome").classList.remove("active");
	document.getElementById("iCart").classList.remove("active");
	document.getElementById("iCup").classList.remove("active");
	document.getElementById("iFood").classList.remove("active");
	document.getElementById("iDone").classList.remove("active");
	document.getElementById("iPerson").classList.add("active");
	document.getElementById("home").style.display='none';
	document.getElementById("cart").style.display='none';
	document.getElementById("done").style.display='none';
	document.getElementById("person").style.display='block';
	matikanSetIntervalNoPhonSama();
	matikanUntukIsi();
	inpRegister = setInterval(inputNoPhoneSama, 1000);
}

function mencari(){
	  // Declare variables
  let input, filter, div, a, section, i, txtValue;
  input = document.getElementById('inputanKu');
  filter = input.value.toUpperCase();
  div = document.getElementById("itemProduk");
  section = div.getElementsByTagName('section');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < section.length; i++) {
    a = section[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      section[i].style.display = "";
    } else {
      section[i].style.display = "none";
    }
  }
}

isiMenu();

function isiMenu(){
	let containerMenu = document.getElementById("itemProduk");
	fetch('php/datamasuk.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<section class="container-fluid col bg-light rounded card mt-1 px-0 p1">
  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top js-lazy-image col-12" alt="Card image cap" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
  <div class="modal" id="myModal`+response[i].id_product+`">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <p class="modal-title mb-0">
            `+kapital(response[i].prd_nama)+`
          </p>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
          </button>
        </div>
        <!-- Modal body -->
        <img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image" alt="Card image cap">
      </div>
    </div>
  </div>
  <div class="container-fluid py-0">
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_text" style="display: block;">
        <b>
          `+kapital(response[i].kat_sub)+`
        </b>
      </p>
    </div>
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_texta">
        <a>
          `+kapital(response[i].prd_nama)+`
        </a>
      </p>
    </div>
    <div class="row">
      <p class="small col-8 px-4 mt-2 mb-1">
        `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
      </p>
      <input id="namaProduk`+response[i].id_product+`" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
      </input>
    <input id="hargaProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_harga+`">
    </input>
  <input id="picProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_image+`">
  </input>
<input id="idProduk`+response[i].id_product+`" class="d-none" value="`+response[i].id_product+`">
</input>
<div class="col-4 text-center mb-1">
  <svg onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
  </svg>
</div>
</div>
</div>
</section>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function isiCup(){
	let containerMenu = document.getElementById("itemProduk");
	fetch('php/dataCup.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<section class="container-fluid col bg-light rounded card mt-1 px-0 p1">
  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top js-lazy-image col-12" alt="Card image cap" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
  <div class="modal" id="myModal`+response[i].id_product+`">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <p class="modal-title mb-0">
            `+kapital(response[i].prd_nama)+`
          </p>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
          </button>
        </div>
        <!-- Modal body -->
        <img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image" alt="Card image cap">
      </div>
    </div>
  </div>
  <div class="container-fluid py-0">
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_text" style="display: block;">
        <b>
          `+kapital(response[i].kat_sub)+`
        </b>
      </p>
    </div>
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_texta">
        <a>
          `+kapital(response[i].prd_nama)+`
        </a>
      </p>
    </div>
    <div class="row">
      <p class="small col-8 px-4 mt-2">
        `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
      </p>
      <input id="namaProduk`+response[i].id_product+`" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
      </input>
    <input id="hargaProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_harga+`">
    </input>
  <input id="picProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_image+`">
  </input>
<input id="idProduk`+response[i].id_product+`" class="d-none" value="`+response[i].id_product+`">
</input>
<div class="col-4 text-center">
  <svg onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
  </svg>
</div>
</div>
</div>
</section>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function isiFood(){
	let containerMenu = document.getElementById("itemProduk");
	fetch('php/dataFood.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<section class="container-fluid col bg-light rounded card mt-1 px-0 p1">
  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top js-lazy-image col-12" alt="Card image cap" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
  <div class="modal" id="myModal`+response[i].id_product+`">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <p class="modal-title mb-0">
            `+kapital(response[i].prd_nama)+`
          </p>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
          </button>
        </div>
        <!-- Modal body -->
        <img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image" alt="Card image cap">
      </div>
    </div>
  </div>
  <div class="container-fluid py-0">
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_text" style="display: block;">
        <b>
          `+kapital(response[i].kat_sub)+`
        </b>
      </p>
    </div>
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_texta">
        <a>
          `+kapital(response[i].prd_nama)+`
        </a>
      </p>
    </div>
    <div class="row">
      <p class="small col-8 px-4 mt-2">
        `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
      </p>
      <input id="namaProduk`+response[i].id_product+`" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
      </input>
    <input id="hargaProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_harga+`">
    </input>
  <input id="picProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_image+`">
  </input>
<input id="idProduk`+response[i].id_product+`" class="d-none" value="`+response[i].id_product+`">
</input>
<div class="col-4 text-center">
  <svg onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
  </svg>
</div>
</div>
</div>
</section>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function kategoriCup(){
	let containerMenu = document.getElementById("produkKategori");
	fetch('php/kategoriCup.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
			<div class="badge bg-secondary text-white text-wrap" style="width: 6rem; margin-left: 1em;" onclick="pushKategori(`+response[i].id_pkategori+`);">
			  `+kapital(response[i].kat_sub)+`
			</div>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function kategoriFood(){
	let containerMenu = document.getElementById("produkKategori");
	fetch('php/kategoriFood.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
			<div class="badge bg-secondary text-white text-wrap" style="width: 6rem; margin-left: 1em;" onclick="pushKategori(`+response[i].id_pkategori+`);">
			  `+kapital(response[i].kat_sub)+`
			</div>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function pushKategori(id_pkategori){
	let containerMenu = document.getElementById("itemProduk");
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/detailKategori.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);let barisData ='';
		for(i = 0; i < response.length; i++){
		barisData += `
<section class="container-fluid col bg-light rounded card mt-1 px-0 p1">
  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top js-lazy-image col-12" alt="Card image cap" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
  <div class="modal" id="myModal`+response[i].id_product+`">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <p class="modal-title mb-0">
            `+kapital(response[i].prd_nama)+`
          </p>
          <button type="button" class="btn-close" data-bs-dismiss="modal">
          </button>
        </div>
        <!-- Modal body -->
        <img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image" alt="Card image cap">
      </div>
    </div>
  </div>
  <div class="container-fluid py-0">
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_text" style="display: block;">
        <b>
          `+kapital(response[i].kat_sub)+`
        </b>
      </p>
    </div>
    <div class="row">
      <p class="col-12 mb-0 text-center" id="new_texta">
        <a>
          `+kapital(response[i].prd_nama)+`
        </a>
      </p>
    </div>
    <div class="row">
      <p class="small col-8 px-4 mt-2">
        `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
      </p>
      <input id="namaProduk`+response[i].id_product+`" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
      </input>
    <input id="hargaProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_harga+`">
    </input>
  <input id="picProduk`+response[i].id_product+`" class="d-none" value="`+response[i].prd_image+`">
  </input>
<input id="idProduk`+response[i].id_product+`" class="d-none" value="`+response[i].id_product+`">
</input>
<div class="col-4 text-center">
  <svg onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
  </svg>
</div>
</div>
</div>
</section>
			`;
		}
		containerMenu.innerHTML = barisData;
		}
	xhr.send("id_pkategori="+id_pkategori);
}

function jumlahMeja(){
	let container = document.getElementById("notMeja");
	fetch('php/jumlahMejaUsaha.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 1; i <= response[0].usaha_jmeja; i++){
			
			barisData += `
			<option value="`+i+`">`+i+`
			</option>
			`;
		}
		container.innerHTML = barisData;
	});
}

function notJBayar(){
	let isi = document.getElementById("notJBayar").value;
	if(isi == 'cash'){
		document.getElementById("notJUang").style.display='block';
	}else{
		document.getElementById("notJUang").style.display='none';
	}
	let a = document.getElementById("total").value;
	document.getElementById("uSiap").setAttribute('value', a);
	kembalian();
}

function createList(id_product, prd_nama, prd_harga, prd_image, kat_sub, jumlah_prd){
	let newProduk = `
	<div class="container-fluid" name="hapus">
	<a class="text-start" onclick="removeItem(this);hapusData(`+id_product+`)">
	  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
		<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
	  </svg>
	</a>
	<div class="row">
	  <img src="./asset/menu/`+prd_image+`" class="rounded mx-auto d-block col-3">
	  <div class="row col-9">
		<div class="row">
		  <input class="col-12 bg-white border-0 text-center" value="`+kapital(kat_sub)+`" disabled>
		</div>
		<div class="row">
		  <p class="col-12 mb-0 text-center">`+kapital(prd_nama)+`
		  </p>
		  <input name="idP" class="d-none" value="`+id_product+`">
		  </input>
	  </div>
	  <div class="row">
		<p class="col-12 small mb-0 text-center" >Rp. `+parseFloat(prd_harga).toLocaleString('en')+`
		</p>
		<input class="col-12 small d-none" id="harga`+id_product+`" value="`+prd_harga+`">
	  </div>
	</div>
	</div>
	<div class="row">
	  <div class="col-4 text-muted mt-2">Quantity
	  </div>
	  <div class="col-8">
		<div class="d-flex align-items-center">
		  <input class="form-control text-center input-items" name="jumlah" id="jumlah`+id_product+`" type="number" value="`+jumlah_prd+`" onkeyup="menghitung(`+id_product+`)" onchange="menghitung(`+id_product+`)">
		</div>
	  </div>
	</div>
	<div class="row">
	  <div class="col-6 text-muted" style="display: none;">Sub Total
	  </div>
	  <input class="col-6 text-end input-items border-0 bg-white mt-1" name="subTotal" id="hasil`+id_product+`" onload="menghitung(`+id_product+`)" style="display: none;" disabled>
	</div>
	<div class="row">
	  <div class="col-6 text-muted">Sub Total
	  </div>
	  <input class="col-6 text-end input-items border-0 bg-white mt-1"  id="hasilC`+id_product+`" disabled>
	</div>
	</div>
	`;
	document.getElementById("isiKeranjang").insertAdjacentHTML('afterbegin', newProduk);
}

function menghitung(id){
	let input = document.getElementById('jumlah'+id).value;
	let harga = document.getElementById('harga'+id).value;
	let hasil = input * harga;
	let hasilBox = document.getElementById("hasil"+id);
	let hasilBoxC = document.getElementById("hasilC"+id);
	hasilBox.setAttribute('value', hasil);
	hasilBoxC.setAttribute('value', ("Rp. ")+parseFloat(hasil).toLocaleString('en'));
	keranjang.forEach(mencobaHitung);
	kembalian();
	let angkaInput = Number(input);
	//syncLocalStorage('UPDATE', id, angkaInput);
}

function mencobaHitung(index, item){
	let bokKeranjang = document.getElementsByName('subTotal');
	let totalSemua =0;
	for (index = 0; index < keranjang.length; index++) {
	let haBK = new Number(bokKeranjang[index].value);
	let a = totalSemua += haBK;
	document.getElementById("total").setAttribute('value', totalSemua);
	document.getElementById("totalC").setAttribute('value', ("Rp. ")+parseFloat(totalSemua).toLocaleString('en'));
	}
}

function removeItem(el) {
	el.parentElement.remove();
}

function hapusData(id_product) {
	let index = keranjang.indexOf(id_product);
	keranjang.shift(index);
	mencobaHitung();
	kembalian();
	document.getElementById("jumlahCart").innerHTML = keranjang.length;
	if (keranjang.length == 0){
		document.getElementById("tampilKeranjang").style.display='none';
		document.getElementById("belumTambah").style.display='block';
		document.getElementById("jumlahCart").style.display='none';
		document.getElementById("total").setAttribute('value', 0);
		kembalian();
	}
	//syncLocalStorage('DELETE', id_product);
	//syncLocalStorageKeranjang('DELETE', id_product);
}

function kembalian(){
	let c = document.getElementById("total").value;
	let b = document.getElementById("uSiap").value;
	let a = b - c;
	document.getElementById("rawKembalian").setAttribute('value', a);
	document.getElementById("kembalian").setAttribute('value', ("Rp. ")+parseFloat(a).toLocaleString('en'));
}

function checkUangCash(){
	let a = document.getElementById("uSiap").value;
	let b = document.getElementById("total").value;
	if( b > a){
		document.getElementById("uSiap").setAttribute('value', b);
	}
}

function pesanSekarang(){
	checkUangCash();
	let boxJumlah = document.getElementsByName('jumlah');
	let idP = document.getElementsByName('idP');
	let text = "";
	for(i = 0; i<keranjang.length;i++){
	let hD = text += "&idProduk"+i+"="+(idP[i].value)+"&jumlahProduk"+i+"="+(boxJumlah[i].value);
	 let hasilSemua = document.getElementById("hasilSemua");
		hasilSemua.setAttribute('value', hD);
	}
	let meja = document.getElementById("notMeja").value;
	let uCash = document.getElementById("uSiap").value;
	let jPembayaran = document.getElementById("notJBayar").value;
	let notWaktu = d.toDateString()+" "+d.toLocaleTimeString();
	let idPelanggan = document.getElementById("idPelanggan").value;
	let notMakan = document.getElementById("notMakan").value;
	let totalNota = document.getElementById("total").value;
	let hasilData = document.getElementById("hasilSemua").value;
	let idSesuai = document.getElementById("waktuMs").value;
	let isiCatatan = document.getElementById("exampleFormControlTextarea1").value;
	let lengKer = keranjang.length;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/pesanSekarang.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		}
	xhr.send("id="+idSesuai+"&meja="+meja+hasilData+"&lengKer="+lengKer+"&totalNota="+totalNota+"&notMakan="+notMakan+"&idPelanggan="+idPelanggan+"&notWaktu="+notWaktu+"&uCash="+uCash+"&jPembayaran="+jPembayaran+"&catatan="+isiCatatan);
	setelahPesan();
	pindahDone(idSesuai, notWaktu, totalNota);
	alert("Terimaksih sudah memesan di Cafe Kita. no pemesanan : "+idSesuai+", Harap untuk tidak berpindah meja petugas kami akan mendatangi meja :"+meja);
	document.getElementById("total").setAttribute('value', 0);
	document.getElementById("uSiap").setAttribute('value', 0);
	document.getElementById("totalC").setAttribute('value', ("Rp. ")+parseFloat(0).toLocaleString('en'));
	document.getElementById("fixedTopHistori").style.display='block';
	document.getElementById("belumPesan").style.display='none';
	let newHistoriPemesanan =`
			<div class="container-fluid card mb-2">
			<div class="row">
				<div class="col-4 text-center text-muted mt-3">`+idSesuai+`</div>
				<div class="col-4 text-center text-muted">`+notWaktu+`</div>
				<div class="col-4 text-center text-muted mt-3">`+("Rp. ")+parseFloat(totalNota).toLocaleString('en')+`</div>
			</div>
			<div class="row" id="tombolDetailPesanan`+idSesuai+`" style="display: block;">
			<button class="btn btn-primary" onClick="detailPesanan(`+idSesuai+`)">Detail Pesanan</button>
			</div>
			<div class="container-fluid" id="isiNota`+idSesuai+`" style="display: none;">
			</div>
			<div class="row" id="tombolCloseDetailPesanan`+idSesuai+`" style="display: none;">
			<button class="btn btn-secondary" onClick="closeDetailPesanan(`+idSesuai+`)">Tutup Detail Pesanan</button>
			</div>
			</div>
	`;
	document.getElementById("sebelumNota").insertAdjacentHTML('afterbegin', newHistoriPemesanan);
}

function setelahPesan(idSesuai, notWaktu, totalNota){
	let kDLebih = keranjang.length;
	let ele = document.getElementsByName("hapus");
	let len = ele.length;
	parentNode = ele[0].parentNode;
	for(b = 0; b<len;b++){
		parentNode.removeChild(ele[0]);
	}
	keranjang.splice(0, kDLebih);
	mencobaHitung();
	kembalian();
	document.getElementById("jumlahCart").innerHTML = keranjang.length;
	if (keranjang.length == 0){
		document.getElementById("jumlahCart").style.display='none';
		document.getElementById("total").setAttribute('value', 0);
		kembalian();
	}
}

function detailPesanan(idSesuai){
	document.getElementById("tombolDetailPesanan"+idSesuai).style.display='none';
	document.getElementById("tombolCloseDetailPesanan"+idSesuai).style.display='block';
	document.getElementById("isiNota"+idSesuai).style.display='block';
	let containerNota = document.getElementById("isiNota"+idSesuai);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/detailNota.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let statusPesanan = response[0].not_ver;
		if (statusPesanan == 1){
			statusPesanan = "Menunggu petugas datang";
		}else if(statusPesanan == 2){
			statusPesanan = "Lunas";
		}else if(statusPesanan == 3){
			statusPesanan = "Canceled";
		}
		let headerDetailNota =`
 <div class="row">
    <p class="mt-0 mb-0">`+kapital(response[0].not_tmakan)+`
    </p> 
  </div>
  <div class="row">
    <p class="mt-0 mb-0">Nomor Meja: `+response[0].not_meja+`
    </p>
  </div>
		`;
		let barisData ='';
		for(i = 0; i < response.length; i++){
		barisData += `
<div class="row">
	<p class="mt-0 mb-0">`+kapital(response[i].prd_nama)+`</p>
</div>
<div class="row">
	<p class="mt-0 mb-0 col-8">`+response[i].trs_quantity+` x `+parseFloat(response[i].prd_harga).toLocaleString('en')+`</p>
	<p class="text-end mt-0 mb-0 col-4">`+parseFloat(response[i].trs_quantity*response[i].prd_harga).toLocaleString('en')+`</p>
</div>
		`
		};
		let footerDetailNota =`
<div class="row">
	<p class="text-end mt-3 mb-0">Total : `+parseFloat(response[0].not_total).toLocaleString('en')+`</p>
</div>
<div class="row">
	<p class="text-end mt-0 mb-0">Bayar Tunai : `+parseFloat(response[0].not_uCash).toLocaleString('en')+`</p>
</div>
<div class="row">
	<p class="text-end mt-0 mb-2">Kembali : `+parseFloat(response[0].not_uCash-response[0].not_total).toLocaleString('en')+`</p>
</div>
<div class="row">
	<p class="text-start mt-0 mb-1">Metode Pembayaran : `+kapital(response[0].not_jPembayaran)+`</p>
</div>
<div class="row">
	<p class="text-start mt-0 mb-1">Status Pesanan : `+statusPesanan+`</p>
</div>
<div class="row">
	<p class="text-start mt-0 mb-0">Catatan :</p>
</div>
<div class="row mb-2">
	<p class="text-start mt-0 mb-0">`+response[0].not_catatan+`</p>
</div>
		`;
		containerNota.innerHTML = headerDetailNota + barisData + footerDetailNota;
		}
	xhr.send("id_nota="+idSesuai);
}


function closeDetailPesanan(idSesuai){
	document.getElementById("tombolDetailPesanan"+idSesuai).style.display='block';
	document.getElementById("tombolCloseDetailPesanan"+idSesuai).style.display='none';
	document.getElementById("isiNota"+idSesuai).style.display='none';
}

function pindahLogin(){
	document.getElementById("untukLogin").style.display='block';
	document.getElementById("untukRegister").style.display='none';
	matikanSetIntervalNoPhonSama();
	inpRegister = setInterval(inputNoPhoneSama, 1000);
}

function matikanSetIntervalNoPhon(){
	if(typeof inpRegister === "undefined"){
	}else{
		clearInterval(inpRegister);
	}
}

function inputNoPhoneSama(){
let noPonsel = document.getElementById("phoneNumber").value;
let xhr = new XMLHttpRequest();
xhr.open('POST','php/checkPelanggan.php',true);
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.onload = function(){
	let a = this.responseText;
	if(a == 1){
		document.getElementById("verNoSesuai").style.display='none';
		document.getElementById("verNobelumDaftar").style.display='block';
		document.getElementById("submitUntukLogin").style.display='none';
	}else if(a == 0){
		document.getElementById("submitUntukLogin").style.display='block';
		document.getElementById("verNoSesuai").style.display='block';
		document.getElementById("verNobelumDaftar").style.display='none';
	}
	document.getElementById("hasilNoHpLogin").setAttribute('value', a);
}
xhr.send("id_pelanggan="+noPonsel);
}

function checkKonPas(){
	if(document.getElementById("password1").value == document.getElementById("password2").value && document.getElementById("password2").value !==""){
		document.getElementById("verPasswordSalah").style.display='none';
		document.getElementById("verPasswordBenar").style.display='block';
		document.getElementById("verPasswordKosong").style.display='none';
		return true;
	}else if(document.getElementById("password2").value ==""){
		document.getElementById("verPasswordSalah").style.display='none';
		document.getElementById("verPasswordBenar").style.display='none';
		document.getElementById("verPasswordKosong").style.display='block';
		return false;
	}else{
		document.getElementById("verPasswordSalah").style.display='block';
		document.getElementById("verPasswordBenar").style.display='none';
		document.getElementById("verPasswordKosong").style.display='none';
		return false;
	}
}

function checkNama(){
	if(document.getElementById("namaDaftar").value == ""){
		document.getElementById("checkNama").style.display='block';
		return false;
	}else{
		document.getElementById("checkNama").style.display='none';
		return true;
	}
}

function munculRegister(){
	if(checkKonPas() == true && checkNoPonsel() == true && checkNama() == true && document.getElementById("hasilNoHp").value == 1){
		document.getElementById("buttonRegister").style.display='block';
	}else{
		document.getElementById("buttonRegister").style.display='none';
	}
}

function daftarNoPonsel(){
	//checkNoPhonSama();
	let nama = document.getElementById("namaDaftar").value;
	let b = document.getElementById("hasilNoHp").value;
	if(checkKonPas() == true && checkNoPonsel() == true && checkNama() == true && b == 1){
	let noPonsel = document.getElementById("noPonsel").value;
	let pass = document.getElementById("password1").value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/daftarPelanggan.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("sudahDaftar").innerHTML = this.responseText;
		}
	xhr.send("id_pelanggan="+noPonsel+"&plg_password="+pass+"&plg_nama="+nama);
	pindahLogin();
	}else{
		pindahRegister();
	}
}

function passwordSalah(){
	document.getElementById("passwordLoginSalah").style.display='none';
}