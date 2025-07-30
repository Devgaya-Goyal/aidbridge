import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>('Testing connection...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        setStatus('Testing Firestore connection...');
        
        // Try to read from a test collection
        const testCollection = collection(db, 'test');
        const snapshot = await getDocs(testCollection);
        
        setStatus(`Connection successful! Found ${snapshot.size} documents in test collection.`);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Firestore connection failed: ${errorMessage}`);
        setStatus('Connection failed');
        console.error('Firestore test error:', err);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">Firebase Connection Test</h3>
      <div className="mb-2">
        <strong>Status:</strong> {status}
      </div>
      {error && (
        <div className="text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="text-sm text-gray-600 mt-2">
        <p>Project ID: aidbridge-3ad6b</p>
        <p>This test will help identify if the issue is with:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Firestore not being enabled</li>
          <li>Security rules blocking access</li>
          <li>Network connectivity issues</li>
        </ul>
      </div>
    </div>
  );
};

export default FirebaseTest; 