import { RNKeycloak } from '@react-keycloak/native';

const keycloak = new RNKeycloak({
  url: 'https://keycloak.agrocappture.com',
  realm: 'TestRealm',
  clientId: 'AgroMobile',
});

export default keycloak;