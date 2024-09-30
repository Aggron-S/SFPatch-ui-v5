import logo from "../assets/images/patchtool.svg";

const LogInPage = ({ handleSubmit }) => {
  return (
    <div className="h-3/4 flex flex-col items-center justify-center bg-primary-bg-500 gap-10">
      <div className="flex gap-5 items-center">
        <img className="h-12" src={logo} alt="" />
        <h1 className="text-2xl text-text-100">Patch Tool</h1>
      </div>
      <form className="flex flex-col items-start gap-3" onSubmit={handleSubmit}>
        <label className="text-text-100 text-lg" htmlFor="username">
          Username
        </label>
        <input
          className="px-5 py-2 rounded-lg text-black text-lg"
          type="text"
          name="username"
          id="username"
          required
        />
        <label className="text-text-100 text-lg" htmlFor="password">
          Password
        </label>
        <input
          className="px-5 py-2 rounded-lg text-black text-lg"
          type="password"
          name="password"
          id="password"
          required
        />
        <button
          className="text-text-100 bg-primary-purple-500 p-3 w-full rounded-md px-8 hover:bg-secondary-blue-500 mt-3"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LogInPage;
