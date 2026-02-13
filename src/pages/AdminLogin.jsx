import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
    const { login, signup, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const validateForm = () => {
        if (!email || !password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            return false;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('유효한 이메일을 입력해주세요.');
            return false;
        }

        if (password.length < 6) {
            setError('비밀번호는 최소 6자 이상이어야 합니다.');
            return false;
        }

        if (isSignup && password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            if (isSignup) {
                await signup(email, password);
            } else {
                await login(email, password);
            }
            navigate('/');
        } catch (err) {
            // Firebase 에러 메시지 한국어로 변환
            const errorMessages = {
                'auth/email-already-in-use': '이미 가입된 이메일입니다.',
                'auth/user-not-found': '가입되지 않은 이메일입니다.',
                'auth/wrong-password': '비밀번호가 잘못되었습니다.',
                'auth/invalid-email': '유효하지 않은 이메일입니다.',
                'auth/weak-password': '비밀번호가 너무 약합니다.',
            };
            
            setError(errorMessages[err.code] || err.message || '오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-red-500 via-yellow-500 to-green-500"></div>

                <div className="text-center mb-10">
                    <div className="inline-flex p-5 rounded-full bg-white/5 text-primary mb-6 ring-1 ring-white/10">
                        <Lock size={40} strokeWidth={1.5} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight mb-4">
                        {isSignup ? '회원가입' : '로그인'}
                    </h1>
                    <p className="text-secondary leading-relaxed">
                        {isSignup 
                            ? '계정을 생성하세요.' 
                            : '문의 폼 작성 및 관리자 기능을 이용하시려면로그인해주세요.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-white font-semibold">
                            이메일
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary" size={20} />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@email.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-white font-semibold">
                            비밀번호
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Input (Signup only) */}
                    {isSignup && (
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-white font-semibold">
                                비밀번호 확인
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-xl"
                    >
                        {loading ? '진행 중...' : (isSignup ? '회원가입' : '로그인')}
                    </button>
                </form>

                {/* Toggle Signup/Login */}
                <div className="mt-8 text-center">
                    <p className="text-secondary text-sm">
                        {isSignup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
                        <button
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                                setEmail('');
                                setPassword('');
                                setConfirmPassword('');
                            }}
                            className="ml-2 text-primary hover:text-blue-400 font-semibold transition-colors"
                        >
                            {isSignup ? '로그인' : '회원가입'}
                        </button>
                    </p>
                </div>

                {/* Back to Home */}
                <button
                    onClick={() => navigate('/')}
                    className="w-full mt-6 py-3 text-secondary hover:text-white transition-colors text-sm font-medium"
                >
                    메인 페이지로 돌아가기
                </button>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <p className="text-xs text-secondary/40 font-medium tracking-widest uppercase">
                        Secure Authentication by Firebase
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
