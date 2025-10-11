import axios from "axios";

// Public HAPI FHIR server base URL
const FHIR_BASE_URL = "https://hapi.fhir.org/baseR4";

export async function getPatients(name = "", page = 1, count = 10) {
  try {
    const params = {
      _getpagesoffset: (page - 1) * count,
      _count: count,
    };
    if (name) params.name = name;

    const response = await axios.get(`${FHIR_BASE_URL}/Patient`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
}
