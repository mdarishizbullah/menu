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
		startPelanggan();
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

function kapital(str){  
	return str.replace (/\w\S*/g, 
    function(txt)
    {  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); } );
}

function startPelanggan(){
	pindahPerson();
	hitungKeranjang();
	hitungDone();
	isiPerson();
}

function myTimer() {
	const d = new Date();
  document.getElementById("waktuMs").setAttribute('value', d.getTime());
}

function matikanUntukIsi(){
	if(typeof untukIsi === "undefined"){
	}else{
		clearInterval(untukIsi);
	}
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
	matikanUntukIsi();
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
	untukIsi = setInterval(myTimer, 100);
	isiCart();
	mencobaHitung();
	jumlahMeja();
	
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
	matikanUntukIsi();
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
	matikanUntukIsi();
	isiDone();
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
	matikanUntukIsi();
}

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
<div class="col-4 text-center mb-1">
  <svg onClick="tambahKeranjang(`+response[i].id_product+`)" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
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

function tambahKeranjang(id_product){
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/tambahCartDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
}
xhr.send("id_produk="+id_product);
hitungKeranjang();
}

function hitungKeranjang(){
	let xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
	response = this.responseText;
    if(response == 0){
			document.getElementById("jumlahCart").style.display='none';
			document.getElementById("perhitunganPesan").style.display='none';
			document.getElementById("belumKeranjang").style.display='block';
		}else if(response > 0){
			document.getElementById("perhitunganPesan").style.display='block';
			document.getElementById("belumKeranjang").style.display='none';
			document.getElementById("jumlahCart").style.display='block';
			document.getElementById("jumlahCart").innerHTML = response;
		}
	}
  xhttp.open("GET", "php/jumlahCartDirektur.php", true);
  xhttp.send();
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

function isiCart(){
	let container = document.getElementById("isiKeranjang");
	fetch('php/detailCartDirektur.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<div class="container-fluid" name="hapus">
	<div class="row">
	<a class="text-start"   onclick="hapusData(`+response[i].id_produk+`)">
	  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
		<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
	  </svg>
	</a>
	</div>
	<div class="row">
	  <img src="./asset/menu/`+response[i].prd_image+`" class="rounded mx-auto d-block col-3">
	  <div class="row col-9">
		<div class="row">
		  <input class="col-12 bg-white border-0 text-center" value="`+kapital(response[i].kat_sub)+`" disabled>
		</div>
		<div class="row">
		  <p class="col-12 mb-0 text-center">`+kapital(response[i].prd_nama)+`
		  </p>
		  <input name="idP" class="d-none" value="`+response[i].id_produk+`">
		  </input>
	  </div>
	  <div class="row">
		<p class="col-12 small mb-0 text-end" >Rp. `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
		</p>
		<input class="text-end col-12 small d-none" id="harga`+response[i].id_produk+`" value="`+response[i].prd_harga+`">
	  </div>
	</div>
	</div>
	<div class="row">
	  <div class="col-4 text-muted mt-2">Quantity
	  </div>
	  <div class="col-8">
		<div class="align-items-center">
		  <input class="form-control text-center input-items" name="jumlah" id="jumlah`+response[i].id_produk+`" type="number" value="`+response[i].cart_jumlah+`" onchange="merubah(`+response[i].id_produk+`)">
		</div>
	  </div>
	</div>
	<div class="row">
	  <div class="col-6 text-muted" style="display: none;">Sub Total
	  </div>
	  <input class="col-6 text-end input-items border-0 bg-white mt-1" name="subTotal" id="hasil`+response[i].id_produk+`" value="`+response[i].cart_jumlah*response[i].prd_harga+`" style="display: none;" disabled>
	</div>
	<div class="row">
	  <div class="col-6 text-muted">Sub Total
	  </div>
	  <input class="col-6 text-end input-items border-0 bg-white mt-0" id="hasila`+response[i].id_produk+`" value="Rp. `+parseFloat(response[i].cart_jumlah*response[i].prd_harga).toLocaleString('en')+`" style="display: block;" disabled>
	</div>
</div>
			`;
		}
		container.innerHTML = barisData;
	});
}

function hapusData(id_produk){
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/hapusCartDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
	}
	xhr.send("id_produk="+id_produk);
	hitungKeranjang();
	isiCart();
	mencobaHitung();
}

function merubah(id_produk){
	let cart_jumlah = document.getElementById("jumlah"+id_produk).value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/merubahCartDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
	}
	xhr.send("id_produk="+id_produk+"&cart_jumlah="+cart_jumlah);
	isiCart();
	mencobaHitung();
}

function mencobaHitung(){
	let bokKeranjang = document.getElementsByName('subTotal');
	let totalSemua = 0;
	fetch('php/detailCartDirektur.php').then(response => response.json()).then(response => {
	for (i = 0; i < response.length; i++) {
	let haBK = new Number(bokKeranjang[i].value);
	let a = totalSemua += haBK;
	document.getElementById("total").setAttribute('value', totalSemua);
	document.getElementById("totalC").setAttribute('value', ("Rp. ")+parseFloat(totalSemua).toLocaleString('en'));
	}
	document.getElementById("lengKer").setAttribute('value', response.length);
	});
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

const d = new Date();

function pesanSekarang(){
	checkUangCash();
	let boxJumlah = document.getElementsByName('jumlah');
	let idP = document.getElementsByName('idP');
	let lengKer = document.getElementById("lengKer").value;
	let text = "";
	for(i = 0; i<lengKer;i++){
	let hD = text += "&idProduk"+i+"="+(idP[i].value)+"&jumlahProduk"+i+"="+(boxJumlah[i].value);
	 let hasilSemua = document.getElementById("hasilSemua");
		hasilSemua.setAttribute('value', hD);
	}
	let meja = document.getElementById("notMeja").value;
	let uCash = document.getElementById("uSiap").value;
	let jPembayaran = document.getElementById("notJBayar").value;
	let notWaktu = d.toDateString()+" "+d.toLocaleTimeString();
	let notMakan = document.getElementById("notMakan").value;
	let totalNota = document.getElementById("total").value;
	let hasilData = document.getElementById("hasilSemua").value;
	let idSesuai = document.getElementById("waktuMs").value;
	let isiCatatan = document.getElementById("exampleFormControlTextarea1").value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/pesanSekarangCartDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		}
	xhr.send("id="+idSesuai+"&meja="+meja+hasilData+"&lengKer="+lengKer+"&totalNota="+totalNota+"&notMakan="+notMakan+"&notWaktu="+notWaktu+"&uCash="+uCash+"&jPembayaran="+jPembayaran+"&catatan="+isiCatatan);
	alert("Terimaksih sudah memesan di Cafe Kita. no pemesanan : "+idSesuai+", Harap untuk tidak berpindah meja petugas kami akan mendatangi meja :"+meja);
	deleteAllCart();
	hitungDone();
	pindahDone();
	hitungKeranjang();
}

function deleteAllCart(){
	let xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
	}
  xhttp.open("GET", "php/hapusAllCartDirektur.php", true);
  xhttp.send();
}

function hitungDone(){
	let xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
	response = this.responseText;
    if(response == 0){
			document.getElementById("jumlahDone").style.display='none';
			document.getElementById("fixedTopHistori").style.display='none';
			document.getElementById("belumPesan").style.display='block';
		}else if(response > 0){
			document.getElementById("fixedTopHistori").style.display='block';
			document.getElementById("belumPesan").style.display='none';
			document.getElementById("jumlahDone").style.display='block';
			document.getElementById("jumlahDone").innerHTML = response;
		}
	}
  xhttp.open("GET", "php/jumlahHistoryDirektur.php", true);
  xhttp.send();
}

