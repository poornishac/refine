import { CrudFilter, useList } from "@refinedev/core";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

import DateRangeDropdown from "../../components/dashboard/DateRangeDropDown";
import DropdownWithCheckbox from "../../components/dashboard/DropdownWithCheckbox";
import { RecentSales } from "../../components/dashboard/RecentSales";
import { ResponsiveAreaChart } from "../../components/dashboard/ResponsiveAreaChart";
import { ResponsiveBarChart } from "../../components/dashboard/ResponsiveBarChart";
import Stats from "../../components/dashboard/Stats";
import { TabView } from "../../components/dashboard/TabView";
import { IChartDatum, TTab } from "../../interfaces";

export const Dashboard: React.FC = () => {
  const [startDate, setStartDate] = useState(dayjs()?.subtract(7, "days")?.startOf("day"));
  const [endDate, setEndDate] = useState(dayjs().startOf("day"));
  const [activeTab, setActiveTab] = useState(0);
  const [comparisonData , setComparisonData ] = useState([]);
  const [comparisonDataGraph, setComparisonDataGraph ]= useState<any>([]);

  const filters: CrudFilter[] = [
  {
    field: "start",
    operator: "eq",
    value: startDate,
  },
  {
    field: "end",
    operator: "eq",
    value: endDate,
  },
];
  const { data: dailyRevenue } = useList<IChartDatum>({
    resource: "dailyRevenue",
    filters,
  });

  const { data: dailyOrders } = useList<IChartDatum>({
    resource: "dailyOrders",
    filters,
  });

  const { data: newCustomers } = useList<IChartDatum>({
    resource: "newCustomers",
    filters,
  });

  const useMemoizedChartData = (d: any) => {
    return useMemo(() => {
      return d?.data?.data?.map((item: IChartDatum) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
          day: "numeric",
        }).format(new Date(item.date)),
        value: item?.value,
      }));
    }, [d]);
  };

  const memoizedRevenueData = useMemoizedChartData(dailyRevenue);
  const memoizedOrdersData = useMemoizedChartData(dailyOrders);
  const memoizedNewCustomersData = useMemoizedChartData(newCustomers);

 const displayData = {
   dailyRevenue : memoizedRevenueData,
   dailyOrders: memoizedOrdersData,
   newCustomers: memoizedNewCustomersData
 }
  const tabs: TTab[] = [
    {
      id: 1,
      label: "Daily Revenue/New Customers/Daily Orders",
      content: (
        <ResponsiveAreaChart
          kpi="Comparison"
          data={{column: comparisonData[0], data:displayData[comparisonData[0]] }}
          data1={{column: comparisonData[1], data:displayData[comparisonData[1]] }}
          colors={{
            stroke: "rgb(76, 175, 80)",
            fill: "rgba(54, 162, 235, 0.2)",
          }}
        />
      ),
    },
  ];

  return (
    <>
      <Stats
        dailyRevenue={dailyRevenue}
        dailyOrders={dailyOrders}
        newCustomers={newCustomers}
      />
    <div 
      className="relative inline-block" 
      style={{ float: 'right', marginRight: '2rem', zIndex: 1, marginTop: '1rem', display: 'flex' }}
    >
      <DropdownWithCheckbox setComparisonData={setComparisonData}/>
      <DateRangeDropdown setStartDate={setStartDate} setEndDate={setEndDate}/>
    </div>
      <TabView tabs={tabs} setActive={setActiveTab}/>
      <RecentSales />
    </>
  );
};
