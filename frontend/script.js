const responseDiv = document.getElementById('response');

fetch('http://localhost:5001/api/data')
  .then(res => res.json())
  .then(data => {
    responseDiv.textContent = `${data.message} (${data.status})`;
  })
  .catch(err => {
    responseDiv.textContent = 'Could not reach backend: ' + err.message;
  });

  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value;
    fetch(`http://localhost:5001/api/form?userInput=${encodeURIComponent(userInput)}`)
      .then(res => res.text())
      .then(data => {
        document.getElementById('backend').textContent = data;
        })
      .catch(err => {
        document.getElementById('backend').textContent = 'Error: ' + err.message;
      });
  });