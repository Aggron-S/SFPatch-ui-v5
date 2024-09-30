import Table from "../components/Table";

const WeaponShopPage = () => {
  return (
    <div className="bg-primary-bg-500 flex items-center justify-center">
      <Table endpoint="webItemsInfo" name="weapon" />
    </div>
  );
};

export default WeaponShopPage;
