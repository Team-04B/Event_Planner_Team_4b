import { UserManagementTable } from "@/components/modules/dashboard/Admin/user";
import { getAllUser } from "@/service/user";
type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const MenageAllUserPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  console.log(query);
  const { data } = await getAllUser(query);

  return (
    <div>
      <UserManagementTable userData={data} />
    </div>
  );
};

export default MenageAllUserPage;
