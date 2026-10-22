import { useEffect, useState } from 'react';
import { fetchHealth } from '../../api/healthApi.js';
import Button from '../../components/ui/Button.jsx';
import StatusBadge from '../../components/ui/StatusBadge.jsx';

export default function SystemStatusPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  async function checkHealth() {
    setLoading(true);
    setFailed(false);
    try {
      setHealth(await fetchHealth());
    } catch {
      setHealth(null);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkHealth();
  }, []);

  const serverTone = failed ? 'bad' : health ? 'good' : 'neutral';
  const serverLabel = failed ? 'Not reachable' : health ? 'Running' : 'Checking...';
  const databaseConnected = health?.database === 'connected';
  const databaseTone = !health ? 'neutral' : databaseConnected ? 'good' : 'bad';
  const databaseLabel = !health ? 'Unknown' : databaseConnected ? 'Connected' : health.database;

  return (
    <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">System Status</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg">Server</span>
          <StatusBadge label={serverLabel} tone={serverTone} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg">Database</span>
          <StatusBadge label={databaseLabel} tone={databaseTone} />
        </div>
      </div>

      {failed && (
        <p className="mt-4 text-sm text-red-700">
          Cannot reach the server. Please start the backend and try again.
        </p>
      )}

      <div className="mt-6">
        <Button onClick={checkHealth} disabled={loading} fullWidth>
          {loading ? 'Checking...' : 'Check Again'}
        </Button>
      </div>
    </div>
  );
}