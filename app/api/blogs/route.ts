import { NextRequest, NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs,getDoc, addDoc, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!,
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const blogsCollection = collection(db, 'blogs');

async function uploadImageToCloudinary(image: string) {
  try {
    const uploadedImage = await cloudinary.v2.uploader.upload(image, {
      folder: 'blogs/',
    });
    return uploadedImage.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

async function createBlog(title: string, content: string, userId: number, image?: string) {
  try {
    let imageUrl;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const newBlog = {
      title,
      content,
      userId,
      image: imageUrl,
      createdAt: new Date().toISOString(),
    };

    const docRef = await addDoc(blogsCollection, newBlog);
    return { id: docRef.id, ...newBlog };
  } catch (error) {
    console.error('Error creating blog:', error);
    throw new Error('Failed to create blog');
  }
}

async function updateBlog(id: string, title: string, content: string, image?: string) {
  try {
    let imageUrl;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const blogDoc = doc(db, 'blogs', id);
    const updatedBlog = { title, content, image: imageUrl };
    await updateDoc(blogDoc, updatedBlog);
    return { id, ...updatedBlog };
  } catch (error) {
    console.error('Error updating blog:', error);
    throw new Error('Failed to update blog');
  }
}

// Helper function to delete a blog
async function deleteBlog(id: string) {
  try {
    const blogDoc = doc(db, 'blogs', id);
    await deleteDoc(blogDoc);
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw new Error('Failed to delete blog');
  }
}

async function getBlog(id: string) {
  try {
    const blogDoc = doc(db, 'blogs', id);
    const docSnap = await getDoc(blogDoc);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog:', error);
    throw new Error('Failed to fetch blog');
  }
}


async function getBlogs(userId?: string) {
  try {
    let blogsQuery;
    if (userId) {
      blogsQuery = query(blogsCollection, where('userId', '==', parseInt(userId)));
    } else {
      blogsQuery = blogsCollection;
    }
    const querySnapshot = await getDocs(blogsQuery);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const blogs: any[] = [];
    querySnapshot.forEach((doc) => {
      blogs.push({ id: doc.id, ...doc.data() });
    });
    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to fetch blogs');
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const id = searchParams.get('id');

    if (id) {
      const blog = await getBlog(id);
      if (blog) {
        return NextResponse.json(blog);
      } else {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
    } else {
      const blogs = await getBlogs(userId || undefined);
      return NextResponse.json(blogs);
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'An error occurred while fetching blogs' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, content, userId, image } = await req.json();

    if (!title || !content || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBlog = await createBlog(title, content, parseInt(userId), image);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ error: 'An error occurred while creating the blog' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, image } = await req.json();

    if (!id || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedBlog = await updateBlog(id, title, content, image);
    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'An error occurred while updating the blog' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing blog id' }, { status: 400 });
    }

    await deleteBlog(id);
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'An error occurred while deleting the blog' }, { status: 500 });
  }
}
