import { useState } from "react";
import "./App.css";
import Stats from "./components/stats/Stats";

function App() {
  const [currentRegion, setCurrentReqion] = useState("all");

  const handleSelectRegion = (reqion:string) => {
    if (currentRegion === reqion) {
      setCurrentReqion("all")
    } else {
      setCurrentReqion(reqion)
    }
  }

  return (
    <div className="container">
      <h1>Population growth per country, 1950 to 2021</h1>
      <h3>Click on the legend below to filter by continent</h3>
      <div className="reqion-wrap">
        <h3>Region:</h3>
        {[
          { label: "asia", color: "#FFBF00" },
          { label: "europe", color: "#CCCCFF" },
          { label: "africa", color: "#40E0D0" },
          { label: "oceania", color: "#DE3163" },
          { label: "americas", color: "#FF7F50" },
        ].map((item, index) => (
          <div key={index} className="reqion">
            <div
              className="reqion-checkbox"
              style={{
                backgroundColor: item.color,
                border: `2px solid ${item.label === currentRegion ? '#000' : item.color}`
              }}
              onClick={() => handleSelectRegion(item.label)}
            />
            <p style={{ textTransform:"capitalize" }}>{item.label}</p>
          </div>
        ))}
      </div>
      <div className="stats-wrap">
        <Stats currentRegion={currentRegion} />
      </div>
    </div>
  );
}

export default App;
