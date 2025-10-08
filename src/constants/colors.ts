// Цветовая палитра Детский Мир - Голубой и белый
export const colors = {
  // Основные цвета - голубой
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9', // Основной голубой
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
  },
  
  // Акцентный белый/светло-голубой
  accent: {
    50: '#ffffff',
    100: '#f8fafc',
    200: '#f1f5f9',
    300: '#e2e8f0',
    400: '#cbd5e1',
    500: '#94a3b8', // Светло-серый акцент
    600: '#64748b',
    700: '#475569',
    800: '#334155',
    900: '#1e293b',
  },
  
  // Нейтральные цвета
  neutral: {
    50: '#F8F9FA', // Светло-серый (фон)
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#2D3436', // Темно-серый (текст)
  },
  
  // Белый
  white: '#FFFFFF',
  
  // Статусы
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const

// Tailwind CSS классы для быстрого использования
export const colorClasses = {
  primary: {
    bg: 'bg-sky-500',
    text: 'text-sky-500',
    border: 'border-sky-500',
    hover: 'hover:bg-sky-600',
  },
  accent: {
    bg: 'bg-slate-200',
    text: 'text-slate-600',
    border: 'border-slate-300',
    hover: 'hover:bg-slate-300',
  },
  neutral: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-300',
  },
} as const
