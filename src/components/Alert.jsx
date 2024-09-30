import { useEffect, useRef, useState } from "react";

const AlertComponentStateIcon = ({ type }) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      fontSize="6.5em"
    >
      <path
        d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248z"
        style={{ fill: `${type === "success" ? "#28a745" : type === "error" && "#ff0000"}` }}
      />
      
      {type === "success" ? (
        <path
          d="M227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
          style={{ fill: 'white' }}
        />
      ) : (type === "error" && (
        <path
          d="M144 144l224 224M368 144L144 368"
          style={{ fill: "none", stroke: "white", strokeWidth: "60" }}
        />
      ))}
    </svg>
  )
}

const Alert = ({ headingText, onSubmit, setIsShowAlert }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [showInitialContent, setShowInitialContent] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const alertRef = useRef(null);

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.focus();
    }
  }, []);

  const sendData = () => {
    setIsButtonDisabled(true);
    onSubmit(setIsSuccess, setShowInitialContent);
  };

  return (
    <>
      {/* Screen Overlay */}
      <div className="fixed inset-0 bg-neutral-bg-800 opacity-50 z-[9990]"></div>

      {/* Alert Content */}
      <div className="fixed inset-0 flex items-center justify-center z-[9999]">
        <div
          ref={alertRef}
          tabIndex={-1}
          className="bg-neutral-bg-800 w-11/12 max-w-md py-6 rounded-lg animate-bounceIn mx-4 outline-none"
        >
          {showInitialContent ? (
            <div className="flex flex-col justify-center gap-y-3">
              <p className="text-2xl text-text-200 text-center">{headingText}</p>

              <div className="flex justify-between items-center px-14 mt-6">
                <button  
                  type="button" 
                  className={`bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  onClick={() => setIsShowAlert(false)}
                  disabled={isButtonDisabled}
                >
                  Cancel
                </button>
                
                <button  
                  type="button" 
                  className={`bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                  onClick={sendData}
                  disabled={isButtonDisabled}
                >
                  Ok
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-y-3">
              <AlertComponentStateIcon type={`${isSuccess ? "success" : "error"}`} />
              <p className="text-2xl text-text-200">{`${isSuccess ? "Success" : "Error"}`}</p>
              
              <button
                type="button"
                className="bg-primary-purple-500 p-3 rounded-md px-12 mt-4 hover:bg-secondary-blue-500"
                onClick={() => setIsShowAlert(false)}
              >
                Ok
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Alert;
