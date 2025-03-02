import { ElMessage } from 'element-plus';

export default {
    mounted(el) {
        // 监听失去焦点事件
        el.addEventListener('blur', () => {
            validatePhoneNumber(el);
        });

        // 监听input内容变化事件
        el.addEventListener('input', () => {
            // 如果已经有红色样式，且内容发生变化，移除红色
            if (el.classList.contains('error')) {
                el.classList.remove('error');
                el.style.color = '';
            }
        });
    },
};

function validatePhoneNumber(el) {
    const phoneRegExp = /^1[3-9]\d{9}$/;
    const value = el.value;

    if (!phoneRegExp.test(value)) {
        // 如果手机号无效，显示报错信息并改变文字为红色
        ElMessage.error('请输入有效的手机号');
        el.classList.add('error');
        el.style.color = 'red';
    } else {
        // 如果手机号有效，移除红色样式
        el.classList.remove('error');
        el.style.color = '';
    }
}
