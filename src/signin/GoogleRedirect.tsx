import { clearLoginState, googleSignInAction, RedirectPageStatus } from '@/store/loginSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useCallback } from 'react';
import type { RootState } from '@/store';
import { setAuthData } from '@/utils/auth';
import Loading from '@/components/Loading';

export default function GoogleRedirect() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { redirectPageStatus } = useSelector((state: RootState) => state.login);
    const hasProcessed = useRef(false);

    const code = searchParams.get('code');
    // const state = searchParams.get('state');
    // const error = searchParams.get('error');

    const handleGoogleSignIn = useCallback(async () => {
        if (hasProcessed.current) return;
        hasProcessed.current = true;

        try {
            const { jwt, expiresAt } = await dispatch(googleSignInAction({ credential: code as string }) as any);

            setAuthData(jwt, expiresAt);
            dispatch(clearLoginState());
            navigate("/");
        } catch (error) {
            console.error('Error during Google sign-in:', error);
            // You might want to dispatch an error action here
        }
    }, [code, dispatch, navigate]);

    useEffect(() => {
        if (code && redirectPageStatus === RedirectPageStatus.LOADING && !hasProcessed.current) {
            handleGoogleSignIn();
        }
    }, [code, redirectPageStatus, handleGoogleSignIn]);

    return (
        <div>
            <div>
                {redirectPageStatus === RedirectPageStatus.LOADING && (
                    <Loading />
                )}
            </div>
        </div>
    )
}