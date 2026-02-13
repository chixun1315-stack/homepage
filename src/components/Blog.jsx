import { motion } from 'framer-motion';

const posts = [
    {
        id: 1,
        title: "유튜브 쇼츠로 헬스장 신규 회원 200% 늘리는 법",
        date: "2026.02.05",
        category: "마케팅",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "홈짐 전성시대: 어떤 기구가 가장 잘 팔릴까?",
        date: "2026.01.28",
        category: "트렌드",
        image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "영상에서 운동기구 '타격감' 살리는 촬영 기법",
        date: "2026.01.12",
        category: "콘텐츠 제작",
        image: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=800&q=80"
    }
];

const Blog = () => {
    return (
        <section id="blog" className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="text-4xl font-black tracking-tight mb-4">인사이트</h2>
                        <p className="text-secondary max-w-md">데이터로 분석한 피트니스 마케팅의 최신 트렌드를 확인하세요.</p>
                    </div>
                    <a
                        href="https://blog.naver.com/teajini"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block text-sm font-bold border-b border-primary pb-1 hover:text-primary transition-colors cursor-pointer"
                    >
                        전체 보기
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {posts.map((post, index) => (
                        <a
                            key={post.id}
                            href="https://blog.naver.com/teajini"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block cursor-pointer group"
                        >
                            <motion.article
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative aspect-video overflow-hidden rounded-2xl mb-6">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 blur-[2px] group-hover:blur-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                                </div>
                                <div className="flex items-center gap-4 mb-3">
                                    <span className="text-[10px] font-black tracking-[0.2em] uppercase text-accent">{post.category}</span>
                                    <span className="text-[10px] font-medium text-secondary">{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                                    {post.title}
                                </h3>
                            </motion.article>
                        </a>
                    ))}
                </div>

                {/* 유지보수 작업 이미지 갤러리 */}
                <div className="mt-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative overflow-hidden rounded-2xl group">
                            <img
                                src="https://github.com/chixun1314/imgage-center/blob/main/%ED%97%AC%EC%8A%A4%EC%9E%A5%20%EC%9A%B4%EB%8F%99%EA%B8%B0%EA%B5%AC%20%EC%88%98%EB%A6%AC%20%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98%20(4).png?raw=true"
                                alt="BODY SPORTS 유지보수 작업 1"
                                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl group">
                            <img
                                src="https://github.com/chixun1314/imgage-center/blob/main/%ED%97%AC%EC%8A%A4%EC%9E%A5%20%EC%9A%B4%EB%8F%99%EA%B8%B0%EA%B5%AC%20%EC%88%98%EB%A6%AC%20%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98%20(3).png?raw=true"
                                alt="BODY SPORTS 유지보수 작업 2"
                                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="relative overflow-hidden rounded-2xl group">
                            <img
                                src="https://github.com/chixun1314/imgage-center/blob/main/%ED%97%AC%EC%8A%A4%EC%9E%A5%20%EC%9A%B4%EB%8F%99%EA%B8%B0%EA%B5%AC%20%EC%88%98%EB%A6%AC%20%EC%9C%A0%EC%A7%80%EB%B3%B4%EC%88%98%20(2).png?raw=true"
                                alt="BODY SPORTS 유지보수 작업 3"
                                className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
