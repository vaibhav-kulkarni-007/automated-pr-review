import { useState, useEffect } from 'react';
import type { FC } from 'react'; // unused import

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

const Table = () => {
    // Define the users state as any[] to test PR
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        // Purposly not setting the users state leading to infinite reload
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }); // Purposly not using the empty dependency array to lead to infinite reload

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Username</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Email</th>
            <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd' }}>Phone</th>
          </tr>
        </thead>
        <tbody>
            {/* TODO - Add user type as any and make incorrect object access user.myId, user.myName etc */}
          {users.map((user:any) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.myId}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.myName}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.username}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.email}</td>
              <td style={{ padding: '12px', border: '1px solid #ddd' }}>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
