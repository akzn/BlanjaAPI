# Blanja-RESTful-API 
berisi API sederhana untuk backend saja dibangun dengan node js menggunakan framework express js.

## Installation
* Clone Repository https://github.com/akzn/BlanjaAPI
* Ketik `npm install` pada terminal di root directory pada repo untuk install dependencies
* setelah backend terinstall (`npm install`) dan database sudah selesai diunggah/import, run `knex migrate:latest` pda cli backend untuk melakukan migrasi database ke scheme terbaru. 
* Payment gateway MIDTRANS
  - pastikan credential midtrans client sudah diinputkan pada file .env. Jika belum punya akun midtrans, register ke midtrans dan copy server/client secret pada dashboard [SANDBOX](https://dashboard.sandbox.midtrans.com/) midtrans ke .env. Pastikan credential yang dicopy adalah credential sandbox saat melakukan testing
  - Gunakan [Sanbox testing](https://docs.midtrans.com/en/technical-reference/sandbox-test) untuk testing payment midtrans. 
* Shipping Service BITESHIP
  *  sesuaikan secret key Biteship API di `config>biteship api sevice.js
  *  Sesuaikan konfig `BiteDummy:true` untuk menggunakan dummy data atau `BiteDummy:false` untuk transaksi real/ channel production, karena biteship tidak ada mock tracking pengiriman 
  *  run `npm start` atau `npm run dev` untuk start server 

## Main Dependencies
* node.js
* express js 
* mysql
* knex
* midtrans-client
> dependencies lain bisa dilihat di package.json




### Endpoint
1.GET
* /products
* /category
* /product/id
* /history
* /products/new
* /products/popular

2.POST 
* /products
* body
```sh 
{"product_color": "", 
"product_price": "", 
"product_description": "", 
"category_id": "", 
"product_rating": "", 
"product_color": "", 
"product_size": "", 
"product_total": "", 
"product_condition": ""}
```
* response success
```sh
{
  "message": "Data Success",
  "status": 200,
  "data": {
    "id": 19,
    "product_name": "compass gazalle",
    "product_price": "600000",
    "product_description": "celana levis luar kualitas atas",
    "category_id": "2",
    "product_rating": "4",
    "product_color": "blue",
    "product_size": "40",
    "product_total": "1",
    "product_condition": "new",
    "product_create": "2020-11-25T05:58:58.944Z",
    "product_update": "2020-11-25T05:58:58.944Z"
  }
}
```

* response error
```sh
{
  "message": "Data Error",
  "status": 500
}
```

* /history
* body
```sh 
{"name": "", 
"description": "", 
"price": "", 
"id": "", 
"size": "" , 
"total": "", 
"condition": ""}
```
* response success
```sh
{
  "message": "Data Success",
  "status": 200,
  "data": {
    "id": "2",
    "name": "mantapsssss",
    "description": "celana levis",
    "price": "600000",
    "rating": "4",
    "color": "blue",
    "size": "38",
    "total": "1",
    "p_condition": "new",
    "created_at": "2020-11-25T05:59:51.386Z",
    "update_at": "2020-11-25T05:59:51.386Z"
  }
}
```
* response error
```sh
{
  "message": "Data Error",
  "status": 500
}
```

3.PATCH
* /product
* body
```sh 
{"id": "", 
"product_color": ""}
```
* response success
```sh
{
  "message": "Data Success",
  "status": 200,
  "data": {
    "msg": "Update Success",
    "id": "15",
    "product_color": "green",
    "product_update": "2020-11-25T06:01:16.036Z"
  }
}
```

* response error
```sh
{
  "message": "Data Error",
  "status": 500
}
```

* response not found
```sh
{
  "msg": "Data Not Found",
  "status": 404
}
```

4.DELETE
* /products/delete/id

#### Documentasi postman
[click here](https://documenter.getpostman.com/view/11874653/TVmTbuVR#d0ea0e49-87fc-4cf5-9e32-64c11166b2e6)

