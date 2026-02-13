import { Wrench, Clock, Shield, Send, CheckCircle2, AlertCircle, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ASService = () => {
    const [status, setStatus] = useState('idle');
    const { user, isAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;
        setStatus('submitting');

        const formData = new FormData(e.target);

        try {
            const response = await fetch('https://formspree.io/f/xlgwgqzg', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus('success');
                e.target.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="pt-32 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black mb-6 tracking-tighter">AS & 유지보수 신청</h1>
                    <p className="text-xl text-secondary max-w-2xl mx-auto">
                        BODY SPORTS는 제품 판매 이후의 가치를 더 중요하게 생각합니다. 전문 엔지니어가 신속하게 방문하여 해결해 드립니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                    {[
                        { icon: <Clock className="h-8 w-8" />, title: "24시간 접수", desc: "온라인을 통해 언제 어디서든 AS 접수가 가능합니다." },
                        { icon: <Wrench className="h-8 w-8" />, title: "전문가 방문", desc: "피트니스 기구 전문 엔지니어가 48시간 이내에 방문합니다." },
                        { icon: <Shield className="h-8 w-8" />, title: "정품 부품 사용", desc: "모든 수리는 BODY SPORTS 정품 부품만을 사용하여 내구성을 보장합니다." }
                    ].map((item, i) => (
                        <div key={i} className="glass p-8 rounded-3xl text-center">
                            <div className="inline-flex p-4 rounded-2xl bg-primary/5 text-primary mb-6">{item.icon}</div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-secondary">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* 유지보수 작업 이미지 갤러리 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="relative overflow-hidden rounded-3xl group">
                        <img
                            src="https://github.com/chixun1314/imgage-center/blob/main/%ED%97%AC%EC%8A%A4%EC%9E%A5%20%EC%9A%B4%EB%8F%99%EA%B8%B0%EA%B5%AC%20%EC%88%98%EB%A6%AC%20%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98%20(6).png?raw=true"
                            alt="BODY SPORTS 전문 유지보수 작업"
                            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <p className="text-white font-bold text-lg">전문 엔지니어의 정밀 작업</p>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-3xl group">
                        <img
                            src="https://github.com/chixun1314/imgage-center/blob/main/%ED%97%AC%EC%8A%A4%EC%9E%A5%20%EC%9A%B4%EB%8F%99%EA%B8%B0%EA%B5%AC%20%EC%88%98%EB%A6%AC%20%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98%20(5).png?raw=true"
                            alt="BODY SPORTS 기구 수리 및 점검"
                            className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <p className="text-white font-bold text-lg">정품 부품을 사용한 수리</p>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-[2rem] relative overflow-hidden group">
                    {!isAuthenticated ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="h-24 w-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-10 ring-4 ring-primary/5 transition-transform group-hover:scale-110 duration-500">
                                <Lock className="h-12 w-12 text-primary/40" strokeWidth={1.5} />
                            </div>
                            <h2 className="text-3xl font-bold mb-6 tracking-tight">로그인 후 AS 신청이 가능합니다</h2>
                            <p className="text-secondary mb-12 max-w-[320px] leading-relaxed mx-auto">
                                담당 엔지니어 배정 및 신속한 서비스 제공을 위해 <br />
                                Google 계정 인증이 반드시 필요합니다.
                            </p>
                            <Link
                                to="/admin"
                                className="btn-primary flex items-center justify-center gap-4 py-5 px-10 shadow-2xl hover:shadow-primary/20 text-lg"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google로 인증 완료하기
                            </Link>
                        </div>
                    ) : status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-300">
                            <CheckCircle2 className="h-16 w-16 text-primary mb-6" />
                            <h2 className="text-2xl font-bold mb-2">AS 신청이 접수되었습니다</h2>
                            <p className="text-secondary font-medium tracking-tight italic">"{user?.name}님, 영업일 기준 48시간 이내에 방문하겠습니다."</p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 text-primary font-bold hover:underline"
                            >
                                추가 AS 신청하기
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    <Wrench className="h-6 w-6 text-primary" /> 수리 문의 작성
                                </h2>
                                <div className="text-xs text-secondary font-medium px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                    {user?.name}님 로그인 중
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">고객명 / 업체명</label>
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            defaultValue={user?.name}
                                            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="홍길동"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">연락처</label>
                                        <input
                                            name="phone"
                                            type="tel"
                                            required
                                            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="010-0000-0000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">이메일</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            defaultValue={user?.email}
                                            className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">기구 모델명</label>
                                    <input
                                        name="model"
                                        type="text"
                                        className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="G-PRO 파워 랙 등"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">상세 증상</label>
                                    <textarea
                                        name="symptoms"
                                        rows="5"
                                        required
                                        className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="수리가 필요한 부분에 대해 상세히 적어주세요..."
                                    ></textarea>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-secondary mb-4">
                                    <input
                                        name="privacy_consent"
                                        type="checkbox"
                                        id="privacy"
                                        required
                                        className="rounded border-white/10 bg-background/50 text-primary focus:ring-primary h-4 w-4"
                                    />
                                    <label htmlFor="privacy" className="cursor-pointer">
                                        <Link to="/privacy" className="text-primary hover:underline underline-offset-4">개인정보 수집</Link> 및 이용에 동의 합니다.
                                    </label>
                                </div>

                                {status === 'error' && (
                                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 text-sm">
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="w-full btn-primary flex items-center justify-center gap-2 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            전송 중...
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            AS 신청 완료하기
                                            <Send className="h-4 w-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ASService;