function isiDone(){
	let container = document.getElementById("sebelumNota");
	fetch('php/detailDoneDirektur.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
			<div class="container-fluid card mb-2">
			<div class="row">
				<div class="col-4 text-center text-muted mt-3">`+response[i].id_nota+`</div>
				<div class="col-4 text-center text-muted">`+response[i].not_waktu+`</div>
				<div class="col-4 text-center text-muted mt-3">`+("Rp. ")+parseFloat(response[i].not_total).toLocaleString('en')+`</div>
			</div>
			<div class="row" id="tombolDetailPesanan`+response[i].id_nota+`" style="display: block;">
			<button class="btn btn-primary" onClick="detailPesanan(`+response[i].id_nota+`)">Detail Pesanan</button>
			</div>
			<div class="container-fluid" id="isiNota`+response[i].id_nota+`" style="display: none;">
			</div>
			<div class="row" id="tombolCloseDetailPesanan`+response[i].id_nota+`" style="display: none;">
			<button class="btn btn-secondary" onClick="closeDetailPesanan(`+response[i].id_nota+`)">Tutup Detail Pesanan</button>
			</div>
			</div>
			`;
		}
		container.innerHTML = barisData;
	});
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
			statusPesanan = "Menunggu Petugas Datang";
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

function isiPerson(){
	let container = document.getElementById("namaUser");
	fetch('php/detailPersonDirektur.php').then(response => response.json()).then(response => {
		container.innerHTML = response[0].plg_nama;
	});
}


function mulaiBekerja(){
	document.getElementById("linkHome").style.display='none';
	document.getElementById("linkCup").style.display='none';
	document.getElementById("linkFood").style.display='none';
	document.getElementById("linkCart").style.display='none';
	document.getElementById("linkDone").style.display='none';
	document.getElementById("linkPerson").style.display='none';
	document.getElementById("person").style.display='none';
	document.getElementById("linkPendapatan").style.display='block';
	document.getElementById("linkPengeluaran").style.display='block';
	document.getElementById("linkLaporan").style.display='block';
	//untuk loop diarea kerjaan
	document.getElementById("iPendapatan").classList.add("active");
	document.getElementById("iPengeluaran").classList.remove("active");
	document.getElementById("iLaporan").classList.remove("active");
	document.getElementById("pendapatan").style.display='block';
	document.getElementById("pengeluaran").style.display='none';
	document.getElementById("laporan").style.display='none';
}

function pindahPendapatan(){
	mulaiBekerja();
}

function pindahPengeluaran(){
	document.getElementById("iPendapatan").classList.remove("active");
	document.getElementById("iPengeluaran").classList.add("active");
	document.getElementById("iLaporan").classList.remove("active");
	document.getElementById("pendapatan").style.display='none';
	document.getElementById("pengeluaran").style.display='block';
	document.getElementById("laporan").style.display='none';
}

function pindahLaporan(){
	document.getElementById("iPendapatan").classList.remove("active");
	document.getElementById("iPengeluaran").classList.remove("active");
	document.getElementById("iLaporan").classList.add("active");
	document.getElementById("pendapatan").style.display='none';
	document.getElementById("pengeluaran").style.display='none';
	document.getElementById("laporan").style.display='block';
}

function pindahMenu(){
	document.getElementById("iPendapatan").classList.remove("active");
	document.getElementById("iPengeluaran").classList.remove("active");
	document.getElementById("iLaporan").classList.remove("active");
	document.getElementById("pendapatan").style.display='none';
	document.getElementById("pengeluaran").style.display='none';
	document.getElementById("laporan").style.display='none';
	isiEditMenu();
}

function pindahWorker(){
	document.getElementById("iPendapatan").classList.remove("active");
	document.getElementById("iPengeluaran").classList.remove("active");
	document.getElementById("iLaporan").classList.remove("active");
	document.getElementById("pendapatan").style.display='none';
	document.getElementById("pengeluaran").style.display='none';
	document.getElementById("laporan").style.display='none';
	isiPelanggan();
	isiKaryawan();
}

function isiPendapatan(){
	let tanggalMulai = document.getElementById("tanggalMulai").value;
	let bulanMulai = document.getElementById("bulanMulai").value;
	let tahunMulai = document.getElementById("tahunMulai").value;
	let tanggalAkhir = document.getElementById("tanggalAkhir").value;
	let bulanAkhir = document.getElementById("bulanAkhir").value;
	let tahunAkhir = document.getElementById("tahunAkhir").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let container = document.getElementById("sebelumPendapatan");
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/pendapatanHarianDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let jumlahPendapatan = response.length;
		if(jumlahPendapatan == 0){
			document.getElementById("belumAdaTransaksi").style.display='block';
		}else if(jumlahPendapatan > 0){
			document.getElementById("belumAdaTransaksi").style.display='none';
		}
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
			<div class="container-fluid card mb-2">
			<div class="row">
				<div class="col-4 text-center text-muted mt-3">`+response[i].id_nota+`</div>
				<div class="col-4 text-center text-muted">`+response[i].not_waktu+`</div>
				<div class="col-4 text-center text-muted mt-3">`+("Rp. ")+parseFloat(response[i].not_total).toLocaleString('en')+`</div>
			</div>
			<div class="row" id="tombolDetailPendapatan`+response[i].id_nota+`" style="display: block;">
			<button class="btn btn-primary" onClick="detailPendapatan(`+response[i].id_nota+`)">Detail Pendapatan</button>
			</div>
			<div class="container-fluid" id="isiNotaPendapatan`+response[i].id_nota+`" style="display: none;">
			</div>
			<div class="row" id="tombolCloseDetailPendapatan`+response[i].id_nota+`" style="display: none;">
			<button class="btn btn-secondary" onClick="closeDetailPendapatan(`+response[i].id_nota+`)">Tutup Detail Pendapatan</button>
			</div>
			</div>
			`;
		}
		container.innerHTML = barisData;
	}
  xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
  totalCash();
  totalCashless();
}

