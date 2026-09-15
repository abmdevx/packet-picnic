import { useParams } from "react-router-dom";

const SharedFile = () => {
  const { uniqueId } = useParams();

  console.log("Unique ID:", uniqueId);

  return <div>Shared File: {uniqueId}</div>;
};

export default SharedFile;