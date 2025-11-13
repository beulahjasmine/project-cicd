import { useEffect } from "react";
import { getGames } from "../api/api";

export default function TestBackend() {
  useEffect(() => {
    getGames()
      .then((res) => {
        console.log("Backend response:", res.data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  return <h1 style={{ color: "white" }}>Testing Backend...</h1>;
}
