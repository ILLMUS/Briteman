export const RETURN_REASONS = [
  "Defective / not working",
  "Damaged in transit",
  "Wrong item delivered",
  "Not as described",
  "Missing parts or accessories",
  "Changed mind (unopened)",
  "Warranty replacement",
  "Other",
] as const;

export type ReturnReason = (typeof RETURN_REASONS)[number];

export const RETURN_WINDOW_DAYS = 7;
