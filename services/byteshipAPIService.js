const axios = require('axios');
const { thirdPartyApiKey,BiteDummy } = require('../config/biteship_key');

module.exports = {
  async fetchMapsByTerm(term) {
    try {
      console.log(term)
      const response = await axios.get(`https://api.biteship.com/v1/maps/areas?countries=ID&input=${term}&type=single`, {
        headers: {
          'Authorization': `${thirdPartyApiKey}`,
          // 'Authorization': `Bearer ${thirdPartyApiKey}`,
        },
      });

      // Process the response data here
      return response.data;
    } catch (error) {
      // Handle error cases
      throw new Error('Failed to fetch data from the third-party API');
    }
  },
  async fetchRatesCouriers(data) {
    try {
      console.log('apiData',data)

      let body = {
        "origin_area_id": data.shipper_area_id,
        "destination_area_id":data.destination_area_id,
        "couriers":"jnt,jne,sicepat",
        "items":data.items
      };

      if (BiteDummy) {
        dummyjSon = {
          "success": true,
          "object": "courier_pricing",
          "message": "Success to retrieve courier pricing",
          "code": 20001003,
          "origin": {
              "location_id": null,
              "latitude": null,
              "longitude": null,
              "postal_code": 12410,
              "country_name": "Indonesia",
              "country_code": "ID",
              "administrative_division_level_1_name": "DKI Jakarta",
              "administrative_division_level_1_type": "province",
              "administrative_division_level_2_name": "Jakarta Selatan",
              "administrative_division_level_2_type": "city",
              "administrative_division_level_3_name": "Cilandak",
              "administrative_division_level_3_type": "district",
              "administrative_division_level_4_name": "Cipete Selatan",
              "administrative_division_level_4_type": "subdistrict",
              "address": null
          },
          "destination": {
              "location_id": null,
              "latitude": null,
              "longitude": null,
              "postal_code": 12430,
              "country_name": "Indonesia",
              "country_code": "ID",
              "administrative_division_level_1_name": "DKI Jakarta",
              "administrative_division_level_1_type": "province",
              "administrative_division_level_2_name": "Jakarta Selatan",
              "administrative_division_level_2_type": "city",
              "administrative_division_level_3_name": "Cilandak",
              "administrative_division_level_3_type": "district",
              "administrative_division_level_4_name": "Cilandak Barat",
              "administrative_division_level_4_type": "subdistrict",
              "address": null
          },
          "pricing": [
              {
                  "available_for_cash_on_delivery": false,
                  "available_for_proof_of_delivery": false,
                  "available_for_instant_waybill_id": true,
                  "available_for_insurance": true,
                  "company": "jne",
                  "courier_name": "JNE",
                  "courier_code": "jne",
                  "courier_service_name": "Yakin Esok Sampai (YES)",
                  "courier_service_code": "yes",
                  "description": "Yakin esok sampai",
                  "duration": "1 - 1 days",
                  "shipment_duration_range": "1 - 1",
                  "shipment_duration_unit": "days",
                  "service_type": "overnight",
                  "shipping_type": "parcel",
                  "price": 54000,
                  "type": "yes"
              },
              {
                  "available_for_cash_on_delivery": true,
                  "available_for_proof_of_delivery": false,
                  "available_for_instant_waybill_id": true,
                  "available_for_insurance": true,
                  "company": "jne",
                  "courier_name": "JNE",
                  "courier_code": "jne",
                  "courier_service_name": "Reguler",
                  "courier_service_code": "reg",
                  "description": "Layanan reguler",
                  "duration": "1 - 2 days",
                  "shipment_duration_range": "1 - 2",
                  "shipment_duration_unit": "days",
                  "service_type": "standard",
                  "shipping_type": "parcel",
                  "price": 30000,
                  "type": "reg"
              },
              {
                  "available_for_cash_on_delivery": true,
                  "available_for_instant_waybill_id": true,
                  "available_for_insurance": true,
                  "available_for_proof_of_delivery": false,
                  "company": "sicepat",
                  "courier_name": "SiCepat",
                  "courier_code": "sicepat",
                  "courier_service_name": "Besok Sampai Tujuan",
                  "courier_service_code": "best",
                  "description": "Besok sampai tujuan",
                  "duration": "1 days",
                  "shipment_duration_range": "1",
                  "shipment_duration_unit": "days",
                  "service_type": "overnight",
                  "shipping_type": "parcel",
                  "price": 42000,
                  "type": "best"
              },
              {
                  "available_for_cash_on_delivery": true,
                  "available_for_instant_waybill_id": true,
                  "available_for_insurance": true,
                  "available_for_proof_of_delivery": false,
                  "company": "sicepat",
                  "courier_name": "SiCepat",
                  "courier_code": "sicepat",
                  "courier_service_name": "Reguler",
                  "courier_service_code": "reg",
                  "description": "Layanan reguler",
                  "duration": "1 - 2 days",
                  "shipment_duration_range": "1 - 2",
                  "shipment_duration_unit": "days",
                  "service_type": "standard",
                  "shipping_type": "parcel",
                  "price": 34500,
                  "type": "reg"
              }
          ]
        }
        return dummyjSon
      } else {
        const response = await axios.post(`https://api.biteship.com/v1/rates/couriers`, body ,{
          headers: {
            'Authorization': `${thirdPartyApiKey}`,
            // 'Authorization': `Bearer ${thirdPartyApiKey}`,
          },
        });

        // Process the response data here
        return response.data;
      }
      
    } catch (error) {
      // Handle error cases
      console.log('failed to fetch API',error)
      throw new Error('Failed to fetch data from the third-party API');
    }
  },

  async fetchTracking(data) {
    try {
      console.log('apiData',data)

      waybill_id = data.tracking_number
      courier_code = data.courier_code
      if (BiteDummy) {
        dummyjSon = {
          "success": true,
          "messsage": "Successfully get tracking info",
          "object": "tracking",
          "id": "6051861741a37414e6637fab",
          "waybill_id": "0123082100003094",
          "courier": {
            "company": "jne",
            "name": null,
            "phone": null
          },
          "origin": {
            "contact_name": "[INSTANT COURIER] BITESHIP/FIE",
            "address": "JALAN TANJUNG 16 NO.5, RT.8/RW.2, WEST TANJUNG, SOUTH JAKARTA CITY, JAKARTA, IN"
          },
          "destination": {
            "contact_name": "ADITARA MADJID",
            "address": "THE PAKUBUWONO RESIDENCE, JALAN PAKUBUWONO VI, RW.1, GUNUNG, SOUTH JAKARTA CITY"
          },
          "history": [
            {
              "note": "SHIPMENT RECEIVED BY JNE COUNTER OFFICER AT [JAKARTA]",
              "updated_at": "2021-03-16T18:17:00+07:00",
              "status": "dropping_off"
            },
            {
              "note": "RECEIVED AT SORTING CENTER [JAKARTA]",
              "updated_at": "2021-03-16T21:15:00+07:00",
              "status": "dropping_off"
            },
            {
              "note": "SHIPMENT FORWARDED TO DESTINATION [JAKARTA , HUB VETERAN BINTARO]",
              "updated_at": "2021-03-16T23:12:00+07:00",
              "status": "dropping_off"
            },
            {
              "note": "RECEIVED AT INBOUND STATION [JAKARTA , HUB VETERAN BINTARO]",
              "updated_at": "2021-03-16T23:43:00+07:00",
              "status": "dropping_off"
            },
            {
              "note": "WITH DELIVERY COURIER [JAKARTA , HUB VETERAN BINTARO]",
              "updated_at": "2021-03-17T09:29:00+07:00",
              "status": "dropping_off"
            },
            {
              "note": "DELIVERED TO [ainul yakin | 17-03-2021 11:15 | JAKARTA ]",
              "updated_at": "2021-03-17T11:15:00+07:00",
              "status": "delivered"
            }
          ],
          "link": "-",
          "order_id": null,
          "status": "delivered"
        }
        return dummyjSon

      } else {
        const response = await axios.get(`https://api.biteship.com/v1/trackings/${waybill_id}/couriers/${courier_code}`,{
          headers: {
            'Authorization': `${thirdPartyApiKey}`,
            // 'Authorization': `Bearer ${thirdPartyApiKey}`,
          },
        });

        // Process the response data here
        return response.data;
      }
        
    } catch (error) {
      // Handle error cases
      console.log('failed to fetch API',error)
      throw new Error('Failed to fetch data from the third-party API');
    }
  }


};