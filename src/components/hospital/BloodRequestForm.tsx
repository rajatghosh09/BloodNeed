// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// // import { Select } from "@/components/ui/select";
// import { useCreateRequest } from "@/hooks/hospitalRequest";

// interface Props {
//   auth_id: string;
// }

// const BloodRequestForm = ({ auth_id }: Props) => {
//   const mutation = useCreateRequest();

//   const [form, setForm] = useState({
//     blood_group: "",
//     units_requested: "",
//     priority_level: "",
//   });

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     mutation.mutate({
//       ...form,
//       units_requested: Number(form.units_requested),
//       auth_id,
//     });

//     setForm({
//       blood_group: "",
//       units_requested: "",
//       priority_level: "",
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">

//       <Input
//         placeholder="Blood Group (A+, B+, O-)"
//         value={form.blood_group}
//         onChange={(e) =>
//           setForm({ ...form, blood_group: e.target.value })
//         }
//       />

//       <Input
//         type="number"
//         placeholder="Units Required"
//         value={form.units_requested}
//         onChange={(e) =>
//           setForm({ ...form, units_requested: e.target.value })
//         }
//       />

//       <select
//         className="w-full border p-2 rounded-md"
//         value={form.priority_level}
//         onChange={(e) =>
//           setForm({ ...form, priority_level: e.target.value })
//         }
//       >
//         <option value="">Select Priority</option>
//         <option value="low">Low</option>
//         <option value="medium">Medium</option>
//         <option value="high">High</option>
//       </select>

//       <Button className="w-full bg-red-600 hover:bg-red-700">
//         Submit Request
//       </Button>
//     </form>
//   );
// };

// export default BloodRequestForm;



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateRequest } from "@/hooks/hospitalRequest";

interface Props {
  auth_id: string;
}

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const BloodRequestForm = ({ auth_id }: Props) => {
  const mutation = useCreateRequest();

  const [form, setForm] = useState({
    blood_group: "",
    units_requested: "",
    priority_level: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      ...form,
      units_requested: Number(form.units_requested),
      auth_id,
      status: "pending",
    });

    setForm({
      blood_group: "",
      units_requested: "",
      priority_level: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Blood Group */}
      <select
        className="w-full border p-2 rounded-md"
        value={form.blood_group}
        onChange={(e) =>
          setForm({ ...form, blood_group: e.target.value })
        }
      >
        <option value="">Select Blood Group</option>

        {bloodGroups.map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}

      </select>

      {/* Units */}
      <Input
        type="number"
        placeholder="Units Required"
        value={form.units_requested}
        onChange={(e) =>
          setForm({ ...form, units_requested: e.target.value })
        }
      />

      {/* Priority */}
      <select
        className="w-full border p-2 rounded-md"
        value={form.priority_level}
        onChange={(e) =>
          setForm({ ...form, priority_level: e.target.value })
        }
      >
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <Button className="w-full bg-red-600 hover:bg-red-700">
        Submit Blood Request
      </Button>

    </form>
  );
};

export default BloodRequestForm;