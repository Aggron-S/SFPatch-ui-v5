import Spinner from "../components/Spinner";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { Execute } from "../api/ApiClient";

const EditPage = () => {
  const weaponData = useLoaderData();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    CID: weaponData.cid,
    DURATION: weaponData.duration,
    DURATION_TYPE: weaponData.duration_type,
    EXPOSURE: weaponData.exposure,
    ITEMID: weaponData.item_id,
    NAME: weaponData.name,
    PRICE: weaponData.price,
    PRICE_TYPE: weaponData.price_type,
  });

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitting form data", typeof formData);
    console.log(formData.EXPOSURE);

    const url = window.location.href;

    if (url.includes("weapon") && formData.EXPOSURE == -1) {
      console.log("Hiding weapon from patch");
      Execute(`/v2/webItemsInfo/hideFromPatch/${formData.ITEMID}`, "PUT");
      return toast.success(`${formData.NAME} hidden from patch.`);
    } else if (url.includes("weapon") && formData.EXPOSURE == 0) {
      console.log("Including weapon in patch");
      Execute(`/v2/webItemsInfo/includeInPatch/${formData.ITEMID}`, "PUT");
      return toast.success(`${formData.NAME} included in patch.`);
    } else if (url.includes("item") && formData.EXPOSURE == -1) {
      console.log("Hiding item from patch");
      Execute(`/v2/itemsListInfo/hideFromPatch/${formData.ITEMID}`, "PUT");
      return toast.success(`${formData.NAME} hidden from patch.`);
    } else if (url.includes("item") && formData.EXPOSURE == 0) {
      console.log("Including item in patch");
      Execute(`/v2/itemsListInfo/includeInPatch/${formData.ITEMID}`, "PUT");
      return toast.success(`${formData.NAME} included in patch.`);
    }
  };

  return (
    <div className="bg-primary-bg-500 flex items-center justify-center overflow-hidden">
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className="bg-text-100  w-[1000px] overflow-y-auto shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-3xl text-[#000] text-center font-semibold mb-6">
              Edit {weaponData.name}
            </h2>
            <div className="flex justify-between w-full">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-[#000] font-bold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="NAME"
                  className="border rounded w-[300px] py-2 px-3 mb-2"
                  value={formData.NAME}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="cid"
                  className="block text-[#000] font-bold mb-2"
                >
                  CID
                </label>
                <input
                  type="text"
                  id="cid"
                  name="CID"
                  className="border rounded w-[300px] py-2 px-3 mb-2"
                  value={formData.CID}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="duration"
                  className="block text-[#000] font-bold mb-2"
                >
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="DURATION"
                  className="border rounded w-[300px] py-2 px-3 mb-2"
                  value={formData.DURATION}
                  readOnly
                />
              </div>
            </div>

            <div className="flex justify-between w-full">
              <div className="mb-4">
                <label
                  htmlFor="duration_type"
                  className="block text-[#000] font-bold mb-2"
                >
                  Duration Type
                </label>
                <input
                  type="text"
                  id="duration_type"
                  name="DURATION_TYPE"
                  className="border rounded w-[300px] py-2 px-3 mb-2"
                  value={formData.DURATION_TYPE}
                  readOnly
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="exposure"
                  className="block text-[#000] font-bold mb-2"
                >
                  Exposure{" "}
                  <span className="text-neutral-bg-800 opacity-35 text-sm">
                    (-1 is Hidden, 0 is Shown)
                  </span>
                </label>
                <select
                  id="exposure"
                  name="EXPOSURE"
                  className="border rounded w-[300px] py-2 px-3 mb-2"
                  value={formData.EXPOSURE}
                  onChange={handleInputChange}
                >
                  <option value={-1}>-1</option>
                  <option value={0}>0</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="item_id"
                  className="block text-[#000] font-bold mb-2"
                >
                  Item ID
                </label>
                <input
                  type="text"
                  id="item_id"
                  name="ITEMID"
                  className="border rounded w-[300px] py-2 px-3 mb-2"
                  value={formData.ITEMID}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-[#000] font-bold mb-2"
              >
                Price
              </label>
              <input
                type="text"
                id="price"
                name="PRICE"
                className="border rounded w-full py-2 px-3 mb-2"
                value={formData.PRICE}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="price_type"
                className="block text-[#000] font-bold mb-2"
              >
                Price Type
              </label>
              <input
                type="text"
                id="price_type"
                name="PRICE_TYPE"
                className="border rounded w-full py-2 px-3 mb-2"
                value={formData.PRICE_TYPE}
                readOnly
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="text-text-100 bg-primary-purple-500 p-3 rounded-md px-8 w-full hover:bg-secondary-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditPage;
