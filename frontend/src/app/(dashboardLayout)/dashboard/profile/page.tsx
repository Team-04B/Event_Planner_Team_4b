import Profile from "@/components/modules/dashboard/profile";
import { getMeFoDb } from "@/service/AuthService";
import React from "react";

const ProfilePage = async () => {
  const { data } = await getMeFoDb();
  return (
    <div className="flex justify-center items-center">
      <Profile datas={data} />
    </div>
  );
};

export default ProfilePage;
