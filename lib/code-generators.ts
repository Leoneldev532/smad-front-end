import { URL_TEMPLATE_ORIGIN } from "./constants";

export const generateCodeScript = (
  withName: boolean,
  privateKey: string,
  projectId: string,
) => {
  return `<link rel="stylesheet" href="${URL_TEMPLATE_ORIGIN}/css/iframe.css"/>
<iframe src="${URL_TEMPLATE_ORIGIN}/ui/form-${withName ? "m1" : "m2"}.html?private_key=${privateKey}&project_id=${projectId}" scrolling="no"></iframe>`;
};

export const generateCodeScriptMap = (
  privateKey: string,
  projectId: string,
  mapId: string,
) => {
  return `<link rel="stylesheet" href="${URL_TEMPLATE_ORIGIN}/css/iframeMap.css"/>
<iframe src="${URL_TEMPLATE_ORIGIN}/ui/map.html?private_key=${privateKey}&project_id=${projectId}&map_id=${mapId}" scrolling="no"></iframe>`;
};
