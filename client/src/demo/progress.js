// Planned progress: how much of the task should be done by today, based on dates.
export function plannedPercent(task) {
  const start = new Date(task.startDate).getTime();
  const end = new Date(task.deadline).getTime();
  const now = Date.now();
  if (now <= start) return 0;
  if (now >= end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
}

// Project progress = weighted average of task completion (verified work only).
export function projectProgress(tasks) {
  const active = tasks.filter((task) => task.status !== 'cancelled');
  const totalWeight = active.reduce((sum, task) => sum + task.weight, 0);
  if (!totalWeight) return { actual: 0, planned: 0 };

  const actual = active.reduce((sum, task) => sum + task.weight * task.completion, 0) / totalWeight;
  const planned = active.reduce((sum, task) => sum + task.weight * plannedPercent(task), 0) / totalWeight;
  return { actual: Math.round(actual), planned: Math.round(planned) };
}

export function projectState(actual, planned) {
  const gap = planned - actual;
  if (gap >= 15) return { label: 'Delayed', tone: 'bad', gap };
  if (gap >= 5) return { label: 'At risk', tone: 'warning', gap };
  return { label: 'On track', tone: 'good', gap };
}

export function isTaskOverdue(task) {
  const finished = task.status === 'completed' || task.status === 'cancelled';
  return !finished && new Date(task.deadline).getTime() < Date.now();
}