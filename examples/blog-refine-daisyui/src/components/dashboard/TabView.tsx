import dayjs from "dayjs";
import React, { useState } from "react";

import { TTab } from "../../interfaces";
import DateRangeDropdown from "./DateRangeDropDown";
import DropdownWithCheckbox from "./DropdownWithCheckbox";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel"

type TTabViewProps = {
  tabs: TTab[];
  setActive: Function;
};

export const TabView = ({ tabs, setActive }: TTabViewProps) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mx-auto py-4 bg-slate-50 border rounded-lg drop-shadow-md">
      <div className="tabs">
        {tabs?.map((tab: TTab, index: number) => (
          <TabItem
            key={tab?.id}
            label={tab?.label}
            isActive={index === activeTab}
            clickHandler={() => {
              setActive(index);
              setActiveTab(index);
            }}
          />
        ))}
      </div>
      <div className="mx-auto">
        {tabs?.map((tab: TTab, index: number) => (
          <TabPanel key={tab?.id} isActive={index === activeTab}>
            {tab?.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};