function totalCash(){
	let tanggalMulai = document.getElementById("tanggalMulai").value;
	let bulanMulai = document.getElementById("bulanMulai").value;
	let tahunMulai = document.getElementById("tahunMulai").value;
	let tanggalAkhir = document.getElementById("tanggalAkhir").value;
	let bulanAkhir = document.getElementById("bulanAkhir").value;
	let tahunAkhir = document.getElementById("tahunAkhir").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalCashDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("totalCash").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("laporanCash").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("inputCash").setAttribute('value', new Number(this.responseText));
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function totalCashless(){
	let tanggalMulai = document.getElementById("tanggalMulai").value;
	let bulanMulai = document.getElementById("bulanMulai").value;
	let tahunMulai = document.getElementById("tahunMulai").value;
	let tanggalAkhir = document.getElementById("tanggalAkhir").value;
	let bulanAkhir = document.getElementById("bulanAkhir").value;
	let tahunAkhir = document.getElementById("tahunAkhir").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalCashlessDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("totalCashless").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("laporanCashless").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("inputCashless").setAttribute('value',new Number(this.responseText));
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function detailPendapatan(idSesuai){
	document.getElementById("tombolDetailPendapatan"+idSesuai).style.display='none';
	document.getElementById("tombolCloseDetailPendapatan"+idSesuai).style.display='block';
	document.getElementById("isiNotaPendapatan"+idSesuai).style.display='block';
	let containerNota = document.getElementById("isiNotaPendapatan"+idSesuai);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/detailPendapatanDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let statusPesanan = response[0].not_ver;
		if (statusPesanan == 1){
			statusPesanan = "Menunggu Petugas Datang";
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
  <div class="row">
    <p class="mt-0 mb-0">Petugas: `+kapital(response[0].plg_nama)+`
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

function closeDetailPendapatan(idSesuai){
	document.getElementById("tombolDetailPendapatan"+idSesuai).style.display='block';
	document.getElementById("tombolCloseDetailPendapatan"+idSesuai).style.display='none';
	document.getElementById("isiNotaPendapatan"+idSesuai).style.display='none';
}

function isiPengeluaran(){
	let tanggalMulaiPengeluaran = document.getElementById("tanggalMulaiPengeluaran").value;
	let bulanMulaiPengeluaran = document.getElementById("bulanMulaiPengeluaran").value;
	let tahunMulaiPengeluaran = document.getElementById("tahunMulaiPengeluaran").value;
	let tanggalAkhirPengeluaran = document.getElementById("tanggalAkhirPengeluaran").value;
	let bulanAkhirPengeluaran = document.getElementById("bulanAkhirPengeluaran").value;
	let tahunAkhirPengeluaran = document.getElementById("tahunAkhirPengeluaran").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulaiPengeluaran, bulanMulaiPengeluaran, tanggalMulaiPengeluaran);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhirPengeluaran, bulanAkhirPengeluaran, tanggalAkhirPengeluaran);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let container = document.getElementById("sebelumPengeluaran");
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/pengeluaranDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let jumlahPengeluaran = response.length;
		if(jumlahPengeluaran == 0){
			document.getElementById("belumAdaPengeluaran").style.display='block';;
		}else if(jumlahPengeluaran > 0){
			document.getElementById("belumAdaPengeluaran").style.display='none';
		}
		let barisData ='';
		for(i = 0; i < response.length; i++){
			const e = new Date(new Number(response[i].id_pengeluaran))
			
			barisData += `
			<div class="container-fluid card mb-2">
			<div class="row">
				<div class="col-4 text-center text-muted mt-3">`+e.toLocaleTimeString('en-US')+`</div>
				<div class="col-4 text-center text-muted">`+kapital(response[i].plg_nama)+`</div>
				<div class="col-4 text-center text-muted mt-3">`+("Rp. ")+parseFloat(response[i].total_pengeluaran).toLocaleString('en')+`</div>
			</div>
			<div class="row" id="tombolDetailPengeluaran`+response[i].id_pengeluaran+`" style="display: block;">
			<button class="btn btn-primary" onClick="detailPengeluaran(`+response[i].id_pengeluaran+`)">Detail pengeluaran</button>
			</div>
			<div class="container-fluid" id="isiPengeluaran`+response[i].id_pengeluaran+`" style="display: none;">
			</div>
			<div class="row" id="tombolCloseDetailPengeluaran`+response[i].id_pengeluaran+`" style="display: none;">
			<button class="btn btn-secondary" onClick="closeDetailPengeluaran(`+response[i].id_pengeluaran+`)">Tutup Detail pengeluaran/button>
			</div>
			</div>
			`;
		}
		container.innerHTML = barisData;
	}
  xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
  totalPengeluaran();
}

function totalPengeluaran(){
	let tanggalMulaiPengeluaran = document.getElementById("tanggalMulaiPengeluaran").value;
	let bulanMulaiPengeluaran = document.getElementById("bulanMulaiPengeluaran").value;
	let tahunMulaiPengeluaran = document.getElementById("tahunMulaiPengeluaran").value;
	let tanggalAkhirPengeluaran = document.getElementById("tanggalAkhirPengeluaran").value;
	let bulanAkhirPengeluaran = document.getElementById("bulanAkhirPengeluaran").value;
	let tahunAkhirPengeluaran = document.getElementById("tahunAkhirPengeluaran").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulaiPengeluaran, bulanMulaiPengeluaran, tanggalMulaiPengeluaran);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhirPengeluaran, bulanAkhirPengeluaran, tanggalAkhirPengeluaran);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalPengeluaranDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("totalPengeluaran").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("laporanCashless").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("inputCashless").setAttribute('value',new Number(this.responseText));
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function detailPengeluaran(idSesuai){
	document.getElementById("tombolDetailPengeluaran"+idSesuai).style.display='none';
	document.getElementById("tombolCloseDetailPengeluaran"+idSesuai).style.display='block';
	document.getElementById("isiPengeluaran"+idSesuai).style.display='block';
	let containerNota = document.getElementById("isiPengeluaran"+idSesuai);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/detailPengeluaranDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let headerDetailNota =`
  <div class="row">
    <p class="mt-0 mb-0 text-center">`+idSesuai+`
    </p> 
  </div>
  <div class="row">
    <p class="mt-0 mb-0 text-center">`+kapital(response[0].judul_pengeluaran)+`
    </p> 
  </div>
  <div class="row">
    <p class="mt-0 mb-0">Catatan:
    </p>
  </div>
  <div class="row">
    <p class="mt-0 mb-0">`+response[0].catatan_pengeluaran+`
    </p>
  </div>
		`;
		
		containerNota.innerHTML = headerDetailNota;
		}
	xhr.send("id_pengeluaran="+idSesuai);
}

