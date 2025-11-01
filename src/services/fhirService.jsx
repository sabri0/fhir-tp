import axios from "axios";

// Public HAPI FHIR server base URL
const FHIR_BASE_URL = "https://hapi.fhir.org/baseR4";

export async function getPatients(name = "", page = 1, count = 10, id="",birthDate="") {
  try {
    if (id ) {
      const response = await axios.get(`${FHIR_BASE_URL}/patient/{id}`);
      return response.data;
    }
    const params = {
      _getpagesoffset: (page - 1) * count,
      _count: count,
    };
    if (name) params.name = name;
    if (birthDate) params.birthdate = birthDate; 

    const response = await axios.get(`${FHIR_BASE_URL}/Patient`, { params });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
}
