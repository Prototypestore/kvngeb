const form = document.querySelector('form[action="#"]');
const submitBtn = form.querySelector('button[type="submit"]');

const messageDiv = document.createElement('div');
messageDiv.id = 'form-message';
messageDiv.setAttribute('aria-live', 'polite');
form.insertAdjacentElement('afterend', messageDiv);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  messageDiv.textContent = '';

  try {
    const formData = {
      name: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      phone: form.elements['phone'].value.trim(),
      service: form.elements['service'].value,
      message: form.elements['message'].value.trim()
    };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const text = await res.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (error) {
      console.error('Non-JSON response from server:', text);
      throw new Error('Server returned an invalid response.');
    }

    if (!res.ok) {
      console.error('Form submission failed:', data);
      throw new Error(data.error || 'Request failed.');
    }

    messageDiv.textContent = 'Your enquiry has been sent successfully!';
    messageDiv.style.color = '#22c55e';

    form.reset();

    setTimeout(() => {
      messageDiv.textContent = '';
    }, 5000);

  } catch (error) {
    console.error('Contact form error:', error);

    messageDiv.textContent =
      'Something went wrong. Please try again later.';
    messageDiv.style.color = 'red';

    setTimeout(() => {
      messageDiv.textContent = '';
    }, 5000);

  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML =
      'Send Enquiry <span class="arrow">→</span>';
  }
});
