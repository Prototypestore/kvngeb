const form = document.getElementById('contact-form');
const messageDiv = document.getElementById('form-message');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  messageDiv.textContent = '';

  try {
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      service: form.service.value,
      message: form.message.value.trim()
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
    submitBtn.innerHTML = 'Send Enquiry <span class="arrow">→</span>';
  }
});
