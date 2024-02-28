import { useState } from "react";
import { IPopulationGrowth } from "./stats.type";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  LabelList,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import populationData from "../../data/population-and-demography.json"

export default function Stats({ currentRegion } : { currentRegion: string }) {
  // const [popularList, setPopularList] = useState<IPopulationGrowth[]>(populationData as IPopulationGrowth[]);
  const [year, setYear] = useState(1950);

  const regionMatchColor = (region:string) => {
    if (region === "asia") {
      return "#FFBF00"
    } else if (region === "europe") {
      return "#CCCCFF"
    } else if (region === "africa") {
      return "#40E0D0"
    } else if (region === "oceania") {
      return "#DE3163"
    } else if (region === "americas") {
      return "#FF7F50"
    } else {
      return "#82ca9d"
    }
  }

  const popularList = populationData as IPopulationGrowth[]

  const popularListByYear = popularList.filter(data => data.year === year);
  const popularListByRegion = popularListByYear.filter(data => currentRegion === "all" || currentRegion === data.region);
  
  const totalPopular = popularListByRegion.reduce((acc, data) => acc + data.population, 0);

  const data = popularListByRegion.sort((a, b) => b.population - a.population).slice(0, 10).map(item => ({
    ...item,
    fill: regionMatchColor(item.region)
  }));

  return (
    <div style={{ position:"relative" }}>
      <ResponsiveContainer width="100%" minHeight="70vh">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="0" fillOpacity={0} horizontal={false} />
          <YAxis
            type="category"
            dataKey="country_name"
            textAnchor="end"
            interval={0}
          />
          <XAxis type="number" orientation="top" dataKey="population" />
          <Tooltip />
          <Bar dataKey="population">
            <LabelList
              fill="#000"
              dataKey="population"
              position="right"
              formatter={(value:number) => new Intl.NumberFormat('en-US').format(value)} 
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="total-wrap">
        <h1 style={{ fontSize: "100px", textAlign:"end"}}>{year}</h1>
        <h6 style={{ fontSize: "30px", textAlign:"end" }}>
          Total: {Intl.NumberFormat('en-US').format(totalPopular)}
        </h6>
      </div>
      <div className="range-year-wrap">
        <input
          type="range"
          min="1950" 
          max="2021" 
          value={year}
          className="popular-range"
          onChange={(e) => setYear(Number(e.target.value))}
          style={{ width:"100%" }}
        />
        <div className="sliderticks" style={{ height:"20px"}}>
          {Array.from({length: 2022 - 1950}, (_, index) => (
            <span key={1950 + index}>
              {(1950 + index) % 5 === 0 ? 1950 + index : ""}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
