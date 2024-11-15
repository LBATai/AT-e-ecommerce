import { Pagination } from "antd";

const PaginationComponent = () => {
  return (
    <div>
      <Pagination defaultCurrent={1} total={50} />
    </div>
  )
}

export default PaginationComponent