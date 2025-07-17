// export async function getGeoLocationFromCep(cep: string) {
//   try {
//     const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
//     const cepData = await cepResponse.json();

//     if (cepData.erro) return null;

//     const address = `${cepData.logradouro}, ${cepData.localidade}, ${cepData.uf}`;

//     const geoResponse = await fetch(
//       `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
//         address
//       )}&format=json&limit=1`,
//       {
//         headers: {
//           "User-Agent": "LocalizaCEPApp/1.0 (contato@seudominio.com)",
//         },
//       }
//     );

//     const geoData = await geoResponse.json();

//     if (geoData.length === 0) return null;

//     return {
//       lat: parseFloat(geoData[0].lat),
//       lng: parseFloat(geoData[0].lon),
//       logradouro: cepData.logradouro,
//       bairro: cepData.bairro,
//       localidade: cepData.localidade,
//       uf: cepData.uf,
//     };
//   } catch (error) {
//     console.error("Erro ao buscar geolocalização:", error);
//     return null;
//   }
// }

export async function getGeoLocationFromCep(cep: string) {
  try {
    // Consulta o CEP diretamente via Nominatim
    const geoResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(
        cep
      )}&country=Brazil&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "LocalizaCEPApp/1.0 (contato@seudominio.com)",
        },
      }
    );

    const geoData = await geoResponse.json();

    if (geoData.length === 0) return null;

    const result = geoData[0];

    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      logradouro: result.address?.road || null,
      bairro: result.address?.suburb || result.address?.neighbourhood || null,
      localidade:
        result.address?.city ||
        result.address?.town ||
        result.address?.village ||
        null,
      uf: result.address?.state || null,
    };
  } catch (error) {
    console.error("Erro ao buscar geolocalização:", error);
    return null;
  }
}

