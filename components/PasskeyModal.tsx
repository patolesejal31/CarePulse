"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { decryptKey, encryptKey } from "@/lib/utils";

import { useLanguage } from "@/context/LanguageContext";

export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const { t } = useLanguage();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);

    if (path)
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY!.toString()) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
  }, [encryptedKey]);

  const closeModal = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      setOpen(false);
      router.push("/admin");

      localStorage.setItem("accessKey", encryptedKey);

      setOpen(false);
    } else {
      setError(t("invalidPasskey"));
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog border-none bg-dark-400">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between text-white">
            {t("adminAccessTitle")}
            <Image
              src="/assets/icons/close.svg"
              alt="close"
              width={20}
              height={20}
              onClick={() => closeModal()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription className="text-dark-600">
            {t("adminAccessDesc")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot text-white" index={0}  />
              <InputOTPSlot className="shad-otp-slot text-white" index={1} />
              <InputOTPSlot className="shad-otp-slot text-white" index={2} />
              <InputOTPSlot className="shad-otp-slot text-white" index={3} />
              <InputOTPSlot className="shad-otp-slot text-white" index={4} />
              <InputOTPSlot className="shad-otp-slot text-white" index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="shad-primary-btn w-full bg-[#ffcf56] text-[#740938] hover:brightness-110"
          >
            {t("enterPasskey")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