function closeDetailPengeluaran(idSesuai){
	document.getElementById("tombolDetailPengeluaran"+idSesuai).style.display='block';
	document.getElementById("tombolCloseDetailPengeluaran"+idSesuai).style.display='none';
	document.getElementById("isiPengeluaran"+idSesuai).style.display='none';
}

function isiEditMenu(){
	let containerMenu = document.getElementById("editIsiMenu");
	fetch('php/datamasuk.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<section class="container-fluid col bg-light rounded card mt-1 px-0 p1">
  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top js-lazy-image col-12" alt="Card image cap">
  <div class="mb-1">
  <div class="container mt-1">
<div class="container">
  <input class="form-control form-control-sm" id="customFile`+response[i].id_product+`" type="file" accept="image/x-png,image/jpg,image/jpeg" name="image_file" onchange="onSetFilename(`+response[i].id_product+`)"/>
<div class="progress mt-1">
<div id="progressBar`+response[i].id_product+`" class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 0%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<button type="button" onclick="uploadFile(`+response[i].id_product+`);hapusDatabase(`+response[i].id_product+`);updateDatabase(`+response[i].id_product+`)" class="btn btn-warning text-white mt-2">Upload File</button>
</div>
</div>
</div>
  <div class="container">
  <div class="container"><div class="container">
    <div class="row">
      <p class="col-12 mb-0 text-center" style="display: block;">`+kapital(response[i].kat_sub)+`
      </p>
    </div>
    <div class="row">
      <input class="form-control form-control-sm col-12 mb-0 text-center" id="namaRubah`+response[i].id_product+`" onchange="rubahNama(`+response[i].id_product+`)" value="`+response[i].prd_nama+`">
    </div>
    <div class="row">
      <input class="form-control  form-control-sm text-center px-4 mt-2 mb-1" value="`+response[i].prd_harga+`" id="hargaRubah`+response[i].id_product+`" onchange="rubahHarga(`+response[i].id_product+`)">
</div>
<div class="row">
<p class="small mb-0 mt-2 btn btn-danger" data-bs-toggle="modal" data-bs-target="#myModalHapus`+response[i].id_product+`">Hapus</p>
<div class="modal" id="myModalHapus`+response[i].id_product+`">
		<div class="modal-dialog modal-dialog-centered">
		  <div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
			  <p class="modal-title mb-0">
				Apakah anda yakin untuk menghapus
			  </p>
			</div>
			<!-- Modal body -->
			<button class="small mb-0 mt-2 btn btn-danger stretched-link" onclick="hapus(`+response[i].id_product+`)">Hapus</button>
		  </div>
		</div>
	</div>
</div>
</div>
</div>
</section>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function rubahNama(idSesuai){
	let namaBaru = document.getElementById("namaRubah"+idSesuai).value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/rubahNama.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_product="+new Number(idSesuai)+"&prd_nama="+namaBaru);
}

function rubahHarga(idSesuai){
	let hargaBaru = document.getElementById("hargaRubah"+idSesuai).value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/rubahHarga.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_product="+new Number(idSesuai)+"&prd_harga="+hargaBaru);
}

function onSetFilename(idSesuai) {
        let fileName = document.getElementById("customFile"+idSesuai).value.split("\\").pop();
        document.getElementById("progressBar"+idSesuai).style.width="0%";
        document.getElementById("progressBar"+idSesuai).classList.add("bg-success");
    }

function uploadFile(idSesuai) {
	let image_files = document.getElementById('customFile'+idSesuai).files;
	if(image_files.length) {
		let formData = new FormData();
		formData.append('image', image_files[0]);
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'uploadphoto.php', true);
		xhr.addEventListener("progress", function (e) {
			if(e.lengthComputable) {
				let percentComplete = e.loaded / e.total * 100;
				document.getElementById("progressBar"+idSesuai).style.width=percentComplete + '%';
			}
		}, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
					alert(this.responseText);
			}
		};
		xhr.send(formData);
	} else {
		alert("Tidak ada gambar yang dipilih");
	}
}

