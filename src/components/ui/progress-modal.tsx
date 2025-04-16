import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import React from "react";

interface ProgressModalProps {
  open: boolean;
  progress: number;
  message: string;
}

const ProgressModal = ({ open, progress, message }: ProgressModalProps) => {
  return (
    <Dialog open={open} modal>
      <DialogContent className="sm:max-w-md">
        <DialogTitle className="text-lg font-semibold text-center">
          {message}
        </DialogTitle>
        <div className="flex flex-col gap-4 py-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-center text-muted-foreground">
            {progress.toFixed(0)}% Complete
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgressModal;