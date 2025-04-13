import { useState } from "react";
import { Pencil } from "lucide-react";

const ProfileCard = () => {
  const [form, setForm] = useState({
    name: "Your name",
    username: "yourname",
    email: "yourname@gmail.com",
    website: "https://yourwebsite.com",
    gender: "Not specified",
    bio: "This is a short bio about yourself.",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <img
            src="https://placehold.co/80x80"
            alt="profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full">
            <Pencil size={14} className="text-gray-600" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{form.name}</h2>
          <p className="text-sm text-gray-500">{form.email}</p>
        </div>
      </div>

      <hr className="my-4" />

      <div className="space-y-4 text-sm">
        {(["Name", "Username", "Email", "Website", "Gender", "Bio"] as const).map(
          (label) => {
            const key = label.toLowerCase() as keyof typeof form;
            return (
              <div key={label} className="flex justify-between border-b py-2">
                <label className="text-gray-700">{label}</label>
                <input
                  className="text-right outline-none w-1/2 bg-transparent text-gray-800"
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              </div>
            );
          }
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
