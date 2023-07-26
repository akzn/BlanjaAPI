# Blanja-RESTful-API 
berisi API sederhana untuk backend saja dibangun dengan node js menggunakan framework express js.

## Installation
* Clone Repository https://github.com/akzn/BlanjaAPI
* Ketik `npm install` pada terminal di root directory pada repo untuk install dependencies
* konfigurasi `.env` dengan mengambil contoh format di `.env.example`. Sesuaikan dengan konfigurasi pada server anda.
* setelah backend terinstall (`npm install`) dan database pada `db/blanja.sql` sudah selesai diunggah/import, ketik perintah `knex migrate:latest` pda cli backend untuk melakukan migrasi database ke scheme terbaru. 
* Payment gateway MIDTRANS
  - pastikan credential midtrans client sudah diinputkan pada file .env. Jika belum punya akun midtrans, register ke midtrans dan copy server/client secret pada dashboard [SANDBOX](https://dashboard.sandbox.midtrans.com/) midtrans ke .env. Pastikan credential yang dicopy adalah credential sandbox saat melakukan testing
  - Gunakan [Sanbox testing](https://docs.midtrans.com/en/technical-reference/sandbox-test) untuk testing payment midtrans. 
* Shipping Service BITESHIP
  *  sesuaikan secret key Biteship API di `config>biteship api sevice.js
  *  Sesuaikan konfig `BiteDummy:true` untuk menggunakan dummy data atau `BiteDummy:false` untuk transaksi real/ channel production, karena biteship tidak ada mock tracking pengiriman 
  *  ketik perintah `npm start` atau `npm run dev` untuk start server 

## Main Dependencies
* node.js
* express js 
* mysql
* knex
* midtrans-client
> dependencies lain bisa dilihat di package.json


## notes about midtrans
- helper/midtrans.js : digunakan sebagai handler untuk koneksi antara backend ke midtrans API
- controller/payments.js : disini controller utama untuk segala transaksi midtrans.

## notes about biteship
- controller/shippingController.js : disini controller utama untuk shipping.


## Documentasi postman
[click here](https://documenter.getpostman.com/view/11874653/TVmTbuVR#d0ea0e49-87fc-4cf5-9e32-64c11166b2e6)

