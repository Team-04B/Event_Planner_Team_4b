import InvitationDetailPage from "@/components/modules/Invitations/InvitationDetailPage";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Page =async ({ params }:{params:any}) => {
  const {id} =await params;
   if(!id){
      <div className="min-h-screen flex justify-center items-center">
       <p className=" text-center">Loading.....</p>
      </div>
       }
  return (
    <div>
      <InvitationDetailPage id={id}  />
    </div>
  );
};

export default Page;
