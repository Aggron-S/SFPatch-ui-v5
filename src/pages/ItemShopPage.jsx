import Table from "../components/Table";

const ItemShopPage = () => {
  return (
    <div className="bg-primary-bg-500 flex items-center justify-center">
      <Table endpoint="itemsListInfo" name="item" />
    </div>
  );
};

export default ItemShopPage;
