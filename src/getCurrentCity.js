const getIPUrl = "https://ipwho.is/";

export async function getCurrentCity() {
  const locationDataByIpResponse = await window.fetch(getIPUrl);
  const locationDataByIp = await locationDataByIpResponse.json();
  return locationDataByIp.city;
}
