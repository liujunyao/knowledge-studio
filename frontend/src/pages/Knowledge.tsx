import { Database } from 'lucide-react';

export default function Knowledge() {
  return (
    <div className="h-full flex flex-col">
      {/* 顶部栏 */}
      <div className="h-16 border-b border-neutral-200 flex items-center px-6 bg-white">
        <h1 className="text-2xl font-bold text-neutral-900">知识库</h1>
      </div>

      {/* 内容区 */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <Database className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">知识库功能</h2>
          <p className="text-neutral-600">即将推出...</p>
        </div>
      </div>
    </div>
  );
}
