/**
 * Безопасный fetch с проверкой Content-Type
 * Предотвращает ошибки "Unexpected token '<'" при получении HTML вместо JSON
 */

export interface SafeFetchError extends Error {
  status: number;
  body: any;
}

export async function safeFetch(input: RequestInfo, init?: RequestInit) {
  const res = await fetch(input, init);
  const contentType = res.headers.get("content-type") || "";
  
  if (!res.ok) {
    // Пытаемся получить JSON ошибку, если нет - текст
    let body: any;
    try {
      if (contentType.includes("application/json")) {
        body = await res.json();
      } else {
        body = await res.text();
      }
    } catch {
      body = { error: "Failed to parse response" };
    }
    
    const err = new Error(`HTTP ${res.status}`) as SafeFetchError;
    err.status = res.status;
    err.body = body;
    throw err;
  }
  
  // Проверяем Content-Type перед парсингом
  if (contentType.includes("application/json")) {
    return res.json();
  }
  
  // Если не JSON - возвращаем как текст
  return res.text();
}

/**
 * Специальная функция для API запросов с обработкой 401
 */
export async function apiFetch(input: RequestInfo, init?: RequestInit) {
  try {
    return await safeFetch(input, {
      ...init,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    });
  } catch (error) {
    if (error instanceof Error && 'status' in error) {
      const safeError = error as SafeFetchError;
      
      // Если 401 - пользователь не авторизован
      if (safeError.status === 401) {
        // Можно добавить логику перенаправления на логин
        console.warn('Unauthorized request, redirecting to login');
        window.location.href = '/login';
        return;
      }
      
      // Если 403 - нет прав доступа
      if (safeError.status === 403) {
        console.warn('Forbidden request');
        throw new Error('Access denied');
      }
    }
    
    throw error;
  }
}

