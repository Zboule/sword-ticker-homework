export interface File {
  name: string;
  device: string;
  path: string;
  status: "available" | "scheduled";
}
