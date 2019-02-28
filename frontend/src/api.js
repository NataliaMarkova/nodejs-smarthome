import axios from 'axios';

const serverUrl = 'http://localhost:3005';
const devicesUrl = `${serverUrl}/device`;
const groupUrl = `${serverUrl}/group`;

export async function getDevices() {
  const response =  await axios.get(`${devicesUrl}`);
  return response.data;
}

export async function getDeviceById(deviceId) {
  const response = await axios.get(`${devicesUrl}/${deviceId}`);
  return response.data;
}

export async function addDevice(device) {
  return axios.post(`${devicesUrl}/`, device);
}

export async function removeDevice(deviceId) {
  return axios.delete(`${devicesUrl}`, { data: { deviceId: deviceId } } );
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

export async function getGroups() {
  const response =  await axios.get(`${groupUrl}`);
  return response.data;  
}

export async function getGroupById(groupId) {
  const response = await axios.get(`${groupUrl}/${groupId}`);
  return response.data;
}

export async function addGroup(group) {
  return axios.post(`${groupUrl}/`, group);
}

export async function removeGroup(groupId) {
  return axios.delete(`${groupUrl}`, { data: { groupId: groupId } } );
}

export async function updateGroup(groupId, data) {
  return axios.put(`${groupUrl}/${groupId}`, data);
}

export async function switchGroupOn(groupId) {
  await updateGroup(groupId, {
    state: 'on'
  });
}

export async function switchGroupOff(groupId) {
  await updateGroup(groupId, {
    state: 'off'
  });
}

export async function getGroupDevices(groupId) {
  const response = await axios.get(`${groupUrl}/${groupId}/device`);
  return response.data;
}

export async function addDeviceToGroup(groupId, deviceId) {
  return axios.put(`${groupUrl}/${groupId}/device`, { deviceId: deviceId });
}

export async function removeDeviceFromGroup(groupId, deviceId) {
  return axios.delete(`${groupUrl}/${groupId}/device`, { data: { deviceId: deviceId } });
}
