import { useState, useEffect, useMemo } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { isFirebaseAuthConfigured } from '../../lib/firebase';
import {
    sendFirebasePhoneOtp,
    confirmFirebaseSmsCode,
    resetFirebasePhoneAuth,
} from '../../lib/firebasePhoneAuth';

/** Firebase SMS codes are 6 digits in normal flows. */
const OTP_LENGTH = 6;

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
    const firebaseReady = useMemo(() => isFirebaseAuthConfigured(), []);
    const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { loginWithFirebaseToken } = useAuth();

    useEffect(() => {
        if (isOpen) {
            setStep('mobile');
            setMobile('');
            setOtp('');
        } else {
            void resetFirebasePhoneAuth();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    if (!firebaseReady) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 md:p-8 relative">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="font-heading text-xl font-bold text-gray-900 pr-8">Login unavailable</h2>
                    <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                        Phone login uses Firebase. Add all <code className="text-xs bg-tawang-beige px-1 rounded">VITE_FIREBASE_*</code>{' '}
                        variables to <code className="text-xs bg-tawang-beige px-1 rounded">frontend/.env</code>, restart{' '}
                        <code className="text-xs bg-tawang-beige px-1 rounded">npm run dev</code>, and redeploy on Vercel.
                    </p>
                    <p className="text-gray-500 mt-2 text-xs">
                        Backend must have <code className="bg-tawang-beige px-1 rounded">FIREBASE_SERVICE_ACCOUNT_JSON</code> set for
                        token exchange.
                    </p>
                </div>
            </div>
        );
    }

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!/^\d{10}$/.test(mobile)) {
            toast.error('Please enter a valid 10-digit mobile number');
            return;
        }

        setIsLoading(true);
        try {
            await sendFirebasePhoneOtp(`+91${mobile}`, 'firebase-recaptcha');
            toast.success('OTP sent to your phone');
            setStep('otp');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Failed to send OTP';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== OTP_LENGTH) {
            toast.error(`Enter the ${OTP_LENGTH}-digit code from your SMS`);
            return;
        }

        setIsLoading(true);
        try {
            const idToken = await confirmFirebaseSmsCode(otp);
            await loginWithFirebaseToken(mobile, idToken);
            onSuccess();
            onClose();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Verification failed';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-200">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-6 md:p-8">
                    <div id="firebase-recaptcha" className="sr-only" aria-hidden="true" />

                    <div className="text-center mb-8">
                        <h2 className="font-heading text-2xl font-bold text-gray-900">
                            {step === 'mobile' ? 'Login' : 'Verify OTP'}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {step === 'mobile'
                                ? 'Enter your mobile number to continue'
                                : `Enter the code sent to +91 ${mobile}`}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">Secured with Firebase Phone Authentication</p>
                    </div>

                    {step === 'mobile' ? (
                        <form onSubmit={handleSendOtp} className="space-y-4">
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        value={mobile}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                                            setMobile(val);
                                        }}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tawang-gold focus:border-tawang-gold transition-all outline-none"
                                        placeholder="Enter 10 digit number"
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={mobile.length !== 10 || isLoading}
                                className="w-full py-3 px-4 bg-tawang-gold hover:bg-tawang-gold text-white/90 font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get OTP'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                                    SMS code
                                </label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    id="otp"
                                    value={otp}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, '').slice(0, OTP_LENGTH);
                                        setOtp(val);
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-tawang-gold focus:border-tawang-gold transition-all outline-none text-center text-lg tracking-widest"
                                    placeholder="6-digit code"
                                    autoFocus
                                    autoComplete="one-time-code"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={otp.length !== OTP_LENGTH || isLoading}
                                className="w-full py-3 px-4 bg-tawang-gold hover:bg-tawang-gold text-white/90 font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Proceed'}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setStep('mobile');
                                    void resetFirebasePhoneAuth();
                                }}
                                className="w-full text-sm text-tawang-gold hover:text-tawang-gold hover:underline"
                            >
                                Change mobile number
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
