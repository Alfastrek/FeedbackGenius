import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {
  try {
    // Connect to the database
    await dbConnect().then(() => console.log('Database connected')).catch((err) => {
      console.error('Database connection failed:', err);
      return new Response(
        JSON.stringify({ success: false, message: 'Database connection failed' }),
        { status: 500 }
      );
    });

    // Get the user session
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

    // Convert user ID to ObjectId
    const userId = new mongoose.Types.ObjectId(_user._id);

    // Perform the aggregate query to retrieve user messages
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]).exec();

    if (!user || user.length === 0) {
      console.error('User not found in database');
      return new Response(
        JSON.stringify({ success: false, message: 'User not found' }),
        { status: 404 }
      );
    }

    // Return the messages
    return new Response(
      JSON.stringify({ messages: user[0].messages }),
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
