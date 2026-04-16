function toggleDetail(id, el) {
  var detail = document.getElementById(id + '-detail');
  if (!detail) return;
  var isOpen = detail.style.display !== 'none';
  detail.style.display = isOpen ? 'none' : '';
  if (isOpen) {
    el.classList.remove('open');
  } else {
    el.classList.add('open');
  }
}
function handleSubmit() {
  var name = document.querySelector('.input-full').value.trim();
  if (!name) {
    document.querySelector('.input-full').focus();
    document.querySelector('.input-full').style.borderColor = '#F5222D';
    document.querySelector('.input-full').style.boxShadow = '0 0 0 2px rgba(245,34,45,.1)';
    setTimeout(function() {
      document.querySelector('.input-full').style.borderColor = '';
      document.querySelector('.input-full').style.boxShadow = '';
    }, 2000);
    return;
  }
  alert('任务创建成功！');
}
