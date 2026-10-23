import { createContext, useContext, useEffect, useState } from 'react';
import { seedData } from './seedData.js';

const DATA_KEY = 'demo-data-v1';
const USER_KEY = 'demo-user-id';

const DemoContext = createContext(null);

const newId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
const todayText = () => new Date().toISOString().slice(0, 10);

function loadData() {
  try {
    const saved = localStorage.getItem(DATA_KEY);
    return saved ? JSON.parse(saved) : seedData;
  } catch {
    return seedData;
  }
}

export function DemoProvider({ children }) {
  const [data, setData] = useState(loadData);
  const [userId, setUserId] = useState(() => localStorage.getItem(USER_KEY));

  useEffect(() => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  }, [data]);

  const currentUser = data.users.find((user) => user.id === userId) || null;

  const value = {
    data,
    currentUser,

    login(id) {
      localStorage.setItem(USER_KEY, id);
      setUserId(id);
    },
    logout() {
      localStorage.removeItem(USER_KEY);
      setUserId(null);
    },
    resetDemo() {
      localStorage.removeItem(USER_KEY);
      setUserId(null);
      setData(seedData);
    },

    addTask(task) {
      setData((prev) => ({
        ...prev,
        tasks: [{ ...task, id: newId('t'), completion: 0 }, ...prev.tasks],
      }));
    },

    submitReport(report) {
      setData((prev) => ({
        ...prev,
        reports: [
          { ...report, id: newId('r'), date: todayText(), status: 'pending', engineerId: userId, projectId: currentUser.projectId },
          ...prev.reports,
        ],
        tasks: prev.tasks.map((task) =>
          task.id === report.taskId && task.status === 'assigned' ? { ...task, status: 'in_progress' } : task
        ),
      }));
    },

    // Only verified work changes the official task completion.
    reviewReport(reportId, approved) {
      setData((prev) => {
        const report = prev.reports.find((item) => item.id === reportId);
        if (!report) return prev;
        return {
          ...prev,
          reports: prev.reports.map((item) =>
            item.id === reportId ? { ...item, status: approved ? 'verified' : 'rejected' } : item
          ),
          tasks: approved
            ? prev.tasks.map((task) =>
                task.id === report.taskId
                  ? { ...task, completion: report.percent, status: report.percent >= 100 ? 'completed' : 'in_progress' }
                  : task
              )
            : prev.tasks,
        };
      });
    },

    requestMaterial(request) {
      setData((prev) => ({
        ...prev,
        materialRequests: [
          { ...request, id: newId('m'), projectId: currentUser.projectId, requestedBy: userId, date: todayText(), status: 'pending' },
          ...prev.materialRequests,
        ],
      }));
    },

    decideMaterial(requestId, status) {
      setData((prev) => ({
        ...prev,
        materialRequests: prev.materialRequests.map((item) => (item.id === requestId ? { ...item, status } : item)),
      }));
    },

    reportIssue(issue) {
      setData((prev) => ({
        ...prev,
        issues: [
          { ...issue, id: newId('i'), projectId: currentUser.projectId, reportedBy: userId, date: todayText(), status: 'open' },
          ...prev.issues,
        ],
      }));
    },

    closeIssue(issueId) {
      setData((prev) => ({
        ...prev,
        issues: prev.issues.map((item) => (item.id === issueId ? { ...item, status: 'closed' } : item)),
      }));
    },
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  return useContext(DemoContext);
}
