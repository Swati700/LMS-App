'use client';
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getBookmarkedCompanions } from "@/lib/actions/companion.actions"; // <--- HERE
import CompanionCard from "@/components/CompanionCard"; // your card component

const BookmarksPage = () => {
    const { user } = useUser();
    const [companions, setCompanions] = useState<any[]>([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user) return;
            const data = await getBookmarkedCompanions(user.id);
            setCompanions(data.flat()); // flatten nested arrays from Supabase
        };

        fetchBookmarks().catch(console.error);
    }, [user]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companions.map(c => (
                <CompanionCard
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    topic={c.topic || ""}
                    subject={c.subject || ""}
                    duration={c.duration || 0}
                    color={c.color || "#fff"}
                    bookmarked={true} // all are bookmarked here
                />
            ))}
        </div>
    );
};

export default BookmarksPage;