function hapusDatabase(idSesuai){
	let image_files = document.getElementById('customFile'+idSesuai).files;
	if(image_files.length) {
	let fileName = document.getElementById("customFile"+idSesuai).value;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", 'deletePhoto.php', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_product="+idSesuai);
	}
}

function updateDatabase(idSesuai){
	let image_files = document.getElementById('customFile'+idSesuai).files;
	if(image_files.length) {
	let fileName = document.getElementById("customFile"+idSesuai).value.split("\\").pop();
	let xhr = new XMLHttpRequest();
	xhr.open("POST", 'php/updateDatabase.php', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_product="+idSesuai+"&fileName="+fileName);
	}
}

function isiPelanggan(){
	let containerMenu = document.getElementById("pelanggan");
	fetch('php/pelanggan.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<div class="row text-center mb-0 mt-0">
<div class="container-fluid card mb-1 mt-0 bg-light">
<div class="row">
<div class="fw-semibold">`+kapital(response[i].plg_nama)+`</div>
</div>
<div class="row">
<p class="text-muted">0`+response[i].id_pelanggan+`</p>
</div>
<div class="row">
	<select class="form-select mt-0 text-center" id="rubahJabatan`+response[i].id_pelanggan+`" onchange="rubahJabatan(`+response[i].id_pelanggan+`)">
		<option>Pilih Jabatan</option>
		<option value="2">Kasir</option>
		<option value="3">Manager</option>
		<option value="4">Direktur</option>
		<option value="5">Konten</option>
	 </select>
</div>
</div>
</div>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function isiKaryawan(){
	let containerMenu = document.getElementById("karyawan");
	fetch('php/karyawan.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			if(response[i].plg_jabatan == 2){
				jabatanSaatIni = "Kasir";
			}else if(response[i].plg_jabatan == 3){
				jabatanSaatIni = "Manager";
			}else if(response[i].plg_jabatan == 4){
				jabatanSaatIni = "Direktur";
			}else if(response[i].plg_jabatan == 5){
				jabatanSaatIni = "Konten";
			}
			
			barisData += `
<div class="row text-center mb-0 mt-0">
<div class="container-fluid card mb-1 mt-0 bg-light">
<div class="row">
<div class="fw-bold">`+jabatanSaatIni+`</div>
</div>
<div class="row">
<div class="fw-semibold">`+kapital(response[i].plg_nama)+`</div>
</div>
<div class="row">
<p class="text-muted">0`+response[i].id_pelanggan+`</p>
</div>
<div class="row">
	<select class="form-select mt-0 text-center" id="rubahJabatan`+response[i].id_pelanggan+`" onchange="rubahJabatan(`+response[i].id_pelanggan+`)">
		<option>Pilih Jabatan</option>
		<option value="1">Pelanggan</option>
		<option value="2">Kasir</option>
		<option value="3">Manager</option>
		<option value="4">Direktur</option>
		<option value="5">Konten</option>
	 </select>
</div>
</div>
</div>
			`;
		}
		containerMenu.innerHTML = barisData;
	});
}

