// export const GET = async (request) => {
//     try{
//         await connectToDB();

//         const prompts = await Prompt.find({}).populate('creator');
        
//         return new Response(JSON.stringify(prompts), {
//             status: 200
//         })

//     } catch (error) {
//         return new Response("Failed to fetch all Prompts", {
//             status: 500
//         })
//     }
// }
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (request) => {
    try {
        await connectToDB();

        const searchQuery = new URL(request.url).searchParams.get("search")?.trim() || "";

        console.log("Search Query:", searchQuery); // Debugging

        let query = {};

        if (searchQuery) {
            // Find users whose username matches the search query
            const users = await User.find({
                username: { $regex: searchQuery, $options: "i" }
            }).select("_id"); // Get only user IDs

            const userIds = users.map(user => user._id);

            query = {
                $or: [
                    { prompt: { $regex: searchQuery, $options: "i" } },
                    { tag: { $regex: searchQuery, $options: "i" } },
                    { creator: { $in: userIds } } // Match by creator's ObjectId
                ]
            };
        }

        // Fetch prompts and populate creator
        const prompts = await Prompt.find(query).populate("creator");

        return new Response(JSON.stringify(prompts), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("API Error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};
