"use client";

import { Printer } from "lucide-react";
import PixelButton from "../ui/PixelButton";

export default function PrintButton() {
  return (
    <PixelButton
      onClick={() => window.print()}
      variant="primary"
      size="sm"
      icon={<Printer size={14} aria-hidden="true" />}
    >
      Print / Save PDF
    </PixelButton>
  );
}
