/**
 * Knowledge Studio - Interactive Prototype
 * Main JavaScript file for all interactions
 */

// ============================================
// Global State
// ============================================

let currentConversation = 1;
let knowledgePoints = [];
let selectedStatus = 'not-understood';

// ============================================
// Sidebar Functions
// ============================================

/**
 * Toggle sidebar collapsed state
 */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('collapsed');
}

/**
 * Toggle project folder expand/collapse
 */
function toggleFolder(element) {
  const folder = element.closest('.project-folder');
  folder.classList.toggle('collapsed');
}

/**
 * Load a conversation
 */
function loadConversation(id) {
  // Update active state
  document.querySelectorAll('.conversation-card').forEach(card => {
    card.classList.remove('active');
  });
  event.currentTarget.classList.add('active');

  // Update conversation ID
  currentConversation = id;

  // Here you would load the actual conversation data
  console.log('Loading conversation:', id);
}

/**
 * Create new conversation
 */
function createNewConversation() {
  console.log('Creating new conversation...');

  // Check if template was selected
  const templateData = localStorage.getItem('newConversation');
  if (templateData) {
    const template = JSON.parse(templateData);
    console.log('Using template:', template);

    // Update chat title
    const titleElement = document.querySelector('.chat-title');
    if (titleElement) {
      titleElement.textContent = template.title;
    }

    // Pre-fill input
    const inputElement = document.querySelector('.chat-input');
    if (inputElement) {
      inputElement.value = template.prompt;
      inputElement.focus();
    }

    // Clear template from storage
    localStorage.removeItem('newConversation');
  } else {
    // Regular new conversation
    alert('创建新对话功能');
  }
}

// ============================================
// Knowledge Panel Functions
// ============================================

/**
 * Switch knowledge panel tab
 */
