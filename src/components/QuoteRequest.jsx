import { Send, CheckCircle2, AlertCircle, Loader2, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const QuoteRequest = () => {
    const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
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
        <section id="quote" className="py-24 bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight mb-6">제품 / 수리 / 유지보수 일반문의</h2>
                        <p className="text-secondary text-lg mb-8 leading-relaxed">
                            단순 기구 문의 부터 유지보수 진행시 예상되는 예산 금액 등. 전문가가 직접 분석하여 안내를 드립니다.
                        </p>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                                <div>
                                    <h4 className="font-bold mb-1">기구 및 수리 문의</h4>
                                    <p className="text-secondary text-sm">구매 예정이거나, 수리가 필요하시다면</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">2</div>
                                <div>
                                    <h4 className="font-bold mb-1">유지보수 문의</h4>
                                    <p className="text-secondary text-sm">기구 종류 및 개수와 소모품에 따른 유지보수 예산 등.</p>
                                </div>
                            </div>
                        </div>

                        {/* 유지보수 작업 이미지 */}
                        <div className="mt-8 relative overflow-hidden rounded-2xl group">
                            <img
                                src="https://github.com/chixun1314/imgage-center/blob/main/%ED%97%AC%EC%8A%A4%EC%9E%A5%20%EC%9A%B4%EB%8F%99%EA%B8%B0%EA%B5%AC%20%EC%88%98%EB%A6%AC%20%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98%20(7).png?raw=true"
                                alt="BODY SPORTS"
                                className="w-full h-[300px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                        </div>
                    </div>

                    <div className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden group">
                        {!isAuthenticated ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="h-20 w-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 ring-4 ring-primary/5 transition-transform group-hover:scale-110 duration-500">
                                    <Lock className="h-10 w-10 text-primary/40" strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">로그인 후 이용 가능합니다</h3>
                                <p className="text-secondary mb-10 max-w-[280px] leading-relaxed">
                                    안전한 서비스 이용과 개인정보 보호를 위해 Google 계정 로그인이 필요합니다.
                                </p>
                                <a
                                    href="https://smartstore.naver.com/body-sports"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary w-full flex items-center justify-center gap-3 py-4 shadow-xl hover:shadow-primary/20"
                                >
                                    견적 및 상담신청
                                    <Send className="h-5 w-5" />
                                </a>
                            </div>
                        ) : status === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                                <CheckCircle2 className="h-16 w-16 text-primary mb-6" />
                                <h3 className="text-2xl font-bold mb-2">신청이 완료되었습니다</h3>
                                <p className="text-secondary font-medium tracking-tight italic">"{user?.name}님, 확인 후 빠르게 연락드리겠습니다."</p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-8 text-primary font-bold hover:underline"
                                >
                                    추가 문의하기
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">성함 / 담당자명</label>
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
                                        <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">이메일 주소</label>
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
                                    <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">시설 유형</label>
                                    <select
                                        name="facility_type"
                                        className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none text-secondary"
                                    >
                                        <option>상업용 헬스장 (Gym)</option>
                                        <option>개인 홈짐</option>
                                        <option>기업용 사내 헬스장</option>
                                        <option>관공서 및 학교</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-secondary mb-2">문의 내용</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        required
                                        className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="프로젝트에 대해 알려주세요..."
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

                                <a
                                    href="https://smartstore.naver.com/body-sports"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full btn-primary flex items-center justify-center gap-2"
                                >
                                    견적 및 상담신청
                                    <Send className="h-4 w-4" />
                                </a>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default QuoteRequest;
