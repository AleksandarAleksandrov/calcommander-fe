// Enhanced API thunk factory
export const createApiThunk = (type: string, endpoint: string, method = 'GET', options: any = {}) => {
    return (data = null) => async (dispatch: any, getState: any) => {
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
        
        const response = await fetch(`https://api.example.com${endpoint}`, fetchOptions);
        
        const responseData = await response.json();
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (!response.ok) {
          throw { 
            status: response.status, 
            data: responseData,
            message: responseData.message || 'API request failed'
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