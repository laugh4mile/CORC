import { useParams, useLocation } from "react-router-dom";

const UserDetailPage = () => {
  const params = useParams();
  const location = useLocation();
  const { userName } = location.state;

  console.log("params", params);
  console.log("state", location.state);

  return (
    <section className="page">
      <span className="title">{`${userName} (${params.employeeNum})`}</span>
    </section>
  );
};

export default UserDetailPage;
