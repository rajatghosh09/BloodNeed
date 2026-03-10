export interface IRegisterHandler {
  full_name?: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "hospital";
  address: string;
  blood_group?: string;
  hospital_name?: string;
  license_no?: string;
  auth_id?: string | any;
}


export interface Isignin{
  email: string;
  password: string;
}