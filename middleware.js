// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 1. 定义允许访问的域名白名单（含协议，如https）
  const allowedOrigins = [
    'https://sunboy.ltd',    // 主域名
    'https://www.sunboy.ltd', // 子域名
    'http://localhost:4000'       // 本地开发环境（可选）
  ];

  // 2. 获取请求来源（优先从Origin头获取，其次是Referer）
  const origin = request.headers.get('Origin') || request.headers.get('Referer') || '';
  
  // 3. 验证来源是否在白名单内
  const isAllowed = allowedOrigins.some(allowed => {
    // 精确匹配或域名前缀匹配（如允许子域名）
    return origin.startsWith(allowed);
  });

  // 4. 白名单内的请求正常放行，否则返回403禁止访问
  if (isAllowed) {
    return NextResponse.next();
  } else {
    return new Response('Access denied: Domain not in whitelist', { status: 403 });
  }
}

// 5. 配置需要应用白名单的路径（可选，不配置则对所有路径生效）
export const config = {
  matcher: [
    '/api/:path*',    // 保护API接口
    '/images/:path*', // 保护图片资源
    '/assets/:path*'  // 保护静态资源
  ]
};
