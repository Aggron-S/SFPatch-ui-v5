import { useState } from "react";

const CreatePayoutPage = () => {
  const [payoutInput, setPayoutInput] = useState([]);

  return (
    <div className="bg-primary-bg-500 flex items-center justify-center">
      <div>
        <h1 className="text-3xl text-text-100">Payout Player(s)</h1>
        <form>
          <label className="text-lg text-text-100" htmlFor="username">
            Username
          </label>
          <input type="text" name="username" required />
          <div>
            <button className="text-text-100 bg-primary-purple-500 p-3 rounded-md px-8 hover:bg-secondary-blue-500">
              Add New Payout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePayoutPage;
