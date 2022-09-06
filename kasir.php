<?php
session_start();
if(!isset($_SESSION["ksradm"])){
	header("Location: index.php");
	exit;
}
?>
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
	<link href="css/swiper-bundle.min.css" rel="stylesheet">
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
          <input class="form-control" id="inputanKu" onkeyup="mencari()" placeholder="Cari disini..."/>
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
			<div id="isiKeranjang">
			</div>
			<div id="perhitunganPesan" style="display: none;">
			<div class="row">
				<div class="col-6 text-muted mt-3">Total</div>
				<input class="col-6 col-md-12 text-end border-0 bg-white" id="total" style="display: none;" disabled>
				<input class="col-6 col-md-12 text-end text-dark border-0 bg-white" id="totalC" disabled>
			</div>
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-0">Jenis Pembayaran</div>
				</div>
				<div class="container col-8">
					  <select class="form-select mt-2 text-center" id="notJBayar" onchange="notJBayar()">
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
					<input class="form-control text-end mt-2" type="number" id="uSiap" onkeyup="kembalian()"/>
				</div>
			</div>
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-3">Kembalian</div>
				</div>
				<div class="container col-8">
					<input class="form-control text-end mt-2 border-0 bg-white" id="kembalian" type="text" disabled>
					<input class="form-control text-end mt-2 border-0 bg-white" id="rawKembalian" type="number" style="display: none;"  disabled>
				</div>
			</div>
			</div>
			<div class="row">
				<div class="container col-4">
				</div>
				<div class="container col-8">
				  <select class="form-select mt-2 text-center" id="notMakan">
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
				  <select class="form-select mt-2 text-center" id="notMeja">
				  </select>
				</div>
			</div>
			<div class="row">
				<div class="container col-4">
				  <div class="text-muted mt-3">Catatan</div>
				</div>
				<div class="container col-8">
				</div>
			</div>
			<div class="row">
				<div class="containter col-12">
				<textarea class="form-control" id="exampleFormControlTextarea1" rows="3" maxlength="249"></textarea>
				</div>
			</div>
			<div class="row">
				<input type="number" class="form-control" id="lengKer"  style="display: none;" disabled>
				<input type="number" class="form-control" id="waktuMs"  style="display: none;" disabled>
				<input type="text" class="form-control" id="hasilSemua"  style="display: none;" disabled>
			</div>
			<div class="row">
			<div class="container">
				<button class="btn btn-primary mt-2 col-12" onClick="pesanSekarang()">Pesan Sekarang</button>
			</div>
			</div>
			</div>
			<div class="text-center" id="belumKeranjang" style="display: block;">
				<div class="container">
					<div class="row">
					Upss.. Keranjangmu kosong
					</div>
					<div class="row">
					<p>Masukan beberapa item favoritmu !</p>
					</div>
					<div class="row">
					<button class="btn btn-primary" onclick="pindahHome()">Pilih Menu Favoritmu !</button>
					</div>
				</div>
			</div>
	 </div>
	  <!--DONE-->
	  <div class="container-fluid" id="done" style="display: none;">
			<div class="container-fluid fixed-top bg-white" id="fixedTopHistori" style="display: none;">
			<div class="row">
				<h5 class="col-12 text-center mt-3">Histori Pemesanan</h5>
			</div>
			<div class="row">
				<div class="col-4 text-center text-muted mb-0">Id</div>
				<div class="col-4 text-center text-muted mb-0">Waktu</div>
				<div class="col-4 text-center text-muted mb-0">Total</div>
			</div>
			<hr class="mt-0 mb-0">
			</div>
			<br>
			<br>
			<br>
			<br>
			<div class="text-center" id="belumPesan" style="display: block;">
				<h1>Kamu belum memesan apapun</h1>
				<br>
				<p>Ayo pesan sekarang</p>
				<br>
				<button class="btn btn-primary" onclick="pindahHome()">Pilih Menu Favoritmu !</button>
			</div>
			<div class="container-fluid px-0" id="sebelumNota">
			</div>
	  </div>
	  <!--PERSON-->
	  <div class="container" id="person" style="display: none;">
	  <div class="container">
	  <div class="row">
	  <div class="col-9">
	  </div>
	  <div class="col-3">
	  <p class="small mb-0 mt-2 btn btn-danger" id="tombolLogout" data-bs-toggle="modal" data-bs-target="#myModalLogout">Logout</p>
	  <div class="modal" id="myModalLogout">
		<div class="modal-dialog modal-dialog-centered">
		  <div class="modal-content">
			<!-- Modal Header -->
			<div class="modal-header">
			  <p class="modal-title mb-0">
				`Apakah anda yakin untuk logout
			  </p>
			</div>
			<!-- Modal body -->
			<a class="small mb-0 mt-2 btn btn-danger stretched-link" href="logout.php">Logout</a>
		  </div>
		</div>
	</div>
	  </div>
	  </div>
	  
	  <div class="text-center"style="display: block;">
				<h1 class="mb-3">Tetap semangat dan tebarkan senyummu</h1>
				<br>
				<div class="text-muted" id="namaUser"></div>
				<br>
			</div>
		<div class="row tex-center">
		<div class="container">
	  <button class="small mb-0 mt-2 btn btn-primary" id="tombolBekerja" onclick="mulaiBekerja()">Mulai Bekerja</button>
	  </div>
	  </div>
	  </div>
	  </div>
	  <!--PENDAPATAN-->
	  <div class="container-fluid" id="pendapatan" style="display: none;">
		<div class="container-fluid fixed-top bg-white mt-2" id="fixedTopPendapatan" style="display: none;">
			<div class="row">
				<div class="col-6 text-center text-muted mb-0">Total Cash :</div>
				<div class="col-6 text-center text-muted mb-0" id="totalCash"></div>
			</div>
			<div class="row">
				<div class="col-6 text-center text-muted mb-0">Total Cashless :</div>
				<div class="col-6 text-center text-muted mb-0" id="totalCashless"></div>
			</div>
			<div class="row">
				<div class="col-4 text-center text-muted mb-0">Id</div>
				<div class="col-4 text-center text-muted mb-0">Waktu</div>
				<div class="col-4 text-center text-muted mb-0">Total</div>
			</div>
			<hr class="mt-0 mb-0">
			</div>
			<br>
			<br>
			<br>
			<br>
			<div class="text-center" id="belumAdaTransaksi" style="display: block;">
				<br>
				<br>
				<h1>Hari ini belum ada transaksi apapun</h1>
				<br>
				<br>
			</div>
			<div class="container-fluid px-0" id="sebelumPendapatan">
			</div>
	  </div>
	  <!--JOB-->
	  <div class="container-fluid" id="job" style="display: none;">
	  <div class="container-fluid fixed-top bg-white mt-2" id="fixedTopJob" style="display: none;">
			<div class="row">
				<div class="col-4 text-center text-muted mb-0">Meja</div>
				<div class="col-4 text-center text-muted mb-0">Metode</div>
				<div class="col-4 text-center text-muted mb-0">Kembalian</div>
			</div>
			<hr class="mt-0 mb-0">
			</div>
			<br>
			<br>
			<div class="text-center" id="belumAdaJob" style="display: block;">
				<br>
				<br>
				<h1>Hari ini belum ada pesanan menunggu</h1>
				<br>
				<br>
				<div style="display: none;">
				<audio id="myAudio">
				  <source src="asset/DEPAPEPE-Hi-D.mp3" type="audio/mpeg">
				</audio>
				<input id="updateJob">
				</div>
			</div>
			<div class="container-fluid px-0" id="sebelumJob">
			</div>
	  </div>
	  <!--PENGELUARAN-->
	  <div class="container" id="pengeluaran" style="display: none;">
	  <div class="container-fluid fixed-top bg-white" style="display: block;">
			<div class="row">
			<div class="col-8">
			<input type="number" id="idPengeluaran" style="display: none;" disabled>
			</div>
			<div class="col-4">
				<button class="btn btn-success mt-1 mb-1" id="simpanPengeluaran" onclick="simpanPengeluaran();" style="display: none;">Simpan</button>
			</div>
			</div>
			<div class="container" id="formPengeluaran" style="display: none;">
				<div class="row">
				<input type="text" class="form-control mt-2" id="judulPengeluaran" placeholder="Pengeluaran untuk ..">
				</div>
				<div class="row">
				<input type="number" class="form-control mt-2" id="totalPengeluaran" placeholder="Total pengeluaran (Rp. )">
				</div>
				<div class="row">
				<textarea class="form-control mt-2" rows="3" id="catatanPengeluaran" maxlength="249" placeholder="Tulis catatan disini"></textarea>
				</div>
			</div>
			<div class="container">
			<div class="row" id="buatPengeluaran" style="display: block;">
				<button class="btn btn-primary mt-1 mb-1" onclick="buatPengeluaran();">Pengeluaran Baru</button>
			</div>
			<div class="row" id="tutupFormPengeluaran" style="display: none;">
				<button class="btn btn-secondary mt-1 mb-1" onclick="tutupFormPengeluaran();">Tutup form pengeluaran</button>
			</div>
			</div>
			<div class="container-fluid" id="fixedTopPengeluaran">
			<div class="row">
				<div class="col-4"><div class="text-center text-muted mb-0">Waktu</div></div>
				<div class="col-4"><div class="text-center text-muted mb-0">Oleh</div></div>
				<div class="col-4"><div class="text-center text-muted mb-0">Jumlah</div></div>
				</div>
			</div>
			<hr class="mt-0 mb-0">
		</div>
		<div id="spasiPengeluaran" style="display: none;">
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		<br>
		</div>
		<br>
		<br>
		<br>
		<div class="container"  id="belumAdaPengeluaran">
			<div class="text-center" style="display: block;">
				<br>
				<br>
				<h1>Hari ini belum ada pengeluaran apapun</h1>
				<br>
				<br>
			</div>
		</div>
		<div class="container-fluid"  id="sebelumPengeluaran">
		</div>
	  </div>
	  <!--MENU-->
	  <div class="container-fluid" id="menu" style="display: none;">
	  <div class="container-fluid fixed-top bg-white" style="display: block;">
	  <div class="row">
				<div class="col-12"><div class="text-center text-muted mb-0">Menu</div></div>
	</div>
	  <div class="row">
				<div class="col-6"><div class="text-center text-muted mb-0">Aktif</div></div>
				<div class="col-6"><div class="text-center text-muted mb-0">Nonaktif</div></div>
				</div>
				<hr class="mt-0 mb-0">
	  </div>
	  <br>
	  <br>
	  <div class="row row-cols-2">
	  <div class="container col" id="menuAktif"></div><div class="container col" id="menuNonAktif"></div>
		</div>
	  </div>
	  <!--LAPORAN-->
	  <div class="container-fluid" id="laporan" style="display: none;">
	  <div class="row text-center">
	  <div class="fs-3 fw-bold">Laporan Harian JS-89 CORPS</div>
	  </div>
	  <div class="row text-center">
	  <div class="fs-5" id="tanggal"></div>
	  </div>
	  <br>
	  <hr class="mt-0 mb-0">
	  <br>
	  <div class="row">
	  <div class="col-6"><div class="text-muted">Pendapatan Cashless :</div></div>
	  <div class="col-6"><div class="text-center text-muted" id="laporanCashless"></div></div>
	  </div>
	  <div class="row" style="display: none;">
	  <div class="col-6"><input type="number" class="text-center text-muted" id="inputCash"></div>
	  <div class="col-6"><input type="number" class="text-center text-muted" id="inputCashless"></div>
	  </div>
	  <div class="row">
	  <div class="col-6"><div class="text-muted">Pendapatan Cash :</div></div>
	  <div class="col-6"><div class="text-center text-muted" id="laporanCash"></div></div>
	  </div>
	  <div class="row">
	  <div class="col-6"><div class="text-muted">Total Pendapatan :</div></div>
	  <div class="col-6"><div class="text-center text-muted" id="totalPendapatan"></div></div>
	  </div>
	  <div class="row" style="display: none;">
	  <div class="col-6"><input type="number" class="text-center text-muted" id="laporanPendapatan"></div>
	  <div class="col-6"><input class="text-center text-muted" id="tPengeluaranLaporan"></div>
	  </div>
	  <div class="row">
	  <div class="col-6"><div class="text-muted">Total Pengeluaran :</div></div>
	  <div class="col-6"><div class="text-center text-muted" id="totalPengeluaranLaporan"></div></div>
	  </div>
	  <hr class="mt-0 mb-0">
	  <div class="row">
	  <div class="col-6"><div class="text-muted fw-bold">Total Keuntungan :</div></div>
	  <div class="col-6"><div class="text-center text-muted fw-bold" id="totalKeuntungan"></div></div>
	  </div>
	  <br>
	  <br>
	  <div class="row">
	  <div class="col-6"><div class="text-muted fw-bold">Produk Terjual :</div></div>
	  <div class="col-6"><div class="text-center text-muted fw-bold" ></div></div>
	  </div>
	  <div class="row">
	  <div class="col-4"><div class="text-muted text-center fw-bold">Produk</div></div>
	  <div class="col-4"><div class="text-muted text-center fw-bold">Kategori</div></div>
	  <div class="col-4"><div class="text-muted text-center fw-bold">Jumlah</div></div>
	  </div>
	  <div class="container-fluid" id="isiProdukTerjual">
	  </div>
	  <div class="row">
	  <div class="col-3"><div class="btn btn-secondary" onclick="istirahat()">Istirahat</div></div>
	  </div>
	  </div>
	  
	    <!--FIXED BOTTOM MENU-->
	  <br>
	  <br>
	  <br>
	  <div class="fixed-bottom">
		<div class="container card">
		  <ul class="nav nav-pills nav-fill">
			<li class="nav-item" id="linkPendapatan" style="display: none;">
			  <button type="button" onclick="pindahPendapatan()" id="iPendapatan" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
				  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
				  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
				  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
				</svg>
				<span id="jumlahPendapatan" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				  
				</span>
				<div class="tex-center mb-0" style="font-size:10px">History</div>
			  </button> 
			</li>
			<li class="nav-item" id="linkJob" style="display: none;">
			  <button type="button" onclick="pindahJob()" id="iJob" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16">
				  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
				</svg>
				<span id="jumlahJob" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				  
				</span>
				<div class="tex-center mb-0" style="font-size:10px">Order</div>
			  </button> 
			</li>
			<li class="nav-item" id="linkPengeluaran" style="display: none;">
			  <button type="button" onclick="pindahPengeluaran()" id="iPengeluaran" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
				  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
				</svg>
				<span id="jumlahPengeluaran" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				  
				</span>
				<div class="tex-center mb-0" style="font-size:10px">Spending</div>
			  </button> 
			</li>
			<li class="nav-item" id="linkMenu" style="display: none;">
			  <button type="button" onclick="pindahMenu()" id="iMenu" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-menu-button-fill" viewBox="0 0 16 16">
				  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v2A1.5 1.5 0 0 0 1.5 5h8A1.5 1.5 0 0 0 11 3.5v-2A1.5 1.5 0 0 0 9.5 0h-8zm5.927 2.427A.25.25 0 0 1 7.604 2h.792a.25.25 0 0 1 .177.427l-.396.396a.25.25 0 0 1-.354 0l-.396-.396zM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8zm1 3v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2H1zm14-1V8a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2h14zM2 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/>
				</svg>
				<div class="tex-center mb-0" style="font-size:10px">Menu</div>
			  </button> 
			</li>
			<li class="nav-item" id="linkLaporan" style="display: none;">
			  <button type="button" onclick="pindahLaporan()" id="iLaporan" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
				  <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z"/>
				  <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z"/>
				</svg>
				<div class="tex-center mb-0" style="font-size:10px">Report</div>
			  </button> 
			</li>
			<li class="nav-item mb-0" id="linkHome">
			  <button class="nav-link position-relative rounded-pill active mb-0" id="iHome" onClick="pindahHome()">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
				  <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
				</svg>
				<div class="tex-center mb-0" style="font-size:10px">Home</div>
			  </button>
			</li>
			<li class="nav-item mb-0" id="linkCup">
			  <button class="nav-link position-relative rounded-pill mb-0" id="iCup" onClick="pindahCup()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-cup" viewBox="0 0 16 16">
				  <path fill-rule="evenodd" d="M.11 3.187A.5.5 0 0 1 .5 3h13a.5.5 0 0 1 .488.608l-.22.991a3.001 3.001 0 0 1-1.3 5.854l-.132.59A2.5 2.5 0 0 1 9.896 13H4.104a2.5 2.5 0 0 1-2.44-1.958L.012 3.608a.5.5 0 0 1 .098-.42Zm12.574 6.288a2 2 0 0 0 .866-3.899l-.866 3.9ZM1.124 4l1.516 6.825A1.5 1.5 0 0 0 4.104 12h5.792a1.5 1.5 0 0 0 1.464-1.175L12.877 4H1.123Z"/>
				</svg>
				<div class="tex-center mb-0" style="font-size:10px">Drink</div>
			  </button>
			</li>
			<li class="nav-item mb-0" id="linkFood">
			  <button class="nav-link position-relative rounded-pill mb-0" id="iFood" onClick="pindahFood()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-egg-fried" viewBox="0 0 16 16">
				  <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
				  <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z"/>
				</svg>
				<div class="tex-center mb-0" style="font-size:10px">Food</div>
			  </button>
			</li>
			<li class="nav-item mb-0" id="linkCart">
			  <button type="button" onclick="pindahCart()" id="iCart" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
				  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
				</svg>
				<span id="jumlahCart" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				 
				</span>
				 <div class="tex-center mb-0" style="font-size:10px">Cart</div>
			  </button> 
			</li>
			<li class="nav-item mb-0" id="linkDone">
			  <button type="button" onclick="pindahDone()" id="iDone" class="nav-link position-relative rounded-pill mb-0">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-file-check" viewBox="0 0 16 16">
				  <path d="M10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
				  <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z"/>
				</svg>
				<span id="jumlahDone" class="position-absolute top-0 start-50 badge rounded-pill bg-danger" style="display: none;">
				  
				</span>
				<div class="tex-center mb-0" style="font-size:10px">History</div>
			  </button> 
			</li>
			<li class="nav-item mb-0" id="linkPerson">
			  <button class="nav-link position-relative rounded-pill mb-0" id="iPerson" onClick="pindahPerson()">
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
				  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
				</svg>
				<div class="tex-center mb-0" style="font-size:10px">Profile</div>
			  </button>
			</li>
		  </ul>
		</div>
	  </div>
    </div>
  <script src="js/bootstrap.bundle.min.js" charset="utf-8"></script>
  <script src="js/swiper-bundle.min.js"></script>
  <script src="js/myplugin.js"></script>
  </body>
</html>