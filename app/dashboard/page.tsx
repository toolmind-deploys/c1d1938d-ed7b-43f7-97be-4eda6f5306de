import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Grid, Metric, Text } from '@tremor/react';

async function getDashboardData() {
  try {
    const res = await fetch('http://localhost:3000/api/dashboard', { 
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default async function DashboardPage() {
  let data;
  try {
    data = await getDashboardData();
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error loading dashboard data. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  if (!data?.items?.length) {
    return (
      <div className="p-4">
        <Alert>
          <AlertDescription>
            No dashboard items found.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.items.map((item: any) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{item.title || 'Untitled Item'}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Metric>{item.value || '0'}</Metric>
                <Text>{item.description || 'No description available'}</Text>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Loading state
export function Loading() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-[150px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}