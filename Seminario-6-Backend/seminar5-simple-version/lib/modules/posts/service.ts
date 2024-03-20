import { IPost } from './model';
import posts from './schema';

export default class PostService {
    
    public async getAll(query: any): Promise<IPost[] | null> {
        // Find the user document and populate the 'posts' field
        return await posts.find(query);
    }

    public async createPost(post_params: IPost): Promise<IPost> {
        try {
            const session = new posts(post_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterPost(query: any): Promise<IPost | null> {
        try {
            return await posts.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async updatePost(user_params: IPost): Promise<void> {
        try {
            const query = { _id: user_params._id };
            await posts.findOneAndUpdate(query, user_params);
        } catch (error) {
            throw error;
        }
    }

    public async deletePost(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await posts.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}