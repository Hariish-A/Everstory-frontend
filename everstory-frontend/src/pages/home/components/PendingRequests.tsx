import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import axiosInstance from "@/api/client";
import { toast } from "react-hot-toast";

interface Request {
  id: number;
  user_id: number;
  friend_id: number;
  status: string;
}

const PendingRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [users, setUsers] = useState<Record<number, string>>({}); // user_id → name

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8031/friendship/received");
      // Filter only pending ones (if backend sends all)
      const pending = res.filter((r: Request) => r.status === "PENDING");
      setRequests(pending);
    } catch (err) {
      console.error("Failed to fetch friend requests", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:8011/auth/all");
      const map: Record<number, string> = {};
      res.forEach((user: any) => {
        map[user.id] = user.name || `User ${user.id}`;
      });
      setUsers(map);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleAccept = async (req: Request) => {
    try {
      await axiosInstance.put("http://localhost:8031/friendship/accept", {
        request_id: req.id,
        new_status: "ACCEPTED",
      });
      toast.success("Friend request accepted ✅");
      setRequests((prev) => prev.filter((r) => r.id !== req.id));
    } catch (err) {
      toast.error("Failed to accept request");
      console.error("Failed to accept friend request", err);
    }
  };

  const handleReject = (req: Request) => {
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
  };

  useEffect(() => {
    fetchRequests();
    fetchUsers();
  }, []);

  if (requests.length === 0) return null;

  return (
    <div className="w-[250px]">
      <h2 className="text-lg font-semibold text-[#5c3b0b] mb-2">Pending Requests</h2>

      <div className="bg-[#fde9a0] p-3 rounded-md space-y-3 overflow-y-auto max-h-[420px] transition-all duration-300 ease-in-out">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between px-2 py-1 rounded bg-white shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 flex items-center justify-center bg-[#b8453a] text-white font-semibold rounded-full text-sm">
                {users[req.user_id]?.charAt(0) || "?"}
              </div>
              <span className="text-sm">{users[req.user_id]}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleAccept(req)}>
                <Check className="w-4 h-4 text-green-600" />
              </button>
              <button onClick={() => handleReject(req)}>
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
