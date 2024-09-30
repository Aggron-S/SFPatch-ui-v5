import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }) => {
    const overide = {
        display: "block",
        margin: "100px auto",
      };
  
    return (
        <ClipLoader
        className="absolute"
        color="#4338ca"
        loading={loading}
        cssOverride={overide}
        size={100}
      />
  )
}

export default Spinner