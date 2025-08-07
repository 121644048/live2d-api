// 注意：对于纯Edge环境，应使用这种导入方式
import { NextResponse } from 'next/server';

export function middleware(request) {
  // 定义允许访问的域名白名单
  const allowedOrigins = [
    'https://sunboy.ltd',    // 主域名
    'https://www.sunboy.ltd', // 子域名
    'http://localhost:4000'       // 本地开发环境（可选）
  ];

  // 获取请求来源
  const origin = request.headers.get('Origin') || request.headers.get('Referer') || '';
  
  // 验证来源是否在白名单内
  const isAllowed = allowedOrigins.some(allowed => 
    origin.startsWith(allowed)
  );

  // 处理请求
  if (isAllowed) {
    return NextResponse.next();
  } else {
    return new Response('Access denied: Domain not in whitelist', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}

// 配置适用的路径
export const config = {
  matcher: [
    '/api/:path*',
    '/images/:path*',
    '/assets/:path*'
  ]
};
