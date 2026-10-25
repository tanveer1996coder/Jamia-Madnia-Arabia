import type { Metadata } from "next";
import { AccessPlaceholder } from "@/components/access-placeholder";
import { copy, getLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: copy[getLocale((await params).locale)].portal, robots: { index: false, follow: false } };
}

export default async function PortalPage({ params }: { params: Promise<{ locale: string }> }) {
  return <AccessPlaceholder locale={getLocale((await params).locale)} area="parent" />;
}
