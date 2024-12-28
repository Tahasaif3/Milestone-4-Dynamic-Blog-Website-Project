import { NextRequest, NextResponse } from 'next/server';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

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
const commentsCollection = collection(db, 'comments');

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const blogId = searchParams.get('blogId');

  if (!blogId) {
    return NextResponse.json({ error: 'Missing blogId' }, { status: 400 });
  }

  try {
    const commentsQuery = query(commentsCollection, where('blogId', '==', blogId));
    const querySnapshot = await getDocs(commentsQuery);
    const comments = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'An error occurred while fetching comments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { blogId, name, comment } = await req.json();

    if (!blogId || !name || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const createdAt = new Date().toISOString();
    const newComment = await addDoc(commentsCollection, {
      blogId,
      name,
      comment,
      createdAt,
    });

    return NextResponse.json(
      { id: newComment.id, blogId, name, comment, createdAt },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'An error occurred while creating the comment' }, { status: 500 });
  }
}


// old code
// import { NextRequest, NextResponse } from 'next/server';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
//   };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const commentsCollection = collection(db, 'comments');

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const blogId = searchParams.get('blogId');

//   if (!blogId) {
//     return NextResponse.json({ error: 'Missing blogId' }, { status: 400 });
//   }

//   try {
//     const commentsQuery = query(commentsCollection, where('blogId', '==', blogId));
//     const querySnapshot = await getDocs(commentsQuery);
//     const comments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return NextResponse.json(comments);
//   } catch (error) {
//     console.error('Error fetching comments:', error);
//     return NextResponse.json({ error: 'An error occurred while fetching comments' }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { blogId, name, comment } = await req.json();
    
//     if (!blogId || !name || !comment) {
//       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
//     }
    
//     const newComment = await addDoc(commentsCollection, {
//       blogId,
//       name,
//       comment,
//       createdAt: new Date().toISOString(),
//     });
    
//     return NextResponse.json({ id: newComment.id, blogId, name, comment, createdAt: new Date().toISOString() }, { status: 201 });
//   } catch (error) {
//     console.error('Error creating comment:', error);
//     return NextResponse.json({ error: 'An error occurred while creating the comment' }, { status: 500 });
//   }
// }

