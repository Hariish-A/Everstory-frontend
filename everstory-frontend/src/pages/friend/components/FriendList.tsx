// src/pages/friend/components/FriendList.tsx
import { useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import axiosInstance from "@/api/client";

interface Friendship {
  friend_id: number;
}

const FriendList = () => {
  const [friends, setFriends] = useState<{ name: string; username: string; id: number }[]>([]);

  const fetchFriends = async () => {
    try {
      const [relations, users] = await Promise.all([
        axiosInstance.get("http://localhost:8031/friendship/friends/outgoing"),
        axiosInstance.get("http://localhost:8011/auth/all"),
      ]);

      const userMap = new Map(users.map((u: any) => [u.id, u]));
      const mapped = relations.map((r: Friendship) => {
        const u = userMap.get(r.friend_id);
        return {
          id: r.friend_id,
          name: u?.name || `User ${r.friend_id}`,
          username: u?.username || `user${r.friend_id}`,
        };
      });

      setFriends(mapped);
    } catch (err) {
      console.error("Error loading friends", err);
    }
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  return (
    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      {friends.map((f) => (
        <FriendCard key={f.id} name={f.name} username={f.username} />
      ))}
    </div>
  );
};

export default FriendList;
