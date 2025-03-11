'use client'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  description: string;
  loading?: boolean;
  onClick?: () => void;
  open: boolean;
  handleOpen: () => void;
};

const AlertDialogBox = ({
  children,
  description,
  handleOpen,
  open,
  className,
  loading = false,
  onClick,
}: Props) => {
  return (
    // Alert Dialog
    <AlertDialog open={open} onOpenChange={handleOpen}>
      {/* Alert Dialog Trigger */}
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      {/* Alert Dialog Content */}
      <AlertDialogContent>
        {/* Alert Dialog Header */}
        <AlertDialogHeader>
          {/* Alert Dialog Title */}
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          {/* Alert Dialog Description */}
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {/* Alert Dialog Footer */}
          <AlertDialogFooter>
          {/* Alert Dialog Cancel */}
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Alert Dialog Button */}
          <Button
          variant={'destructive'}
          onClick={onClick}
          className={`${className}`}
          >
            {loading ? (
                <>
                <Loader2 className="animate-spin" />
                Loading...
                </>
            ) : (

            'Continue')}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
