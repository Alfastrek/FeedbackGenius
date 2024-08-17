import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  try {
    await dbConnect().then(() => console.log('Database connected')).catch((err) => {
      console.error('Database connection failed:', err);
      return new Response(
        JSON.stringify({ success: false, message: 'Database connection failed' }),
        { status: 500 }
      );
    });

    const session = await getServerSession(authOptions);

    if (!session) {
      console.error('Session not found');
      return new Response(
        JSON.stringify({ success: false, message: 'Not authenticated' }),
        { status: 401 }
      );
    }

    const _user: User = session.user;

    if (!_user) {
      console.error('User not found in session');
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 401 }
      );
    }

    // Log the user ID
    console.log('User ID:', _user._id);

    const userId = new mongoose.Types.ObjectId(_user._id);

    // Check if the user exists with a simple query
    const userExists = await UserModel.findById(userId).exec();
    if (!userExists) {
      console.error('User does not exist in the database');
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    // Proceed with the aggregate query
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]).exec();

    // Handle the case where the user has no messages
    const messages = user.length > 0 ? user[0].messages : [];

    return new Response(
      JSON.stringify({ messages }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in GET request:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Internal Server Error' }),
      { status: 500 }
    );
  }
}