function switchKnowledgeTab(tabIndex, element) {
  // Update tab states
  document.querySelectorAll('.knowledge-panel-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  element.classList.add('active');

  // Update content based on tab
  const content = document.getElementById('knowledgeContent');

  switch(tabIndex) {
    case 0: // 知识点
      content.innerHTML = generateKnowledgePointsHTML();
      break;
    case 1: // 探索链
      content.innerHTML = generateExplorationChainHTML();
      break;
    case 2: // 图谱
      content.innerHTML = generateKnowledgeGraphHTML();
      break;
  }
}

/**
 * Generate Knowledge Points HTML
 */
function generateKnowledgePointsHTML() {
  return `
    <!-- Not Understood Group -->
    <div class="knowledge-point-group">
      <div class="knowledge-point-group-title">
        <span>❓ 不理解 (2)</span>
      </div>

      <div class="knowledge-point-card">
        <div class="knowledge-point-card-title">React.memo()</div>
        <div class="knowledge-point-card-meta">来自: GPT-4 · 14:30</div>
        <div class="knowledge-point-card-actions">
          <button class="btn btn-ghost btn-sm">查看详情</button>
          <button class="btn btn-primary btn-sm" onclick="showExplorationModal()">深入探索 →</button>
        </div>
      </div>

      <div class="knowledge-point-card">
        <div class="knowledge-point-card-title">虚拟列表实现</div>
        <div class="knowledge-point-card-meta">来自: GPT-4 · 14:32</div>
        <div class="knowledge-point-card-actions">
          <button class="btn btn-ghost btn-sm">查看详情</button>
          <button class="btn btn-primary btn-sm" onclick="showExplorationModal()">深入探索 →</button>
        </div>
      </div>
    </div>

    <!-- Partially Understood Group -->
    <div class="knowledge-point-group">
      <div class="knowledge-point-group-title">
        <span>⚠️ 学习中 (1)</span>
      </div>

      <div class="knowledge-point-card">
        <div class="knowledge-point-card-title">useMemo</div>
        <div class="knowledge-point-card-meta">来自: GPT-4 · 14:30</div>
        <div class="knowledge-point-card-actions">
          <button class="btn btn-ghost btn-sm">查看详情</button>
          <button class="btn btn-primary btn-sm" onclick="showExplorationModal()">深入探索 →</button>
        </div>
      </div>
    </div>

    <!-- Mastered Group -->
    <div class="knowledge-point-group">
      <div class="knowledge-point-group-title">
        <span>✅ 已掌握 (1)</span>
      </div>

      <div class="knowledge-point-card">
        <div class="knowledge-point-card-title">虚拟列表</div>
        <div class="knowledge-point-card-meta">来自: GPT-4 · 14:31</div>
        <div class="knowledge-point-card-actions">
          <button class="btn btn-ghost btn-sm">查看详情</button>
        </div>
      </div>
    </div>

    <hr class="divider">

    <button class="btn btn-secondary btn-sm w-full">清空所有</button>
  `;
}

/**
 * Generate Exploration Chain HTML
 */
function generateExplorationChainHTML() {
  return `
    <div class="mb-4">
      <label class="text-sm font-medium mb-2 block">选择探索链:</label>
      <select class="input input-sm w-full">
        <option>React 性能优化 (3 层)</option>
        <option>TypeScript 类型系统 (2 层)</option>
        <option>虚拟 DOM 原理 (4 层)</option>
      </select>
    </div>

    <div style="font-family: monospace; font-size: 12px; line-height: 1.8; color: var(--text-primary);">
      <div style="margin-bottom: 8px;">
        <span style="color: var(--primary-500);">🔵</span> React 性能优化<br>
        <span style="color: var(--text-secondary); margin-left: 16px;">Depth 0 · 3 知识点 · 2024-01-15</span>
      </div>

      <div style="margin-left: 16px;">
        <span style="color: var(--text-secondary);">├─</span> <span style="color: var(--error-500);">❓</span> React.memo()<br>
        <span style="color: var(--text-secondary); margin-left: 16px;">│  ↓</span><br>

        <div style="margin-left: 16px;">
          <span style="color: var(--text-secondary);">│</span>  <span style="color: var(--error-500);">🔴</span> React.memo 深入分析<br>
          <span style="color: var(--text-secondary); margin-left: 16px;">│     Depth 1 · 5 知识点</span><br>

          <div style="margin-left: 16px;">
            <span style="color: var(--text-secondary);">│  ├─</span> <span style="color: var(--error-500);">❓</span> 浅比较原理<br>
            <span style="color: var(--text-secondary); margin-left: 16px;">│  │  ↓</span><br>

            <div style="margin-left: 16px;">
              <span style="color: var(--text-secondary);">│  │</span>  <span style="color: var(--warning-500);">🟠</span> 浅比较原理深入<br>
              <span style="color: var(--text-secondary); margin-left: 16px;">│  │     Depth 2 · 3 知识点</span><br>
            </div>

            <span style="color: var(--text-secondary);">│  ├─</span> <span style="color: var(--warning-500);">⚠️</span> 使用场景<br>
            <span style="color: var(--text-secondary);">│  └─</span> <span style="color: var(--success-500);">✅</span> 最佳实践<br>
          </div>
        </div>

        <span style="color: var(--text-secondary);">├─</span> <span style="color: var(--warning-500);">⚠️</span> useMemo<br>
        <span style="color: var(--text-secondary);">└─</span> <span style="color: var(--success-500);">✅</span> 虚拟列表<br>
      </div>
    </div>

    <hr class="divider">

    <button class="btn btn-primary btn-sm w-full" onclick="location.href='knowledge-explorer.html'">
      在知识探索器中查看 →
    </button>
  `;
}

/**
 * Generate Knowledge Graph HTML
 */
function generateKnowledgeGraphHTML() {
  return `
    <div class="empty-state">
      <div class="empty-state-icon">📊</div>
      <div class="empty-state-title">知识图谱</div>
      <div class="empty-state-description">
        知识图谱视图正在开发中<br>
        将使用 AI 自动生成知识拓扑关系
      </div>
      <button class="btn btn-primary btn-sm mt-4">
        生成知识图谱
      </button>
    </div>
  `;
}

/**
 * Toggle knowledge panel visibility
 */
function toggleKnowledgePanel() {
  const panel = document.getElementById('knowledgePanel');
  panel.classList.toggle('hidden');
}

// ============================================
// Chat Functions
// ============================================

/**
 * Handle input keydown
 */
function handleInputKeydown(event) {
  // Send on Ctrl+Enter or Cmd+Enter
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    sendMessage();
    event.preventDefault();
  }

  // Auto-resize textarea
  event.target.style.height = 'auto';
  event.target.style.height = event.target.scrollHeight + 'px';
}

/**
 * Send message
 */
function sendMessage() {
  const input = document.querySelector('.chat-input');
  const message = input.value.trim();

  if (!message) return;

  // Add user message to chat
  addMessage('user', message);

  // Clear input
  input.value = '';
  input.style.height = 'auto';

  // Simulate AI response after delay
  setTimeout(() => {
    addMessage('assistant', '这是一个模拟的 AI 回复。在实际应用中，这里会调用 LLM API 来生成真实的回复。');
  }, 1000);
}

/**
 * Add message to chat
 */
function addMessage(role, content) {
  const messagesContainer = document.getElementById('messages');
  const isUser = role === 'user';

  const messageHTML = `
    <div class="message-bubble ${role}">
      <div class="message-avatar">
        <div class="avatar avatar-md ${isUser ? '' : 'model-openai'}">
          <span>${isUser ? '张' : '🤖'}</span>
        </div>
      </div>
      <div class="message-content-wrapper">
        <div class="message-header">
          <span class="message-sender">${isUser ? '你' : 'GPT-4'}</span>
          <span class="message-time">${getCurrentTime()}</span>
        </div>
        <div class="message-content">
          <p>${content}</p>
        </div>
        <div class="message-actions">
          <button class="btn btn-ghost btn-sm">📋 复制</button>
          <button class="btn btn-ghost btn-sm" onclick="showAnnotationModal()">🔖 标注</button>
          ${isUser ? '' : '<button class="btn btn-ghost btn-sm">🔄 重新生成</button>'}
        </div>
      </div>
    </div>
  `;

  messagesContainer.insertAdjacentHTML('beforeend', messageHTML);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

/**
 * Get current time string
 */
function getCurrentTime() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// ============================================
// Modal Functions
// ============================================

/**
 * Show annotation modal
 */
function showAnnotationModal(element) {
  const modal = document.getElementById('annotationModal');
  modal.classList.remove('hidden');

  // If clicked on a knowledge point, get its text
  if (element && element.classList.contains('knowledge-point')) {
    const text = element.textContent;
    modal.querySelector('.input').textContent = text;
  }
}

/**
 * Show exploration modal
 */
function showExplorationModal() {
  const modal = document.getElementById('explorationModal');
  modal.classList.remove('hidden');
}

/**
 * Close modal
 */
function closeModal(modalId) {
  console.log('Closing modal:', modalId);
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    console.log('Modal closed successfully');
  } else {
    console.error('Modal not found:', modalId);
  }
}

