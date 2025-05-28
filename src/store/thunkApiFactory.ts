// Enhanced API thunk factory
export const createApiThunk = <T>(type: string, endpoint: string, method = 'GET', options: any = {}) => {
    return (data?: T) => async (dispatch: any, getState: any) => {
      const requestId = Date.now().toString();
      const startTime = performance.now();
      
      // Request action with metadata
      dispatch({
        type: `${type}_REQUEST`,
        payload: {
          requestId,
          endpoint,
          method,
          data,
          timestamp: new Date().toISOString()
        }
      });
      
      try {
        const fetchOptions = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        };
        
        if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
          fetchOptions.body = JSON.stringify(data);
        }
        
        // Get auth token from state if needed
        const state = getState();
        const token = state.auth?.token;
        
        if (token) {
          fetchOptions.headers.Authorization = `Bearer ${token}`;
        }
        
        let fullPath = `http://localhost:8080/api/v1${endpoint}`;
        if(['GET', 'DELETE'].includes(method)) {
          const queryParamsString = new URLSearchParams(data as any).toString();
          fullPath += `?${queryParamsString}`;
        }

        const response = await fetch(fullPath, fetchOptions);
        
        // Check if response has content before trying to parse JSON
        let responseData = null;
        const contentLength = response.headers.get('content-length');
        const contentType = response.headers.get('content-type');
        
        // Only attempt to parse JSON if there's likely to be content
        if (response.status !== 204 && // No Content
            contentLength !== '0' && 
            contentType?.includes('application/json')) {
          try {
            const text = await response.text();
            responseData = text ? JSON.parse(text) : null;
          } catch (jsonError) {
            // If JSON parsing fails but response was successful, treat as success with null data
            if (response.ok) {
              responseData = null;
            } else {
              throw jsonError;
            }
          }
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (!response.ok) {
          throw { 
            status: response.status, 
            data: responseData,
            message: responseData?.message || 'API request failed'
          };
        }
        
        // Success action with complete metadata
        dispatch({
          type: `${type}_SUCCESS`,
          payload: {
            requestId,
            endpoint,
            method,
            data: responseData,
            duration,
            status: response.status,
            timestamp: new Date().toISOString()
          }
        });
        
        return responseData;
      } catch (error: any) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Failure action with error data
        dispatch({
          type: `${type}_FAILURE`,
          payload: {
            requestId,
            endpoint,
            method,
            error: error.message || 'Unknown error',
            status: error.status || 500,
            duration,
            timestamp: new Date().toISOString()
          }
        });
        
        throw error;
      }
    };
  };