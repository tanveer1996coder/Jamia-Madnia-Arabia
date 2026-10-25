"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const { locale } = useParams<{ locale: string }>();
  const urdu = locale === "ur";
  return <section className="container access-section"><div className="access-card"><p className="eyebrow">404</p><h1>{urdu ? "صفحہ نہیں ملا" : "Page not found"}</h1><p className="access-description">{urdu ? "یہ صفحہ دستیاب نہیں ہے۔ مرکزی صفحے پر واپس جائیے۔" : "This page is not available. Return home to explore the website."}</p><Button asChild><Link href={urdu ? "/ur" : "/en"}>{urdu ? "صفحۂ اول پر واپس" : "Back to home"}</Link></Button></div></section>;
}
