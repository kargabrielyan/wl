// Цветовая палитра Детский Мир - Темно-синий и светло-желтый
export const colors = {
  // Основные цвета - темно-синий
  primary: {
    50: '#f0f4f8',
    100: '#d9e2ec',
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#002c45', // Основной темно-синий
    600: '#002238',
    700: '#001d2e',
    800: '#001824',
    900: '#00131a',
  },
  
  // Второстепенный цвет - светло-желтый
  secondary: {
    50: '#fefcf7',
    100: '#fdf8ed',
    200: '#faf0d3',
    300: '#f7e8b9',
    400: '#f4e09f',
    500: '#f3d98c', // Светло-желтый акцент
    600: '#f1d47a',
    700: '#efcf68',
    800: '#edca56',
    900: '#ebc544',
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
    bg: 'bg-primary-500',
    text: 'text-primary-500',
    border: 'border-primary-500',
    hover: 'hover:bg-primary-600',
  },
  secondary: {
    bg: 'bg-secondary-500',
    text: 'text-secondary-500',
    border: 'border-secondary-500',
    hover: 'hover:bg-secondary-600',
  },
  neutral: {
    bg: 'bg-white',
    text: 'text-gray-900',
    border: 'border-gray-300',
  },
} as const
