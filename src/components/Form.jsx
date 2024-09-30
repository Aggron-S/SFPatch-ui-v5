import { useRef, useState } from "react";
import { Execute } from "../api/ApiClient";
import Alert from "./Alert";
// import MultiStepForm from "./MultiStepForm";

const InputField = ({ fieldName, /*fields,*/ inputType, onChange }) => {
  const formattedPlaceholder = `${fieldName}`
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // If you want to make it dynamic in the future (got some code behavior issues whenever trying to make the input type dynamic)
  // let inputType;
  // if(typeof fields[fieldName] === 'string') {
  //   inputType = "text"
  // } else if (typeof fields[fieldName] === 'number') {
  //   inputType = "number"
  // }

  return (
    <div className="flex flex-col">
      <label className="text-lg" htmlFor={fieldName}>
        {formattedPlaceholder}
        <span className="text-[#dc3545] text-lg font-bold"> * </span>  
      </label>
      <input
        // Making it one line conditional statement also gets code behavior issues
        // type={typeof fields[fieldName] === "string" ? "text" : typeof fields[fieldName] === "number" && "number"}
        type={inputType}
        className="bg-neutral-bg-600 text-text-200 px-5 py-2 text-base rounded-lg outline-none appearance-none border-2 border-neutral-bg-600 focus:border-primary-purple-500"
        placeholder={formattedPlaceholder}
        id={fieldName}
        name={fieldName}
        // value={value}
        required
        tabIndex={-1}
        onChange={onChange}
      />
    </div>
  );
}

const Form = ({ type, fields, setFields }) => {
  const [isShowAlert, setIsShowAlert] = useState(false);
  const formRef = useRef(null);

  const handleTextChange = e => {
    const { name, value } = e.target;
    setFields(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setIsShowAlert(!isShowAlert);
  }

  const sendForm = async (setIsSuccess, setShowInitialContent) => {
    if (fields && formRef.current) {
      if (typeof fields !== 'object') throw new Error("Fields added in the form must be of type 'object'.");

      try {
        const response = await Execute("/v2/weapon/create", "POST", fields);
        if (!response?.ok) throw new Error(response?.statusText);
        setIsSuccess(true);
        formRef.current.reset();      // Reset Form Fields
      } catch (error) {
        setIsSuccess(false);
        console.error("Error:", error);
      } finally {
        setShowInitialContent(false);
      }
    }
  };

  return (
    <>
      {isShowAlert && (
        <Alert headingText={"Create Weapon"} onSubmit={sendForm} setIsShowAlert={setIsShowAlert} />
      )}

      {type === "single" ? (
        <form className="bg-neutral-bg-700 w-11/12 px-5 py-7 rounded-md flex flex-col justify-center" onSubmit={handleFormSubmit} ref={formRef}>
          <div className="grid grid-cols-1 gap-y-3 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 md:gap-y-4">
            {/* Iterate over the fields keys and creates input fields depending on the number of key-value pairs in object passed to the Form */}
            {/* This one is more dynamic and requires less code. However, there's a code behavior problem in InputField component in which the 
                input element with a type of "number" also accepts chars other than numbers. using condition checks doesn't work properly. */}
            
            {/* {Object.keys(fields).map((fieldName, idx) => (
              <div key={idx} className="">    you can use another unique key as you want
                <InputField fieldName={fieldName} fields={fields} onChange={handleTextChange} />
              </div>
            ))} */}
            <InputField fieldName={"add_sp"} inputType="number" onChange={handleTextChange} />
            <InputField fieldName={"description"} inputType="text" onChange={handleTextChange} />
            <InputField fieldName={"duration"} inputType="number" onChange={handleTextChange} />
            <InputField fieldName={"exposure"} inputType="number" onChange={handleTextChange} />
            <InputField fieldName={"file_name"} inputType="text" onChange={handleTextChange} />
            <InputField fieldName={"image_data"} inputType="text" onChange={handleTextChange} />
            <InputField fieldName={"item_type"} inputType="text" onChange={handleTextChange} />
            <InputField fieldName={"name"} inputType="text" onChange={handleTextChange} />
            <InputField fieldName={"price"} inputType="number" onChange={handleTextChange} />
            <div className="lg:col-span-3">
              <InputField fieldName={"rank"} inputType="text" onChange={handleTextChange} />
            </div>
          </div>
          <button 
            type="submit" 
            className="bg-primary-purple-500 p-3 rounded-md px-8 mt-10 w-full hover:bg-secondary-blue-500"
            tabIndex={-1}
          >
            Submit
          </button>
        </form>
      ) : (
        <>
          {/* Not fully functional yet */}
          {/* You can pass this as children to MultiStepForm if ever the input type code behavior is fixed
              and you want to make dynamic input field similar to the single form type above    */}

          {/* {Object.keys(fields).map((fieldName, idx) => (
              <div key={idx} className="">    you can use another unique key as you want
                <InputField fieldName={fieldName} fields={fields} onChange={handleTextChange} />
              </div>
            ))} */}

          {/* {type === "multi-step" && (
            <MultiStepForm submit={sendForm}>
              <InputField fieldName={"add_sp"} value={fields["add_sp"]} inputType="number" onChange={handleTextChange} />
              <InputField fieldName={"description"} value={fields["description"]} inputType="text" onChange={handleTextChange} />
              <InputField fieldName={"duration"} value={fields["duration"]} inputType="number" onChange={handleTextChange} />
              <InputField fieldName={"exposure"} value={fields["exposure"]} inputType="number" onChange={handleTextChange} />
              <InputField fieldName={"file_name"} value={fields["file_name"]} inputType="text" onChange={handleTextChange} />
              <InputField fieldName={"image_data"} value={fields["image_data"]} inputType="text" onChange={handleTextChange} />
              <InputField fieldName={"item_type"} value={fields["item_type"]} inputType="text" onChange={handleTextChange} />
              <InputField fieldName={"name"} value={fields["name"]} inputType="text" onChange={handleTextChange} />
              <InputField fieldName={"price"} value={fields["price"]} inputType="number" onChange={handleTextChange} />
              <InputField fieldName={"rank"} value={fields["rank"]} inputType="text" onChange={handleTextChange} />
            </MultiStepForm>
          )} */}
        </>
      )}
    </>
  );
};

export default Form;
