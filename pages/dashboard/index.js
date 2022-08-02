import React, { useEffect, useState } from "react";
import { withProtected } from "src/hook/route";
import { getUserInfo } from '@/lib/firestoreConnection'
// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import DashboardLayout from "layouts/DashboardLayout";

function Dashboard({auth}) {
  const { user } = auth;
  const [userInfo, setUserInfo] = useState(user)
  
  useEffect(()=>{
    async function getUser(){
      const userData = await getUserInfo(user.uid)
      setUserInfo(userData)
    }
  },[])

  return (
    <DashboardLayout userInfo={userInfo}>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardLineChart /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardBarChart /> */}
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withProtected(Dashboard);
// Dashboard.layout = DashboardLayout;