function rubahJabatan(idSesuai){
	let jabatanBaru = document.getElementById("rubahJabatan"+idSesuai).value;
	let xhr = new XMLHttpRequest();
	xhr.open("POST", 'php/updatePelanggan.php', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_pelanggan="+idSesuai+"&plg_jabatan="+jabatanBaru);
	pindahWorker();
}

function istirahat(){
	document.getElementById("linkHome").style.display='block';
	document.getElementById("linkCup").style.display='block';
	document.getElementById("linkFood").style.display='block';
	document.getElementById("linkCart").style.display='block';
	document.getElementById("linkDone").style.display='block';
	document.getElementById("linkPerson").style.display='block';
	document.getElementById("linkPendapatan").style.display='none';
	document.getElementById("linkPengeluaran").style.display='none';
	document.getElementById("linkLaporan").style.display='none';
	//untuk loop diarea kerjaan
	document.getElementById("laporan").style.display='none';
	pindahHome();
}

function isiLaporan(){
	totalCashlessLaporan();
	totalCashLaporan();
	totalPengeluaranLaporan();
	isiProdukTerjual();
}

function kalkulasi(){
	totalPendapatan();
}

function totalCashlessLaporan(){
	let tanggalMulai = document.getElementById("tanggalMulaiLaporan").value;
	let bulanMulai = document.getElementById("bulanMulaiLaporan").value;
	let tahunMulai = document.getElementById("tahunMulaiLaporan").value;
	let tanggalAkhir = document.getElementById("tanggalAkhirLaporan").value;
	let bulanAkhir = document.getElementById("bulanAkhirLaporan").value;
	let tahunAkhir = document.getElementById("tahunAkhirLaporan").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalCashlessDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("laporanCashless").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("laporanCashless").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		document.getElementById("inputCashless").setAttribute('value',new Number(JSON.parse(this.responseText)));
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function totalCashLaporan(){
	let tanggalMulai = document.getElementById("tanggalMulaiLaporan").value;
	let bulanMulai = document.getElementById("bulanMulaiLaporan").value;
	let tahunMulai = document.getElementById("tahunMulaiLaporan").value;
	let tanggalAkhir = document.getElementById("tanggalAkhirLaporan").value;
	let bulanAkhir = document.getElementById("bulanAkhirLaporan").value;
	let tahunAkhir = document.getElementById("tahunAkhirLaporan").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalCashDirektur.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("laporanCash").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("laporanCash").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		document.getElementById("inputCash").setAttribute('value',new Number(JSON.parse(this.responseText)));
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function totalPengeluaranLaporan(){
	let tanggalMulai = document.getElementById("tanggalMulaiLaporan").value;
	let bulanMulai = document.getElementById("bulanMulaiLaporan").value;
	let tahunMulai = document.getElementById("tahunMulaiLaporan").value;
	let tanggalAkhir = document.getElementById("tanggalAkhirLaporan").value;
	let bulanAkhir = document.getElementById("bulanAkhirLaporan").value;
	let tahunAkhir = document.getElementById("tahunAkhirLaporan").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalPengeluaranDr.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		document.getElementById("totalPengeluaranLaporan").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		//document.getElementById("laporanCashless").innerHTML = ("Rp. ")+parseFloat(JSON.parse(this.responseText)).toLocaleString('en');
		document.getElementById("tPengeluaranLaporan").setAttribute('value',new Number(JSON.parse(this.responseText)));
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function totalPendapatan(){
	let cash = document.getElementById("inputCash").value;
	let cashless = document.getElementById("inputCashless").value;
	let totalPendapatan = new Number(new Number(cash) + new Number(cashless));
	document.getElementById("totalPendapatan").innerHTML = ("Rp. ")+parseFloat(totalPendapatan).toLocaleString('en');
	document.getElementById("laporanPendapatan").setAttribute('value',new Number(totalPendapatan));
	let pengeluaran = document.getElementById("tPengeluaranLaporan").value;
	let totalKeuntungan = new Number(new Number(totalPendapatan) - new Number(pengeluaran));
	document.getElementById("totalKeuntungan").innerHTML = ("Rp. ")+parseFloat(totalKeuntungan).toLocaleString('en');
}

function isiProdukTerjual(){
	let tanggalMulai = document.getElementById("tanggalMulaiLaporan").value;
	let bulanMulai = document.getElementById("bulanMulaiLaporan").value;
	let tahunMulai = document.getElementById("tahunMulaiLaporan").value;
	let tanggalAkhir = document.getElementById("tanggalAkhirLaporan").value;
	let bulanAkhir = document.getElementById("bulanAkhirLaporan").value;
	let tahunAkhir = document.getElementById("tahunAkhirLaporan").value;
	let bukaBuku = new Date();
	bukaBuku.setFullYear(tahunMulai, bulanMulai, tanggalMulai);
	bukaBuku.setHours(0);
	bukaBuku.setMinutes(0);
	bukaBuku.setSeconds(0);
	let tutupBuku = new Date();
	tutupBuku.setFullYear(tahunAkhir, bulanAkhir, tanggalAkhir);
	tutupBuku.setHours(23);
	tutupBuku.setMinutes(59);
	tutupBuku.setSeconds(59);
	let container = document.getElementById("isiProdukTerjual");
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/totalPenjualanDr.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		let response = JSON.parse(this.responseText);
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
<div class="row">
	<div class="col-4"><div class="text-muted text-center">`+kapital(response[i].prd_nama)+`</div></div>
	<div class="col-4"><div class="text-muted text-center">`+kapital(response[i].kat_sub)+`</div></div>
	<div class="col-4"><div class="text-muted text-center">`+response[i].total+`</div></div>
</div>
<hr>
			`;
		}
		container.innerHTML = barisData;
	}
	xhr.send("tutupbuku="+tutupBuku.getTime()+"&bukabuku="+bukaBuku.getTime());
}

function bukaFormMenuBaru(){
	document.getElementById("formMenu").style.display='block';
	document.getElementById("bukaFormMenuBaru").style.display='none';
	document.getElementById("tutupFormMenuBaru").style.display='block';
	document.getElementById("spasiMenu").style.display='block';
	isiKategori();
}

function tutupFormMenuBaru(){
	document.getElementById("formMenu").style.display='none';
	document.getElementById("bukaFormMenuBaru").style.display='block';
	document.getElementById("tutupFormMenuBaru").style.display='none';
	document.getElementById("spasiMenu").style.display='none';
}

function bukaFormKategoriBaru(){
	document.getElementById("formKategori").style.display='block';
	document.getElementById("bukaFormKategoriBaru").style.display='none';
	document.getElementById("tutupFormKategoriBaru").style.display='block';
	document.getElementById("spasiKategori").style.display='block';
}

function tutupFormKategoriBaru(){
	document.getElementById("formKategori").style.display='none';
	document.getElementById("bukaFormKategoriBaru").style.display='block';
	document.getElementById("tutupFormKategoriBaru").style.display='none';
	document.getElementById("spasiKategori").style.display='none';
}

function tambahKategori(){
	let namaKategori = document.getElementById("namaKategori").value;
	let jenisKategori = document.getElementById("jenisKategori").value;
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/tambahKategori.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("kat_jenis="+jenisKategori+"&kat_sub="+namaKategori);
	tutupFormKategoriBaru();
}

function tambahMenu(){
	let harga = document.getElementById("hargaMenu").value;
	let kategori = document.getElementById("kategoriMenu").value;
	let namaPhoto = document.getElementById("customFileMenu").value.split("\\").pop();;
	let namaProduk = document.getElementById("namaMenu").value;
	let d = new Date();
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/tambahMenu.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_product="+d.getTime()+"&prd_harga="+harga+"&prd_image="+namaPhoto+"&prd_nama="+namaProduk+"&id_pkategori="+kategori);
}

function isiKategori(){
	let container = document.getElementById("kategoriMenu");
	fetch('php/kategori.php').then(response => response.json()).then(response => {
	let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
		<option value="`+response[i].id_pkategori+`">`+kapital(response[i].kat_sub)+`</option>
			`;
		}
		container.innerHTML = barisData;
	});
}

function onSetFilenameMenu() {
        let fileName = document.getElementById("customFileMenu").value.split("\\").pop();
        document.getElementById("progressBarMenu").style.width="0%";
        document.getElementById("progressBarMenu").classList.add("bg-success");
    }

function uploadFileMenu() {
	let image_files = document.getElementById('customFileMenu').files;
	if(image_files.length) {
		let formData = new FormData();
		formData.append('image', image_files[0]);
		let xhr = new XMLHttpRequest();
		xhr.open("POST", 'uploadphoto.php', true);
		xhr.addEventListener("progress", function (e) {
			if(e.lengthComputable) {
				let percentComplete = e.loaded / e.total * 100;
				document.getElementById("progressBarMenu").style.width=percentComplete + '%';
			}
		}, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4 && xhr.status === 200) {
					alert(this.responseText);
			}
		};
		xhr.send(formData);
	} else {
		alert("Tidak ada gambar yang dipilih");
	}
}

function hapus(idSesuai){
	let xhr = new XMLHttpRequest();
	xhr.open('POST','php/hapus.php',true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.onload = function(){
		alert(this.responseText);
	}
	xhr.send("id_product="+idSesuai);
}