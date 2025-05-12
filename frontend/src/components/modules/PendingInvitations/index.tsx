"use client";

import {
  getMyPendingInvitations,
  respondToParticipation,
  type ParticipationWithEvent,
} from "@/service/Pending-Invitations";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  Calendar,
  Clock,
  MapPin,
  Users,
  Info,
  CheckCircle,
  XCircle,
  Inbox,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PendingInvitationsPage() {
  const [invitations, setInvitations] = useState<ParticipationWithEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: "accept" | "decline";
    invitation: ParticipationWithEvent | null;
  }>({
    open: false,
    type: "accept",
    invitation: null,
  });

  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const data = await getMyPendingInvitations();
        console.log("Fetched invitations:", data);
        setInvitations(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvitations();
  }, []);

  const handleAccept = async (id: string) => {
    try {
      console.log("Clicked invitation/participation ID:", id);

      setActionLoading(id);
      await respondToParticipation(id, "APPROVED"); // ✅ Call actual API
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      setConfirmDialog({ open: false, type: "accept", invitation: null });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDecline = async (id: string) => {
    try {
      setActionLoading(id);
      await respondToParticipation(id, "REJECTED"); // ✅ Call actual API
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      setConfirmDialog({ open: false, type: "decline", invitation: null });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setActionLoading(null);
    }
  };

  const openConfirmDialog = (
    type: "accept" | "decline",
    invitation: ParticipationWithEvent
  ) => {
    setConfirmDialog({
      open: true,
      type,
      invitation,
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pending Invitations</h1>
            <p className="text-gray-500">
              Review and respond to your event invitations
            </p>
          </div>
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200 relative">
                <Skeleton className="h-full w-full" />
              </div>
              <CardHeader>
                <Skeleton className="h-8 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Pending Invitations</h1>
            <p className="text-gray-500">
              Review and respond to your event invitations
            </p>
          </div>
        </div>

        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-center gap-3 text-red-600">
            <AlertCircle className="h-6 w-6 flex-shrink-0" />
            <div>
              <p className="font-medium">Failed to load invitations</p>
              <p className="text-sm text-red-500">{error}</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              Try Again
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Pending Invitations</h1>
          <p className="text-gray-500">
            Review and respond to your event invitations
          </p>
        </div>
        <Badge
          variant="outline"
          className="px-3 py-1.5 text-sm bg-purple-50 text-purple-700 border-purple-200"
        >
          {invitations.length} Pending
        </Badge>
      </div>

      {invitations.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-100 p-4 rounded-full">
              <Inbox className="h-12 w-12 text-gray-400" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Pending Invitations
          </h2>
          <p className="text-gray-500 max-w-md mx-auto">
            You do not have any pending event invitations at the moment. When
            someone invites you to an event, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((inv) => (
            <Card
              key={inv.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-48 bg-gray-100 relative">
                {inv.event.eventImgUrl ? (
                  <Image
                    src={inv.event.eventImgUrl || "/placeholder.svg"}
                    alt={inv.event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-r from-purple-100 to-indigo-100">
                    <Users className="h-16 w-16 text-purple-300" />
                  </div>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Badge
                    className={cn(
                      inv.event.isPublic
                        ? "bg-green-100 text-green-800 border-green-200"
                        : "bg-blue-100 text-blue-800 border-blue-200"
                    )}
                  >
                    {inv.event.isPublic ? "Public" : "Private"}
                  </Badge>
                  <Badge
                    className={cn(
                      inv.event.isPaid
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    )}
                  >
                    {inv.event.isPaid ? `$${inv.event.fee}` : "Free"}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-xl line-clamp-1">
                  {inv.event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Inviter information */}
                {/* <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md">
                  <Avatar className="h-10 w-10 border border-gray-200">
                    <AvatarImage
                      src={inv.inviter?.avatarUrl || "/placeholder.svg"}
                    />
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {inv.inviter?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <p className="font-medium text-sm line-clamp-1">
                      {inv.inviter?.name || "Unknown User"}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {inv?.email || "No email provided"}
                    </p>
                  </div>
                </div> */}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {format(
                        new Date(inv.event.dateTime),
                        "EEEE, MMMM d, yyyy"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span>
                      {format(new Date(inv.event.dateTime), "h:mm a")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="line-clamp-1">{inv.event.venue}</span>
                  </div>
                </div>

                {/* <p className="text-sm text-gray-600 line-clamp-2">
                  {inv.event.description}
                </p> */}

                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  Awaiting Your Response
                </Badge>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 pt-2">
                <Button
                  onClick={() => openConfirmDialog("decline", inv)}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                  disabled={actionLoading === inv.id}
                >
                  {actionLoading === inv.id &&
                  confirmDialog.type === "decline" ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Declining...
                    </>
                  ) : (
                    "Decline"
                  )}
                </Button>
                <Button
                  onClick={() => openConfirmDialog("accept", inv)}
                  className="bg-purple-600 hover:bg-purple-700"
                  disabled={actionLoading === inv.id}
                >
                  {actionLoading === inv.id &&
                  confirmDialog.type === "accept" ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Accepting...
                    </>
                  ) : (
                    "Accept"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog
        open={confirmDialog.open}
        onOpenChange={(open) =>
          !actionLoading && setConfirmDialog((prev) => ({ ...prev, open }))
        }
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {confirmDialog.type === "accept" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Accept Invitation
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  Decline Invitation
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.type === "accept"
                ? "You're about to accept this invitation. You'll be added to the event's participant list."
                : "You're about to decline this invitation. You won't be able to join this event later without a new invitation."}
            </DialogDescription>
          </DialogHeader>

          {confirmDialog.invitation && (
            <>
              {/* Inviter information */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-md mb-3">
                <Avatar className="h-10 w-10 border border-gray-200">
                  <AvatarImage
                    src={
                      confirmDialog.invitation.inviter?.avatarUrl ||
                      "/placeholder.svg"
                    }
                  />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {confirmDialog.invitation.inviter?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">
                    Invited by{" "}
                    {confirmDialog.invitation.inviter?.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {confirmDialog.invitation.inviter?.email ||
                      "No email provided"}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <h3 className="font-medium mb-2">
                  {confirmDialog.invitation.event.title}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(
                        new Date(confirmDialog.invitation.event.dateTime),
                        "PPP"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      {format(
                        new Date(confirmDialog.invitation.event.dateTime),
                        "p"
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{confirmDialog.invitation.event.venue}</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {confirmDialog.type === "accept" &&
            confirmDialog.invitation?.event.isPaid && (
              <div className="flex items-start gap-2 bg-amber-50 p-3 rounded-md text-amber-800 mb-4">
                <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium">This is a paid event</p>
                  <p>
                    You will need to pay ${confirmDialog.invitation.event.fee} to
                    complete your registration after accepting.
                  </p>
                </div>
              </div>
            )}

          <DialogFooter className="flex sm:justify-end gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                !actionLoading &&
                setConfirmDialog((prev) => ({ ...prev, open: false }))
              }
              disabled={actionLoading !== null}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant={
                confirmDialog.type === "accept" ? "default" : "destructive"
              }
              className={
                confirmDialog.type === "accept"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : ""
              }
              onClick={() =>
                confirmDialog.invitation &&
                (confirmDialog.type === "accept"
                  ? handleAccept(confirmDialog.invitation.id)
                  : handleDecline(confirmDialog.invitation.id))
              }
              disabled={actionLoading !== null}
            >
              {actionLoading !== null ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  {confirmDialog.type === "accept"
                    ? "Accepting..."
                    : "Declining..."}
                </span>
              ) : confirmDialog.type === "accept" ? (
                "Accept Invitation"
              ) : (
                "Decline Invitation"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
