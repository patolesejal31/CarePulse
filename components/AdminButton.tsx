"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export const AdminButton = () => {
  const { t } = useLanguage();

  return (
    <Link
      href="/?admin=true"
      className="font-bold px-5 py-2 rounded-full shadow-lg hover:brightness-110 transition bg-[#ffcf56] text-[#740938] text-sm"
    >
      {t("admin")}
    </Link>
  );
};
