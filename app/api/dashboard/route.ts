import { firestore } from 'firebase-admin';
import { initFirebaseAdminSDK } from '@/config/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

initFirebaseAdminSDK();
const fsdb = firestore();

export async function GET() {
  try {
    const dashboardRef = fsdb.collection('dashboard_items');
    const snapshot = await dashboardRef.get();
    
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Error fetching dashboard items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard items' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const dashboardRef = fsdb.collection('dashboard_items');
    
    const docRef = await dashboardRef.add({
      ...data,
      createdAt: firestore.Timestamp.now()
    });

    return NextResponse.json({ 
      id: docRef.id,
      message: 'Item created successfully' 
    });
  } catch (error) {
    console.error('Error creating dashboard item:', error);
    return NextResponse.json(
      { error: 'Failed to create dashboard item' },
      { status: 500 }
    );
  }
}