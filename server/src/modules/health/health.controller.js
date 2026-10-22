import mongoose from 'mongoose';

const DATABASE_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

export function getHealth(req, res) {
  const database = DATABASE_STATES[mongoose.connection.readyState] || 'unknown';

  res.json({
    success: true,
    status: 'ok',
    database,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
  });
}