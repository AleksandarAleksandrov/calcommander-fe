import { googleSignInAction } from '@/store/loginSlice';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function GoogleRedirect() {
    const [searchParams] = useSearchParams();
    
    // Get specific query parameters
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    const dispatch = useDispatch();

    dispatch(googleSignInAction({ credential: code as string }) as any); 
    
    // Get all query parameters as an object
    const allParams = Object.fromEntries(searchParams);
    
    return (
        <div>
            <h1>Google Redirect</h1>
            <div>
                <h2>Query Parameters:</h2>
                <p><strong>Code:</strong> {code || 'Not found'}</p>
                <p><strong>State:</strong> {state || 'Not found'}</p>
                <p><strong>Error:</strong> {error || 'Not found'}</p>
                
                <h3>All Parameters:</h3>
                <pre>{JSON.stringify(allParams, null, 2)}</pre>
            </div>
        </div>
    )
}