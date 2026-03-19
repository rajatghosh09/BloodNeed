export interface BloodRequest {
  id?: number;
  blood_group: string;
  units_requested: number;
  priority_level: string;
  status?: string;
  auth_id: string;
}
