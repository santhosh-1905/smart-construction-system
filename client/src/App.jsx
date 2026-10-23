import { ThemeProvider } from './theme/ThemeContext.jsx';
import { ToastProvider } from './components/ui/ToastContext.jsx';
import { DemoProvider } from './demo/DemoContext.jsx';
import SplashScreen from './components/ui/SplashScreen.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DemoProvider>
          <SplashScreen>
            <AppRoutes />
          </SplashScreen>
        </DemoProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}