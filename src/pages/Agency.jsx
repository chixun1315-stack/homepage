import { Shield, Target, Users, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';

const Agency = () => {
    return (
        <div className="pt-32 pb-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-24">
                    <span className="text-accent font-black tracking-[0.5em] mb-4 block uppercase underline underline-offset-8">About BODY SPORTS</span>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-tight">
                        피트니스의 완성, <br />
                        <span className="text-white/20 outline-text">장비의 전문성</span>에서 시작됩니다
                    </h1>
                    <p className="text-xl text-secondary max-w-3xl mx-auto">
                        BODY SPORTS는 지난 20년간 오직 '더 나은 운동 머신'만을 고민해왔습니다. 철저한 품질 관리를 통해 전 지역 헬스장의 파트너가 되고 있습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                    <div className="relative rounded-[3rem] overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80" alt="Factory" className="w-full h-full object-cover grayscale group-hover:scale-110 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute bottom-12 left-12">
                            <h3 className="text-3xl font-bold mb-4">설계, 오더 시스템<br />BODY SPORTS SYSTEM</h3>
                            <p className="text-secondary max-w-md">설계와 유통 그리고 품질 3가지를 고민하여 운동환경의 만족도를 높였습니다.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-8">
                        {[
                            { icon: <Factory />, title: "국내외 주문 설계 검토", desc: "검증된 원자재와 정밀 가공 기술을 통한 제품 운영" },
                            { icon: <Target />, title: "머신 호환 연구", desc: "유지보수를 단순 수리가 아닌 분석을 통해 업그레이드 지원" },
                            { icon: <Shield />, title: "평생 책임 서비스", desc: "단순 판매가 아닌, 제품 수명이 다할 때까지 이어지는 AS 시스템" },
                            { icon: <Users />, title: "B2B 토탈 솔루션", desc: "공간 기획부터 장비 배치, 마케팅 지원까지 원스톱 지원" }
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 rounded-3xl flex items-start gap-6 hover:bg-white/5 transition-colors">
                                <div className="text-primary p-3 bg-white/5 rounded-2xl">{item.icon}</div>
                                <div>
                                    <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                                    <p className="text-secondary text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface rounded-[4rem] p-12 md:p-24 text-center">
                    <h2 className="text-4xl font-black mb-8">당신의 비즈니스를 BODY SPORTS와 함께 시작하세요</h2>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link to="/product-inquiry" className="btn-primary px-12 py-5 text-lg">파트너십 문의하기</Link>
                        <a 
                            href="https://smartstore.naver.com/body-sports"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary px-12 py-5 text-lg inline-block"
                        >
                            카탈로그 다운로드
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Agency;