/**
 * Select annotation status
 */
function selectStatus(button, status) {
  // Update button states
  button.parentElement.querySelectorAll('.btn').forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-secondary');
  });

  button.classList.remove('btn-secondary');
  button.classList.add('btn-primary');

  selectedStatus = status;
}

/**
 * Confirm annotation
 */
function confirmAnnotation() {
  console.log('Creating knowledge point with status:', selectedStatus);

  // Show success message
  showNotification('知识点标注成功！', 'success');

  // Close modal
  closeModal('annotationModal');

  // Here you would actually save the knowledge point
}

/**
 * Start exploration
 */
function startExploration() {
  const selectedOption = document.querySelector('input[name="exploration"]:checked');

  if (selectedOption) {
    console.log('Starting exploration with option:', selectedOption.value);

    // Show success message
    showNotification('正在创建探索对话...', 'info');

    // Close modal
    closeModal('explorationModal');

    // Simulate creating new conversation
    setTimeout(() => {
      showNotification('探索对话已创建！', 'success');
    }, 1000);
  }
}

// ============================================
// Notification System
// ============================================

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 24px;
    background-color: ${type === 'success' ? 'var(--success-500)' : type === 'error' ? 'var(--error-500)' : 'var(--info-500)'};
    color: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-lg);
    z-index: 9999;
    animation: slideInRight 0.3s ease-out;
  `;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ============================================
// Theme Toggle
// ============================================

/**
 * Toggle dark mode
 */
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);

  showNotification(`已切换到${newTheme === 'dark' ? '深色' : '浅色'}模式`, 'success');
}

// ============================================
// Keyboard Shortcuts
// ============================================

document.addEventListener('keydown', (event) => {
  // Cmd/Ctrl + K: Focus search
  if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
    event.preventDefault();
    const searchInput = document.querySelector('.search-bar-input');
    if (searchInput) {
      searchInput.focus();
    }
  }

  // Cmd/Ctrl + N: New conversation
  if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
    event.preventDefault();
    createNewConversation();
  }

  // Cmd/Ctrl + B: Toggle sidebar
  if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
    event.preventDefault();
    toggleSidebar();
  }

  // Escape: Close modal
  if (event.key === 'Escape') {
    const modals = document.querySelectorAll('.modal-backdrop:not(.hidden)');
    modals.forEach(modal => {
      modal.classList.add('hidden');
    });
  }
});

// ============================================
// Click outside modal to close
// ============================================

document.addEventListener('click', (event) => {
  console.log('Document click:', event.target.className);
  if (event.target.classList.contains('modal-backdrop')) {
    console.log('Clicked on backdrop, closing modal');
    event.target.classList.add('hidden');
  }
});

// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('Knowledge Studio Prototype Loaded');

  // Load theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Check for new conversation template
  const templateData = localStorage.getItem('newConversation');
  if (templateData) {
    const template = JSON.parse(templateData);
    console.log('Template detected:', template);

    // Auto-fill if on main page
    if (window.location.pathname.includes('index.html')) {
      createNewConversation();
    }
  }

  // Auto-focus chat input if exists
  const chatInput = document.querySelector('.chat-input');
  if (chatInput) {
    chatInput.focus();
  }

  // Prevent modal content clicks from closing modal
  const modalContents = document.querySelectorAll('.modal');
  modalContents.forEach(modal => {
    modal.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

  // 确保所有弹窗初始都是隐藏的
  const allModals = document.querySelectorAll('.modal-backdrop');
  allModals.forEach(modal => {
    if (!modal.classList.contains('hidden')) {
      console.warn('Modal was not hidden, hiding now:', modal.id);
      modal.classList.add('hidden');
    }
  });

  console.log('All modals hidden:', allModals.length);
});

// ============================================
// Export for global access
// ============================================

window.KnowledgeStudio = {
  toggleSidebar,
  toggleFolder,
  loadConversation,
  createNewConversation,
  switchKnowledgeTab,
  toggleKnowledgePanel,
  sendMessage,
  showAnnotationModal,
  showExplorationModal,
  closeModal,
  toggleTheme,
};
