/**
 * Modal Fix Script
 * 这个脚本解决弹窗关闭问题
 */

(function() {
  'use strict';

  console.log('Modal fix script loaded');

  // 等待 DOM 加载完成
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    console.log('Initializing modal fix...');

    // 1. 为所有弹窗内容添加点击事件阻止冒泡
    const modalContents = document.querySelectorAll('.modal');
    console.log('Found modal contents:', modalContents.length);

    modalContents.forEach((modal, index) => {
      modal.addEventListener('click', function(e) {
        console.log(`Modal ${index} content clicked, stopping propagation`);
        e.stopPropagation();
      });
    });

    // 2. 为所有关闭按钮添加点击事件
    setupCloseButtons();

    // 3. 点击背景关闭
    setupBackdropClose();

    // 4. ESC 键关闭
    setupEscClose();
  }

  function setupCloseButtons() {
    // 为所有带 data-close 属性的按钮设置关闭功能
    document.querySelectorAll('[data-close-modal]').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const modalId = this.getAttribute('data-close-modal');
        closeModal(modalId);
      });
    });
  }

  function setupBackdropClose() {
    document.addEventListener('click', function(e) {
      if (e.target.classList.contains('modal-backdrop')) {
        console.log('Backdrop clicked');
        e.target.classList.add('hidden');
      }
    });
  }

  function setupEscClose() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        console.log('ESC pressed, closing all modals');
        const openModals = document.querySelectorAll('.modal-backdrop:not(.hidden)');
        openModals.forEach(modal => {
          modal.classList.add('hidden');
        });
      }
    });
  }

  function closeModal(modalId) {
    console.log('closeModal called with ID:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('hidden');
      console.log('Modal closed:', modalId);
    } else {
      console.error('Modal not found:', modalId);
    }
  }

  // 导出到全局
  window.closeModalFix = closeModal;
})();
