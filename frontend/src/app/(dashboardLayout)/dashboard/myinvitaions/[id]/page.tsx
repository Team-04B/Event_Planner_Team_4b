import InvitationDetailPage from "@/components/modules/Invitations/InvitationDetailPage";

const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <InvitationDetailPage id={params.id} />
    </div>
  );
};

export default Page;
