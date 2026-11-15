const form = document.querySelector('#question-form');
const questionInput = document.querySelector('#question');
const askButton = document.querySelector('#ask-button');
const answerElement = document.querySelector('#answer');
const messageElement = document.querySelector('#message');
const captionElement = document.querySelector('#orb-caption');
const orb = document.querySelector('.orb');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const question = questionInput.value.trim();

  if (!question) {
    messageElement.textContent = 'Сначала введи свой вопрос.';
    questionInput.focus();
    return;
  }

  messageElement.textContent = '';
  askButton.disabled = true;
  captionElement.textContent = 'ШАР ИЩЕТ ОТВЕТ';
  orb.classList.remove('is-answering');
  orb.classList.add('is-thinking');

  try {
    const response = await fetch('/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Не удалось получить ответ.');
    }

    answerElement.textContent = result.answer;
    captionElement.textContent = 'ШАР ДАЛ ОТВЕТ';
    orb.classList.remove('is-thinking');
    void answerElement.offsetWidth;
    orb.classList.add('is-answering');
  } catch (error) {
    messageElement.textContent = error.message || 'Не удалось связаться с шаром. Попробуй ещё раз.';
    captionElement.textContent = 'ШАР ЖДЁТ ТВОЙ ВОПРОС';
    orb.classList.remove('is-thinking');
  } finally {
    askButton.disabled = false;
  }
});
