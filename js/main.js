const keranjang = [];

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
			  <section class="col bg-light rounded card mt-1 px-0">
			  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top rounded js-lazy-image" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
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
					<img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image">
				  </div>
				</div>
			  </div>
			  <div class="py-0">
				<p class="mb-0 text-center" id="new_text" style="display: block;">
				  <b>
					`+kapital(response[i].kat_sub)+`
				  </b>
				</p>
				<p class="mb-0 text-center" id="new_texta">
				  <a>
					`+kapital(response[i].prd_nama)+`
				  </a>
				</p>
				<div class="container-fluid justify-content-center">
				  <div class="row">
					<p class="small col-8 px-4 mt-2">
					  `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
					</p>
					<input id="namaProduk" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
					</input>
				  <input id="hargaProduk" class="d-none" value="`+response[i].prd_harga+`">
				  </input>
				<input id="picProduk" class="d-none" value="`+response[i].prd_image+`">
				</input>
			  <input id="idProduk" class="d-none" value="`+response[i].id_product+`">
			  </input>
			  <div class="col-1">
			  </div>
			<button type="button" class="btn btn-outline-none col-1 mt-0" onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)">
			  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
				<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
			  </svg>
			</button>
			<div class="col-2">
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

function isiCup(){
	let containerMenu = document.getElementById("itemProduk");
	fetch('php/dataCup.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
			  <section class="col bg-light rounded card mt-1 px-0">
			  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top rounded js-lazy-image" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
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
					<img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image">
				  </div>
				</div>
			  </div>
			  <div class="py-0">
				<p class="mb-0 text-center" id="new_text" style="display: block;">
				  <b>
					`+kapital(response[i].kat_sub)+`
				  </b>
				</p>
				<p class="mb-0 text-center" id="new_texta">
				  <a>
					`+kapital(response[i].prd_nama)+`
				  </a>
				</p>
				<div class="container-fluid justify-content-center">
				  <div class="row">
					<p class="small col-8 px-4 mt-2">
					  `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
					</p>
					<input id="namaProduk" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
					</input>
				  <input id="hargaProduk" class="d-none" value="`+response[i].prd_harga+`">
				  </input>
				<input id="picProduk" class="d-none" value="`+response[i].prd_image+`">
				</input>
			  <input id="idProduk" class="d-none" value="`+response[i].id_product+`">
			  </input>
			  <div class="col-1">
			  </div>
			<button type="button" class="btn btn-outline-none col-1 mt-0" onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)">
			  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
				<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
			  </svg>
			</button>
			<div class="col-2">
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

function isiFood(){
	let containerMenu = document.getElementById("itemProduk");
	fetch('php/dataFood.php').then(response => response.json()).then(response => {
		let barisData ='';
		for(i = 0; i < response.length; i++){
			
			barisData += `
			  <section class="col bg-light rounded card mt-1 px-0">
			  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top rounded js-lazy-image" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
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
					<img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image">
				  </div>
				</div>
			  </div>
			  <div class="py-0">
				<p class="mb-0 text-center" id="new_text" style="display: block;">
				  <b>
					`+kapital(response[i].kat_sub)+`
				  </b>
				</p>
				<p class="mb-0 text-center" id="new_texta">
				  <a>
					`+kapital(response[i].prd_nama)+`
				  </a>
				</p>
				<div class="container-fluid justify-content-center">
				  <div class="row">
					<p class="small col-8 px-4 mt-2">
					  `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
					</p>
					<input id="namaProduk" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
					</input>
				  <input id="hargaProduk" class="d-none" value="`+response[i].prd_harga+`">
				  </input>
				<input id="picProduk" class="d-none" value="`+response[i].prd_image+`">
				</input>
			  <input id="idProduk" class="d-none" value="`+response[i].id_product+`">
			  </input>
			  <div class="col-1">
			  </div>
			<button type="button" class="btn btn-outline-none col-1 mt-0" onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)">
			  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
				<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
			  </svg>
			</button>
			<div class="col-2">
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
			  <section class="col bg-light rounded card mt-1 px-0">
			  <img src="./asset/menu/`+response[i].prd_image+`" class="card-img-top rounded js-lazy-image" data-bs-toggle="modal" data-bs-target="#myModal`+response[i].id_product+`">
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
					<img src="./asset/menu/`+response[i].prd_image+`" class="mt-0 js-lazy-image">
				  </div>
				</div>
			  </div>
			  <div class="py-0">
				<p class="mb-0 text-center" id="new_text" style="display: block;">
				  <b>
					`+kapital(response[i].kat_sub)+`
				  </b>
				</p>
				<p class="mb-0 text-center" id="new_texta">
				  <a>
					`+kapital(response[i].prd_nama)+`
				  </a>
				</p>
				<div class="container-fluid justify-content-center">
				  <div class="row">
					<p class="small col-8 px-4 mt-2">
					  `+parseFloat(response[i].prd_harga).toLocaleString('en')+`
					</p>
					<input id="namaProduk" class="border-0 bg-transparent text-center" value="`+response[i].prd_nama+`" disabled style="display: none;">
					</input>
				  <input id="hargaProduk" class="d-none" value="`+response[i].prd_harga+`">
				  </input>
				<input id="picProduk" class="d-none" value="`+response[i].prd_image+`">
				</input>
			  <input id="idProduk" class="d-none" value="`+response[i].id_product+`">
			  </input>
			  <div class="col-1">
			  </div>
			<button type="button" class="btn btn-outline-none col-1 mt-0" onClick="tambahKeranjang(`+response[i].id_product+`, '`+response[i].prd_nama+`', '`+response[i].prd_harga+`', '`+response[i].prd_image+`','`+response[i].kat_sub+`', 1)">
			  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
				<path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
			  </svg>
			</button>
			<div class="col-2">
			</div>
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
}

function tambahKeranjang(id_product, prd_nama, prd_harga, prd_image, kat_sub, jumlah_prd){
	keranjang.push({
		id : id_product,
		nama : prd_nama,
		harga : prd_harga,
		gambar : prd_image,
		kategori : kat_sub,
		jumlah : jumlah_prd
	});
	function checkId(x) {
	  return x == id_product;
	}
	console.log(keranjang.id.some(checkId));
	console.log(keranjang);
}