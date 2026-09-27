import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import type { ClaimErrors } from "@/lib/validation";

const claimAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const genericErrorMessage = "Unable to process your request.";

function simulateNetworkDelay() {
  const delayMs = 800 + Math.floor(Math.random() * 701);
  return new Promise<void>((resolve) => setTimeout(resolve, delayMs));
}

function createClaimCode() {
  const suffix = Array.from({ length: 4 }, () =>
    claimAlphabet[randomInt(claimAlphabet.length)],
  ).join("");

  return `MORROW-${suffix}`;
}

export async function POST(request: Request) {
  await simulateNetworkDelay();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: genericErrorMessage },
      { status: 400 },
    );
  }

  try {
    const candidate =
      body && typeof body === "object" && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};
    const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
    const phone = typeof candidate.phone === "string" ? candidate.phone.trim() : "";
    const errors: ClaimErrors = {};

    if (!name) {
      errors.name = "Name is required.";
    }

    if (!/^\d{10}$/.test(phone)) {
      errors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (errors.name || errors.phone) {
      return NextResponse.json(
        { success: false, message: genericErrorMessage, errors },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      claimCode: createClaimCode(),
      message: "Your offer has been claimed.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: genericErrorMessage },
      { status: 500 },
    );
  }
}