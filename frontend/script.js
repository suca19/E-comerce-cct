const responseDiv = document.getElementById('response');

fetch('http://localhost:5001/api/data')
  .then(res => res.json())
  .then(data => {
    responseDiv.textContent = `${data.message} (${data.status})`;
  })
  .catch(err => {
    responseDiv.textContent = 'Could not reach backend: ' + err.message;
  });
