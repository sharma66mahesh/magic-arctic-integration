import IconService from "icon-sdk-js";

const iconSdk = new IconService(
  new IconService.HttpProvider(process.env['REACT_APP_ICON_RPC_URL']!)
);

export default iconSdk;