import React from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChartTooltip } from "../../components/dashboard/ChartTooltip";
import { IChartDatum } from "../../interfaces";

type TResponsiveAreaChartProps = {
  kpi: string;
  data: IChartDatum[];
  data1: IChartDatum[];
  colors: {
    stroke: string;
    fill: string;
  };
};
export const ResponsiveAreaChart = ({
  kpi,
  data,
  data1,
  colors,
}: TResponsiveAreaChartProps) => {

    let graphData = data?.data;
    const combinedData = graphData?.map((entry, index) => ({
    date: entry.date,
    [data.column]: entry.value,
    [data1.column]: data1?.data?.[index]?.value,
  }));
    const extractNumbers = (rgbString: string) => {
      const regex = /\d+/g; 
      const numbers = rgbString.match(regex); 
      if (numbers !== null && numbers.length === 3) {
        const [r, g, b] = numbers.map(Number); 
        return [r,g,b]
      } 
      return []
    };
  function lightenColor(color: any) {
    const originalColor = extractNumbers(color);
    const whiteRatio = 0.3; 
    const mixedColor = originalColor?.map(component => {
        return Math.round(component + (255 - component) * whiteRatio);
    });
    const mixedColorString = `rgb(${mixedColor[0]}, ${mixedColor[1]}, ${mixedColor[2]})`;
    return mixedColorString;
}

  if(!data.column && !data.data){
    return (<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Select any 2 values to compare</div>)
  }
  return (
    <ResponsiveContainer height={400}>
      <AreaChart
        data={combinedData}
        height={400}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="0 0 0" />
        <XAxis
          dataKey="date"
          tickCount={combinedData?.length ?? 0}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
        />
        <YAxis
          tickCount={13}
          tick={{
            stroke: "light-grey",
            strokeWidth: 0.5,
            fontSize: "12px",
          }}
          interval="preserveStartEnd"
          domain={[0, "dataMax + 10"]}
        />
        <Tooltip
          content={<ChartTooltip kpi={kpi} colors={colors} />}
          wrapperStyle={{
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            border: "0 solid #000",
            borderRadius: "10px",
          }}
        />
        <Area
          type="monotone"
          dataKey={`${[data.column]}`} 
          stroke={colors.stroke} 
          strokeWidth={3}
          fill={'white'} 
          dot={{
            stroke: 'black',
            strokeWidth: 3,
          }}
          />
          <Area
          type="monotone"
          dataKey={`${[data1.column]}`} 
          stroke={lightenColor(colors.stroke)}
          strokeWidth={3}
          fill={'white'} 
          dot={{
            stroke: 'black',
            strokeWidth: 3,
          }}
           strokeDasharray="25 5"
          />
          <Legend/>
      </AreaChart>
    </ResponsiveContainer>
  );
};