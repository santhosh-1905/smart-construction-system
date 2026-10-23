import { DemoProvider } from './demo/DemoContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <DemoProvider>
      <AppRoutes />
    </DemoProvider>
  );
}