import { useState } from "react";
import { Check, X } from "lucide-react";

const initialUsers = Array.from({ length: 10 }, (_, i) => `User ${String.fromCharCode(65 + i)}`);

const PendingRequests = () => {
  const [requests, setRequests] = useState(initialUsers);

  const handleAction = (user: string) => {
    setRequests((prev) => prev.filter((u) => u !== user));
  };

  // Hide the entire component if list is empty
  if (requests.length === 0) return null;

  return (
    <div className="w-[250px]">
      <h2 className="text-lg font-semibold text-[#5c3b0b] mb-2">Pending Requests</h2>

      <div className="bg-[#fde9a0] p-3 rounded-md space-y-3 overflow-y-auto max-h-[420px] transition-all duration-300 ease-in-out">
        {requests.map((user) => (
          <div
            key={user}
            className="flex items-center justify-between px-2 py-1 rounded bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center bg-[#b8453a] text-white font-semibold rounded-full text-sm">
                {user.split(" ")[1][0]}
              </div>
              <span className="text-sm">{user}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAction(user)}>
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button onClick={() => handleAction(user)}>
                <X className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingRequests;
