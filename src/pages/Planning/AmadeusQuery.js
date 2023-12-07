// var Amadeus = require('amadeus');

// var amadeus = new Amadeus({
//   clientId: 'REPLACE_BY_YOUR_API_KEY',
//   clientSecret: 'REPLACE_BY_YOUR_API_SECRET'
// });


// const city_dict = {
//     "Paris": "PAR",
//     "London": "LON",
//     "New York": "NYC",
//     "Los Angeles": "LAX",
//     "Malta": "MLA",
// }


// export async function getHotelList(cityCode) {
//     const resp = await amadeus.referenceData.locations.hotel.get({
//         cityCode: city_dict[cityCode],
//     });
//     return resp;
// }


// export async function searchHotels(hotelIds, checkInDate, checkOutDate, adults) {
//     const resp = await amadeus.shopping.hotelOffers.get({
//         hotelIds: hotelIds,
//         checkInDate: checkInDate,
//         checkOutDate: checkOutDate,
//         adults: adults,
//     });
//     return resp;
// }


