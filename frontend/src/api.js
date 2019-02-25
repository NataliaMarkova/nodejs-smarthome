import axios from 'axios';

const serverUrl = 'http://localhost:3005';
const devicesUrl = `${serverUrl}/device`;

export async function getDevices() {
  const response =  await axios.get(`${devicesUrl}`);
  return response.data;
}

export async function getDeviceById(deviceId) {
  const response = await axios.get(`${devicesUrl}/${deviceId}`);
  return response.data;
}

export async function addDevice(device) {
  const response = await axios.post(`${devicesUrl}/`, device);
  return response.data;
}

export async function removeDevice(deviceId) {
  const response = await axios.delete(`${devicesUrl}`, { data: { deviceId: deviceId } } );
  return response;
}

export async function updateDevice(deviceId, data) {
  return axios.put(`${devicesUrl}/${deviceId}`, data);
}

export async function switchOn(deviceId) {
  await updateDevice(deviceId, {
    state: 'on'
  });
}

export async function switchOff(deviceId) {
  await updateDevice(deviceId, {
    state: 'off'
  });
}

export async function getDeviceLog(deviceId) {
  const response = await axios.get(`${devicesUrl}/${deviceId}/logs`);
  return response.data;
}