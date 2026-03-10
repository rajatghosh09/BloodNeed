import * as yup from "yup";

export interface RegisterFromvalues {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  auth_id?: string;
  address: string;
  blood_group: string;
}

export const registerValidation = yup.object().shape({
  full_name: yup.string().trim().required("Full name is required"),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  password: yup
    .string().trim()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: yup.string().trim().required("Phone number is required"),
  address: yup.string().trim().required("Address is required"),
  blood_group: yup.string().trim().required("Blood group is required"),
});




export interface RegisterHospitalFromvalues {
  hospital_name: string;
  license_no: string;
  email: string;
  password: string;
  phone: string;
  auth_id?: string;
  address: string;
}

export const registerHospitalValidation = yup.object().shape({
  hospital_name: yup.string().trim().required("hospital name is required"),
  license_no: yup.string().trim().required("license number is required"),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone: yup.string().trim().required("Phone number is required"),
  address: yup.string().trim().required("Address is required"),
});


export interface SigninFromvalues {
  email: string;
  password: string;
}

export const signinValidation = yup.object({
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
})