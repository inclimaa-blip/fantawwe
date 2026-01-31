export type WrestlerBrand = "raw" | "smackdown" | "nxt" | "legend" | "free-agent";
export type WrestlerStatus = "active" | "injured" | "suspended" | "released";

export interface Wrestler {
  id: string;
  name: string;
  brand: WrestlerBrand;
  status: WrestlerStatus;
  photoUrl?: string | null;
  createdAt: string;
}
