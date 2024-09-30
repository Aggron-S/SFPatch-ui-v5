import { useState } from "react";
import Form from "../components/Form";

const CreateWeaponPage = () => {
  const [weaponFormData, setWeaponFormData] = useState({
    add_sp: 0,
    description: "",
    duration: 0,
    exposure: 0,
    file_name: "",
    image_data: "",
    item_type: "",
    name: "",
    price: 0,
    rank: "",
  });

  return (
    <div className="bg-primary-bg-500 text-text-100 flex items-center justify-center">
      <Form type="single" fields={weaponFormData} setFields={setWeaponFormData} />

      {/* The multi-step form is just a recommendation for large forms that might go out of the viewport.
          It is not fully functional yet and can be modified in the future as you want. Its implementation
          can be seen in MultiStepForm.jsx. 
      */}
      {/* <Form type="multi-step" fields={weaponFormData} setFields={setWeaponFormData} /> */}
    </div>
  );
};

export default CreateWeaponPage;
