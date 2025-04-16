import { updatePassword, updateProfileImage, updateUsername } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileManageModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onUpdate: (updatedUser: User) => void;
}

const ProfileManageModal = ({ open, onClose, user, onUpdate }: ProfileManageModalProps) => {
  const [loading, setLoading] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(user.profileImage || "");

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) {
      toast.error("Username cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const res = await updateUsername(user.id, newUsername);
      if (res.status === 200 && res.user) {
        onUpdate(res.user);
        toast.success("Username updated successfully");
      } else {
        toast.error(res.message || "Failed to update username");
      }
    } catch (error) {
        console.log("Error in updating username: ", error);
      toast.error("Failed to update username");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    setLoading(true);
    try {
      const res = await updatePassword(user.id, currentPassword, newPassword);
      if (res.status === 200) {
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        toast.error(res.message || "Failed to update password");
      }
    } catch (error) {
        console.log("Error in updating password: ", error);
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfileImage = async () => {
    if (!imageUrl.trim()) {
      toast.error("Image URL cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const res = await updateProfileImage(user.id, imageUrl);
      if (res.status === 200 && res.user) {
        onUpdate(res.user);
        toast.success("Profile image updated successfully");
      } else {
        toast.error(res.message || "Failed to update profile image");
      }
    } catch (error) {
        console.log("Error in updating profile image: ", error);
      toast.error("Failed to update profile image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Username</Label>
            <div className="flex gap-2">
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
              />
              <Button onClick={handleUpdateUsername} disabled={loading}>
                Update
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="space-y-2">
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
              />
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
              />
              <Button onClick={handleUpdatePassword} disabled={loading} className="w-full">
                Update Password
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Profile Image URL</Label>
            <div className="flex gap-2">
              <Input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
              />
              <Button onClick={handleUpdateProfileImage} disabled={loading}>
                Update
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileManageModal;