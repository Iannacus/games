import { useNavigate } from "react-router-dom";
import Page from "../../../layouts/Page";
import Card from "../components/Card";

export default function Games() {
  const navigate = useNavigate();

  return (
    <Page>
      <h1 className="text-white">Games</h1>
      <Card game="Queens" onClick={() => navigate("/queens")} />
      <Card game="Tango" onClick={() => navigate("/tango")} />
    </Page>
  );
}
