export type ClaimInput = {
  name: string;
  phone: string;
};

export type ClaimErrors = Partial<Record<keyof ClaimInput, string>>;

export function validateClaimInput(input: unknown): ClaimErrors {
  if (!input || typeof input !== "object") {
    return {
      name: "Please enter your name.",
      phone: "Please enter your phone number.",
    };
  }

  const candidate = input as Record<string, unknown>;
  const name = typeof candidate.name === "string" ? candidate.name.trim() : "";
  const phone = typeof candidate.phone === "string" ? candidate.phone.trim() : "";
  const errors: ClaimErrors = {};

  if (name.length < 2) {
    errors.name = "Please enter a name with at least 2 characters.";
  }

  if (!/^[6-9][0-9]{9}$/.test(phone)) {
    errors.phone = "Enter a 10-digit Indian mobile number starting with 6 to 9.";
  }

  return errors;
}