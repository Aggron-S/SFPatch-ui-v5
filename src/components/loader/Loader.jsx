import { Execute } from "../../api/ApiClient";

export const weaponLoader = async ({ params }) => {
  const data = await Execute(`/v2/webItemsInfo/${params.id}`);
  return data;
};

export const itemLoader = async ({ params }) => {
  const data = await Execute(`/v2/itemsListInfo/${params.id}`);
  return data;
};
