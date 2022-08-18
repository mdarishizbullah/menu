<!DOCTYPE HTML>
<html lang="en">
  <head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="author" content="Muhammad Daris Hizbullah, Haizpro">
	<meta name="description" content="Sistem Informasi Menu">
	<meta name="theme-color">
	<link rel="apple-touch-icon" href="./asset/default.png">
	<link href="./asset/default.png" rel="icon">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<title>Menu
	</title>
  </head>
  <body class="container-fluid">
    <div id="loader" class="center"></div>
    <div id="contents">
	  <!--HOME-->
	  <div id="home" style="display: block;">
	  <!--Pencarian-->
      <div class="fixed-top">
	  <div class="container">
        <div class="row mb-0 mt-1 bg-transparent">
          <input type="search" class="form-control" id="inputanKu" onkeyup="mencari()" placeholder="Cari makanan & minuman..."/>
        </div>
	  </div>
	  <div class="container-fluid" id="scrollKategori" style="display: block;">
	  	<div class="scrolling-wrapper row flex-row flex-nowrap mt-1 px-0" id="produkKategori">
        </div>
	  </div>
	  </div>
	  <div id="spaceTambah" style="display: none;">
	  <br>
	  <br>
	  </div>
	  <br>
	  <!--ISI MENU-->
	  <div class="container-fluid mt-2 px-0">
		  <div class="row row-cols-2" id="itemProduk">
		  </div>
	  </div>
	  </div>
	  <!--CART-->
	  <div id="cart" style="display: none;">
			<div class="row">
				<div class="container">
				<div class="col-6 text-muted mt-3">Total</div>
				<input class="col-6 col-md-12 text-end border-0 bg-white" id="total" style="display: none;" disabled>
				<input class="col-6 col-md-12 text-end border-0 bg-white" id="totalC" disabled>
				</div>
			</div>
			<div class="row">
				<div class="container">
				  <select class="form-select mt-2" id="notMakan">
					<option value="makan ditempat">Makan ditempat
					</option>
					<option value="dibawa pulang">Dibawa pulang
					</option>
				  </select>
				 </div>
			</div>
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-3">Meja no</div>
				</div>
				<div class="container col-8">
				  <select class="form-select mt-2" id="notMeja">
				  </select>
				</div>
			</div>
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-0">Jenis Pembayaran</div>
				</div>
				<div class="container col-8">
					  <select class="form-select mt-2" id="notJBayar" onchange="notJBayar()">
						<option value="cash">Cash
						</option>
						<option value="cashless">Cashless
						</option>
					  </select>
				</div>
			</div>
			<div id="notJUang">
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-3">Uang Cash</div>
				</div>
				<div class="container col-8">
					<input class="form-control text-end mt-2" type="number">
				</div>
			</div>
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-3">Kembalian</div>
				</div>
				<div class="container col-8">
					<input class="form-control text-end mt-2 border-0 bg-white" id="kembalian" type="number" disabled>
					<input class="form-control text-end mt-2 border-0 bg-white" id="rawKembalian" type="number" style="display: none;"  disabled>
				</div>
			</div>
			</div>
			<div class="row">
				<input type="number" class="form-control" id="waktuMs"  style="display: none;" disabled>
				<input type="text" class="form-control" id="hasilSemua"  style="display: none;" disabled>
				<input type="text" class="form-control" id="idPelanggan"  style="display: none;" disabled>
			</div>
			<div class="row">
			<div class="container">
				<button class="btn btn-primary mt-2 col-12" onClick="mDataTrans()">Pesan sekarang</button>
			</div>
			</div>
	  </div>
	  <!--DONE-->
	  <div id="done" style="display: none;">
	  </div>
	  <!--PERSON-->
	  <div id="person" style="display: none;">
	  </div>
	    <!--FIXED BOTTOM MENU-->
	  <br>
	  <br>
	  <div class="fixed-bottom">
		<div class="container card">
		  <ul class="nav nav-pills nav-fill">
			<li class="nav-item">
			  <button class="nav-link position-relative rounded-pill active" id="iHome" onClick="pindahHome()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
				  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
				</svg>
			  </button>
			</li>
			<li class="nav-item">
			  <button class="nav-link position-relative rounded-pill" id="iCup" onClick="pindahCup()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-cup" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899l-.866 3.9ZM1.124 4l1.516 6.825A1.5 1.5 0 0 0 4.104 12h5.792a1.5 1.5 0 0 0 1.464-1.175L12.877 4H1.123Z"/>
				</svg>
			  </button>
			</li>
			<li class="nav-item">
			  <button class="nav-link position-relative rounded-pill" id="iFood" onClick="pindahFood()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
				  <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
				  <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
				</svg>
			  </button>
			</li>
			<li class="nav-item">
			  <button type="button" onclick="pindahCart()" id="iCart" class="nav-link position-relative rounded-pill">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
				  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
				</svg>
				<span id="keranjangA" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				  
				</span>
			  </button> 
			</li>
			<li class="nav-item">
			  <button type="button" onclick="pindahDone()" id="iDone" class="nav-link position-relative rounded-pill">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-file-check" viewBox="0 0 16 16">
				  <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
				  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
				</svg>
				<span id="keranjangA" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				  
				</span>
			  </button> 
			</li>
			<li class="nav-item">
			  <button class="nav-link position-relative rounded-pill" id="iPerson" onClick="pindahPerson()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
				  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
				</svg>
			  </button>
			</li>
		  </ul>
		</div>
	  </div>
    </div>
  <script src="js/bootstrap.bundle.min.js" charset="utf-8">
  </script>
  <script src="js/main.js">
  </script>
  </body>
</html>